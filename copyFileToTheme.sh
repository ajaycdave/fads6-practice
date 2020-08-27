#!/bin/bash

copy_file()
{
    local FILE=$1
    local NEW_FILE=$2
    local NEW_DIR=$(echo "$NEW_FILE" | sed "s/\(.*\)\/.*/\1/")

    # Create nested directories and copy file there.
    if [ ! -d "$NEW_DIR" ]; then
        mkdir -p $NEW_DIR
        printf "\nDirectory created : $NEW_DIR\n\n"
    fi

    cp $FILE $NEW_FILE

    printf "\nFile copied : $NEW_FILE\n\n"
}

change_webpack_config_entry()
{
    local FILE=$1
    local NEW_WEBPACK_FILE=$(echo $WEBPACK_FILE | sed "s/webpack.config.js/webpack.config.$THEME.js/")
    local WEBPACK_ENTRY=$(cat $WEBPACK_FILE | grep -h $(echo $FILE | awk -F '/' '{print "/"$NF}'))
    local NEW_WEBPACK_ENTRY=$(echo $WEBPACK_ENTRY | sed "s/\/js\//\/$THEME_DIR\/js\//")

    # Copy webpack config file for theme
    if [ ! -f "$NEW_WEBPACK_FILE" ]; then
        copy_file $WEBPACK_FILE $NEW_WEBPACK_FILE
    fi

    # Changed webpack entry for overwrited js file
    if [ ! -z "$WEBPACK_ENTRY" ]; then
        sed -i -e "s/$(echo "$WEBPACK_ENTRY" | sed -e 's/\//\\\//g')/$(echo "    $NEW_WEBPACK_ENTRY" | sed -e 's/\//\\\//g')/" $NEW_WEBPACK_FILE

        printf "Entry changed : '$NEW_WEBPACK_ENTRY' in '$NEW_WEBPACK_FILE' \n\n"
    else
        printf "NOTICE : webpack entry not found\n\n"
    fi
}

find_and_copy_container_js_files()
{
    local SOURCE_FILE=$1
    local REQUIRE_FILE=$(echo "$SOURCE_FILE" | sed -e "s|\(.*\)\/Bundle\/\(.*\)|$FA\/\2|")
    local PARENT_FILES=$(find $FIND_IN_DIR -not -path "*/themes/*" -type f -exec grep -l $REQUIRE_FILE {} \;)

    # If parent files found then do following.
    if [ ! -z "$PARENT_FILES" ]; then
        # Get container js files.
        printf "Following files includes this file -> '$REQUIRE_FILE'\n\n"

        local FILE_COUNT=0
        for PARENT_FILE in $PARENT_FILES
        do
            local FILE_COUNT=$(expr $FILE_COUNT + 1)
            echo "$FILE_COUNT) $PARENT_FILE"
        done

        if test $FILE_COUNT -gt 1; then
            printf "\n"
            read -r -p "File has been used in above $FILE_COUNT files, Do you want to overwrite in all files ? [Y/N] " i
            case $i in
                [yY][eE][sS]|[yY])
                ;;
                [nN][oO]|[nN])
                    exit 1;;
                *)
                echo "Invalid option provided, please provide Y or N"
                    exit 1;;
            esac
        fi

        printf "\n"

        local TOTAL_FILE_COUNT=$FILE_COUNT
        local FILE_COUNT=0
        for PARENT_FILE in $PARENT_FILES
        do
            local FILE_COUNT=$(expr $FILE_COUNT + 1)

            if [ -f "$PARENT_FILE" ]; then
                if test $TOTAL_FILE_COUNT -gt 1; then
                    printf "\n$FILE_COUNT) $PARENT_FILE \n\n"
                fi

                # create and prepare container js file for sass.
                copy_and_prepare_container_js_file $PARENT_FILE $REQUIRE_FILE
            fi
        done
    fi
}

find_and_copy_container_files_for_scss()
{
    find_and_copy_container_scss_or_js_files $1
}

find_and_copy_container_files_for_sass()
{
    find_and_copy_container_scss_or_js_files $1
}

find_and_copy_container_scss_or_js_files()
{
    local SOURCE_FILE=$1
    local IMPORT_FILE=$(echo "$SOURCE_FILE" | sed -e "s|\(.*\)\/Bundle\/\(.*\)|$FA\/\2|")
    local PARENT_FILES=$(find $FIND_IN_DIR -not -path "*/themes/*" -type f -exec grep -l $IMPORT_FILE {} \;)

    # If parent files found then do following.
    if [ ! -z "$PARENT_FILES" ]; then
        # Get container js files.
        printf "Following files includes this file -> '$IMPORT_FILE'\n\n"

        local FILE_COUNT=0
        for PARENT_FILE in $PARENT_FILES
        do
            local FILE_COUNT=$(expr $FILE_COUNT + 1)
            echo "$FILE_COUNT) $PARENT_FILE"
        done

        if test $FILE_COUNT -gt 1; then
            printf "\n"
            read -r -p "Do you want to change in above all $FILE_COUNT files ? [Y/N] " i
            case $i in
                [yY][eE][sS]|[yY])
                ;;
                [nN][oO]|[nN])
                    exit 1;;
                *)
                echo "Invalid option provided, please provide Y or N"
                    exit 1;;
            esac
        fi

        printf "\n"

        local TOTAL_FILE_COUNT=$FILE_COUNT
        local FILE_COUNT=0
        for PARENT_FILE in $PARENT_FILES
        do
            local FILE_COUNT=$(expr $FILE_COUNT + 1)

            if [ -f "$PARENT_FILE" ]; then
                if echo $PARENT_FILE | grep -Eq '\.js$'; then
                    # if container file is Js file
                    if test $TOTAL_FILE_COUNT -gt 1; then
                        printf "\n==> Js $FILE_COUNT) $PARENT_FILE \n\n"
                    fi

                    # create and prepare container js file for sass.
                    copy_and_prepare_container_js_file $PARENT_FILE $IMPORT_FILE
                else
                    # if container file is Scss file
                    if test $TOTAL_FILE_COUNT -gt 1; then
                        printf "\n==> Scss $FILE_COUNT) $PARENT_FILE \n\n"
                    fi

                    # create and prepare container scss file for sass.
                    copy_and_prepare_container_scss_file $PARENT_FILE $IMPORT_FILE
                fi
            fi
        done
    fi
}

copy_and_prepare_container_js_file()
{
    local PARENT_FILE=$1
    local REQUIRE_FILE=$2
    local NEW_PARENT_FILE=$(echo $PARENT_FILE | sed "s/Resources\/public/Resources\/public\/$THEME_DIR/")
    local REQUIRE_LINE=$(cat $PARENT_FILE | grep -h $REQUIRE_FILE)
    local NEW_REQUIRE_LINE=$(echo $REQUIRE_LINE | sed "s/Resources\/public/Resources\/public\/$THEME_DIR/")

    # copy parent file if not exist
    if [ ! -f "$NEW_PARENT_FILE" ]; then
        copy_file $PARENT_FILE $NEW_PARENT_FILE
    fi

    # Changed require entry for overwrited scss/js file
    if [ ! -z "$REQUIRE_LINE" ]; then
        sed -i -e "s/$(echo $REQUIRE_LINE | sed -e 's/\//\\\//g')/$(echo $NEW_REQUIRE_LINE | sed -e 's/\//\\\//g')/" $NEW_PARENT_FILE

        printf "Line changed : '$NEW_REQUIRE_LINE' in '$NEW_PARENT_FILE' \n\n"
    else
        printf "NOTICE : require line not found for replacement\n\n"
    fi

    # change entry to webpack config file.
    change_webpack_config_entry $PARENT_FILE
}

copy_and_prepare_container_scss_file()
{
    local PARENT_FILE=$1
    local IMPORT_FILE=$2
    local NEW_PARENT_FILE=$(echo $PARENT_FILE | sed "s/Resources\/public/Resources\/public\/$THEME_DIR/")
    local IMPORT_LINE=$(cat $PARENT_FILE | grep -h $IMPORT_FILE)
    local NEW_IMPORT_LINE=$(echo $IMPORT_LINE | sed "s/Resources\/public/Resources\/public\/$THEME_DIR/")

    # Create parent file if not exist
    if [ ! -f "$NEW_PARENT_FILE" ]; then
        copy_file $PARENT_FILE $NEW_PARENT_FILE
    fi

    # Replace import entry for overwrited sass file
    if [ ! -z "$IMPORT_LINE" ]; then
        sed -i -e "s/$(echo $IMPORT_LINE | sed -e 's/\//\\\//g')/$(echo $NEW_IMPORT_LINE | sed -e 's/\//\\\//g')/" $NEW_PARENT_FILE

        printf "Line changed : '$NEW_IMPORT_LINE' in '$NEW_PARENT_FILE' \n\n"
    else
        printf "NOTICE : import line not found for replacement\n\n"
    fi

    # find and copy container scss or js files for scss.
    find_and_copy_container_files_for_scss $PARENT_FILE
}

THEME=$1
FILE=$2
NEW_FILE=''
WEBPACK_THEME_FILE="webpack.config.$THEME.js"
THEME_DIR="themes\/$THEME"
IS_TWIG_FILE=0
IS_IMG_FILE=0
IS_JS_FILE=0
IS_SASS_FILE=0
IS_SCSS_FILE=0
IS_ASSET_FILE=0
IS_FONT_FILE=0

# Restriction to cop file at project level
if [ ! -f "$FILE" ] || [ ! "$THEME" ]; then
    printf "\nPlease make sure that you have passed theme and correct file path. \n\n"
    exit
fi

if echo $FILE | grep -Eqv ".*Resources/views.*.twig$" \
    && echo $FILE | grep -Eqv ".*Resources/public/images.*.(png|gif|jpg|svg)$" \
    && echo $FILE | grep -Eqv ".*Resources/public/fonts.*.(woff|woff2)$" \
    && echo $FILE | grep -Eqv ".*Resources/public/js.*.js$" \
    && echo $FILE | grep -Eqv ".*Resources/public/css.*.(sass|scss)$" \
    ;
then
    printf "\nYou have passed wrong file path, please check it.\n\n"
    exit
fi

if echo $FILE | grep -Eq '\.twig$'; then
    IS_TWIG_FILE=1
elif echo $FILE | grep -Eq '\.(png|gif|jpg|svg)$'; then
    IS_IMG_FILE=1
    IS_ASSET_FILE=1
elif echo $FILE | grep -Eq '\.(woff|woff2)$'; then
    IS_FONT_FILE=1
    IS_ASSET_FILE=1
elif echo $FILE | grep -Eq '\.js$'; then
    IS_JS_FILE=1
    IS_ASSET_FILE=1
elif echo $FILE | grep -Eq '\.sass$'; then
    IS_SASS_FILE=1
    IS_ASSET_FILE=1
elif echo $FILE | grep -Eq '\.scss$'; then
    IS_SCSS_FILE=1
    IS_ASSET_FILE=1
fi

if echo $FILE | grep -Eq 'platform'; then
    FA='Fa'
    FIND_IN_DIR='vendor/fads/platform'
    WEBPACK_FILE='vendor/fads/platform/webpack.config.js'
else
    FA='Faf'
    FIND_IN_DIR='vendor/fads/frontend'
    WEBPACK_FILE='vendor/fads/frontend/webpack.config.js'
fi

if test $IS_TWIG_FILE -eq 1; then
    NEW_FILE=$(echo $FILE | sed "s/Resources\/views/Resources\/$THEME_DIR/")
elif test $IS_ASSET_FILE -eq 1; then
    NEW_FILE=$(echo $FILE | sed "s/Resources\/public/Resources\/public\/$THEME_DIR/")
fi

if [ -f "$NEW_FILE" ]; then
    read -r -p "File is already exist in theme, do you want to overwrite it ? [Y/N] " input
    case $input in
        [yY][eE][sS]|[yY])
            copy_file $FILE $NEW_FILE
        ;;
        [nN][oO]|[nN])
            printf "\n"
        ;;
        *)
            echo "Invalid option provided, please provide Y or N"
            exit 1;;
    esac
else
    copy_file $FILE $NEW_FILE
fi

if test $IS_SASS_FILE -eq 1; then
    # find and copy container files for sass, those can be js or scss files.
    find_and_copy_container_files_for_sass $FILE
elif test $IS_SCSS_FILE -eq 1; then
    # find and copy container js files for scss.
    find_and_copy_container_files_for_scss $FILE
elif test $IS_JS_FILE -eq 1; then
    # do following for container js file
    REQUIRE_FILE=$(echo "$FILE" | sed -e "s|\(.*\)\/Bundle\/\(.*\)|$FA\/\2|")
    PARENT_FILES=$(find $FIND_IN_DIR -not -path "*/themes/*" -type f -exec grep -l $REQUIRE_FILE {} \;)

    # If parent files found that means it's not container js, so it's actual JS file.
    if [ ! -z "$PARENT_FILES" ]; then
        # find and copy container js files for actual js.
        find_and_copy_container_js_files $FILE
    else
        # change entry to webpack config file.
        change_webpack_config_entry $FILE
    fi
fi