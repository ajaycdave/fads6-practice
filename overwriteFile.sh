#!/bin/bash

find_and_create_service_yaml_files()
{
    local FILE_CLASS=$1
    SEARCH_SERVICE_CLASS=$(echo $FILE_CLASS | sed -e 's/\\/\\\\/g')
    SERVICE_FILES=$(find $BUNDLE_DIR/Resources/config/ -type f -exec grep -l "$SEARCH_SERVICE_CLASS" {} \;)

    if [ ! -z "$SERVICE_FILES" ]; then
        for SERVICE_FILE in $SERVICE_FILES
        do
            NEW_SERVICE_FILE=$(echo $SERVICE_FILE | sed -e "s|\(.*\)\/src\/$FA\/\(.*\)|src\/$APP\/\2|")
            NEW_YAML_FILE=$(echo $NEW_SERVICE_FILE | awk -F '/' '{print $NF}')

            if [ -f "$BASE_PATH/$SERVICE_FILE" ]; then
                if [ ! -f "$BASE_PATH/$NEW_SERVICE_FILE" ]; then
                    mkdir -p $(echo $NEW_SERVICE_FILE | sed "s/\(.*\)\/.*/\1/")
                    cp  $SERVICE_FILE $NEW_SERVICE_FILE
                    sed -i '1!d' $NEW_SERVICE_FILE

                    printf "Service yaml file created : $NEW_SERVICE_FILE\n\n"
                fi

                # repository service file in platform only
                if [ $NEW_YAML_FILE = 'services_repository.yaml' ] && [ $FA = 'Fa' ]; then
                    if test $(cat $NEW_SERVICE_FILE | grep -E "_defaults:" | wc -l) -lt 1; then
                        printf "    _defaults:\n        autowire: true\n        public: true\n" >> $NEW_SERVICE_FILE
                    fi

                    LINE=$(grep -E $(echo $(echo "$FILE_CLASS'" | sed -e 's/\\/\\\\\\/g')) $SERVICE_FILE)
                    SERVICE_LINE=$(echo "$LINE" | sed -e 's/\(.*\):.*/\1/g' -e 's/ //g')
                    REPO_LINE=$(echo "$LINE" | sed -e 's/\(.*\):.*/\1/g' -e 's/\.service/\.repository/g' -e 's/ //g')

                    if test $(cat $NEW_SERVICE_FILE | grep -E "$REPO_LINE" | wc -l) -lt 1; then
                        LINES=$(grep -A 3 "$REPO_LINE" $SERVICE_FILE)

                        if [ ! -z "$LINES" ]; then
                            LINES=$(echo $LINES | sed -e "s/\($REPO_LINE:\)/\n    \1/g" -e "s/\(class:\)/\n        \1/g" -e "s/\(factory:\)/\n        \1/g" -e "s/\(arguments:\)/\n        \1/g")
                            LINES="$LINES\n    $NEW_FILE_CLASS:\n    $SERVICE_LINE: '@$NEW_FILE_CLASS'\n"

                            printf "$LINES" >> $NEW_SERVICE_FILE

                            printf "Service registered in : '$NEW_FILE_CLASS' in '$NEW_SERVICE_FILE' \n\n"
                        fi
                    fi
                else
                    # Other services
                    LINE=$(grep -E $(echo $(echo $FILE_CLASS\$ | sed -e 's/\\/\\\\\\/g')) $SERVICE_FILE)
                    NEW_LILE=$(echo $LINE | sed "s/$FA/$APP/")

                    if test $(cat $NEW_SERVICE_FILE | grep -E "$(echo $(echo $NEW_LILE | sed -e 's/\\/\\\\\\/g'))" | wc -l) -lt 1; then
                        sed -i -e "s|parameters:|parameters:\n    $(echo $(echo $NEW_LILE | sed -e 's/\\/\\\\\\/g'))|" $NEW_SERVICE_FILE

                        printf "Service registered : '$NEW_LILE' in '$NEW_SERVICE_FILE' \n\n"
                    fi
                fi

                # Add YAML entry to load
                add_yaml_entry $NEW_YAML_FILE
            fi
        done
    fi
}

add_yaml_entry()
{
    # Dependency injection for bundle
    local NEW_YAML_FILE=$1
    local DEP_CONF_FILE="$BUNDLE_DIR/DependencyInjection/Configuration.php"
    local DEP_EXT_FILE="$BUNDLE_DIR/DependencyInjection/${FA}${BUNDLE_SHORT_NAME}Extension.php"
    local NEW_DEP_CONF_FILE="$NEW_BUNDLE_DIR/DependencyInjection/Configuration.php"
    local NEW_DEP_EXT_FILE="$NEW_BUNDLE_DIR/DependencyInjection/${APP}${BUNDLE_SHORT_NAME}Extension.php"

    # Create DependencyInjection directory
    mkdir -p "$NEW_BUNDLE_DIR/DependencyInjection"

    # Create configuration file if not exist
    if [ ! -f "$NEW_DEP_CONF_FILE" ]; then
        cp "$DEP_CONF_FILE" "$NEW_DEP_CONF_FILE"

        printf "DependencyInjection configuration file created : '$NEW_DEP_CONF_FILE' \n\n"
    fi

    # Create extension file if not exist
    if [ ! -f "$NEW_DEP_EXT_FILE" ]; then
        cp "$DEP_EXT_FILE" "$NEW_DEP_EXT_FILE"

        # remove all yaml entries coming from parent file
        sed -i '/.yaml/d' $NEW_DEP_EXT_FILE

        printf "DependencyInjection extension file created : '$NEW_DEP_EXT_FILE' \n\n"
    fi

    # Change in configuration and extension file
    sed -i -e "s|$FA|$APP|g" -e "s|$FA_BUNDLE|$APP_BUNDLE|g" -e "s|author.*|author $GIT_USER_NAME <$GIT_USER_EMAIL>|" $NEW_DEP_CONF_FILE
    sed -i -e "s|$FA|$APP|g" -e "s|author.*|author $GIT_USER_NAME <$GIT_USER_EMAIL>|" $NEW_DEP_EXT_FILE

    # Add YAML entries in dependency extension file
    if test $(cat $NEW_DEP_EXT_FILE | grep -E "$NEW_YAML_FILE" | wc -l) -lt 1; then
        sed -i -e "s|\(..\/Resources\/config'));\)|\1\n        \$loader->load('$NEW_YAML_FILE');|" $NEW_DEP_EXT_FILE

        printf "YAML entry added : '\$loader->load('$NEW_YAML_FILE');' in '$NEW_DEP_EXT_FILE' \n\n"
    fi
}

add_translation_dirs_configs()
{
    local TRANS_STRING=''
    local TRANS_DIR=''
    local TRANS_OUTPUT_DIR="$NEW_BUNDLE_DIR/Resources/translations"
    local TRANS_EXCLUDED_NAMES='excluded_names: ["*TestCase.php", "*Test.php"]'
    local TRANS_EXCLUDED_DIRS='excluded_dirs: [cache, data, logs]'

    if [ -d "$NEW_BUNDLE_DIR" ]; then
        TRANS_DIR="$TRANS_DIR\nSIXTEEN_SPACES- \"%kernel.project_dir%/$NEW_BUNDLE_DIR\""
    fi

    if [ -d "src/$APP/Controller/$FA$NEW_BUNDLE_NAME" ]; then
        TRANS_DIR="$TRANS_DIR\nSIXTEEN_SPACES- \"%kernel.project_dir%/src/$APP/Controller/$FA$NEW_BUNDLE_NAME\""
    fi

    if [ -d "src/$APP/Resources/$FA$NEW_BUNDLE_NAME" ]; then
        TRANS_DIR="$TRANS_DIR\nSIXTEEN_SPACES- \"%kernel.project_dir%/src/$APP/Resources/$FA$NEW_BUNDLE_NAME\""
    fi

    TRANS_STRING="EIGHT_SPACES$APP_BUNDLE:"
    TRANS_STRING="$TRANS_STRING\nTWELVE_SPACESdirs:"
    TRANS_STRING="$TRANS_STRING$TRANS_DIR"
    TRANS_STRING="$TRANS_STRING\nTWELVE_SPACESoutput_dir: \"%kernel.project_dir%/$TRANS_OUTPUT_DIR\""
    TRANS_STRING="$TRANS_STRING\nTWELVE_SPACES$TRANS_EXCLUDED_NAMES"
    TRANS_STRING="$TRANS_STRING\nTWELVE_SPACES$TRANS_EXCLUDED_DIRS"

    # Add translation line if not exist.
    if test $(cat $TRANSLATION_CONFIG_FILE | grep -E 'translation:' | wc -l) -lt 1; then
        printf "\n\ntranslation:" >> $TRANSLATION_CONFIG_FILE
    fi

    # Add configs line if not exist.
    if test $(cat $TRANSLATION_CONFIG_FILE | grep -E '    configs:' | wc -l) -lt 1; then
        sed -i -e "s|translation:|translation:\nFOUR_SPACESconfigs:|" $TRANSLATION_CONFIG_FILE
    fi

    # Check bundle entry exist or not.
    if test $(cat $TRANSLATION_CONFIG_FILE | grep -Pzl "(?s)configs.*:\n.*$APP_BUNDLE:" $TRANSLATION_CONFIG_FILE | wc -l) -gt 0; then
        # Remove dirs
        sed -i -e "/$APP_BUNDLE:/,/output_dir/{/$APP_BUNDLE:/!{/output_dir/!d}}" $TRANSLATION_CONFIG_FILE

        # Add new dirs
        sed -i -e "s|$APP_BUNDLE:|$APP_BUNDLE:\nTWELVE_SPACESdirs:$TRANS_DIR|" $TRANSLATION_CONFIG_FILE
    else
        sed -i -e "s|configs:|configs:\n$TRANS_STRING|" $TRANSLATION_CONFIG_FILE
    fi

    sed -i -e 's|FOUR_SPACES|    |' $TRANSLATION_CONFIG_FILE
    sed -i -e 's|EIGHT_SPACES|        |' $TRANSLATION_CONFIG_FILE
    sed -i -e 's|TWELVE_SPACES|            |' $TRANSLATION_CONFIG_FILE
    sed -i -e 's|SIXTEEN_SPACES|                |' $TRANSLATION_CONFIG_FILE

    # Add translation output directory in bundle if not exist.
    if [ ! -d "$TRANS_OUTPUT_DIR" ]; then
        mkdir -p "$TRANS_OUTPUT_DIR"
        printf "Translation output directory created : '$NEW_BUNDLE_DIR/Resources/translations'\n\n"
    fi

    printf "Translation settings added/changed in '$TRANSLATION_CONFIG_FILE' \n\n"
}

add_webpack_config_entry()
{
    local FILE=$1
    WEBPACK_ENTRY=$(cat $WEBPACK_FILE | grep -h $(echo $1 | awk -F '/' '{print "/"$NF}') | sed "s/$(echo $FA | tr '[A-Z]' '[a-z]')/$(echo $APP | tr '[A-Z]' '[a-z]')/g")
    WEBPACK_ENTRY_ORG=$WEBPACK_ENTRY

    if test $(cat $WEBPACK_MAIN_FILE | grep -E "$(echo $WEBPACK_ENTRY | sed -e 's/(/\\(/g' | sed -e 's/)/\\)/g')" | wc -l) -lt 1; then
        WEBPACK_ENTRY=$(echo $WEBPACK_ENTRY | sed -e 's|\/|\\/|g' -e 's|,\s|,|g')

        if echo $FILE | grep -Eq 'platform'; then
            sed -i -e ':a;$!{N;ba};s/\(.enableSassLoader\)/'$(echo $WEBPACK_ENTRY)'\n    \1/1' $WEBPACK_MAIN_FILE
        else
            if echo $FILE | grep -Eq '.*\/themes\/.*'; then
                sed -i -e ':a;$!{N;ba};s/\(.enableSassLoader\)/'$(echo $WEBPACK_ENTRY)'\n    \1/'$(expr $THEME_NO + 2) $WEBPACK_MAIN_FILE
            else
                sed -i -e ':a;$!{N;ba};s/\(.enableSassLoader\)/'$(echo $WEBPACK_ENTRY)'\n    \1/2' $WEBPACK_MAIN_FILE
            fi
        fi

        sed -i -e "s|$WEBPACK_ENTRY|$(echo $WEBPACK_ENTRY | sed -e 's|,|, |')|" $WEBPACK_MAIN_FILE

        printf "Entry added : '$WEBPACK_ENTRY_ORG' in '$WEBPACK_MAIN_FILE' \n\n"
    fi
}

create_and_register_bundle()
{
    local SOURCE_FILE=$1
    local DEST_FILE=$2

    # Create bundle file
    BUNDLE_DIR=$(echo $SOURCE_FILE | awk -F '/' '{print $1"/"$2"/"$3"/"$4"/"$5"/"$6"/"$7}')
    BUNDLE_NAME=$(echo $BUNDLE_DIR | awk -F '/' '{print $NF}')
    BUNDLE_FILE=$(echo "$BUNDLE_DIR/$FA$BUNDLE_NAME.php")
    BUNDLE_SHORT_NAME=$(echo $BUNDLE_NAME|sed -e 's|Bundle||')
    FA_BUNDLE=$(echo $FA"_"$BUNDLE_SHORT_NAME | awk '{print tolower($0)}')
    APP_BUNDLE=$(echo $APP"_"$BUNDLE_SHORT_NAME | awk '{print tolower($0)}')

    NEW_BUNDLE_DIR=$(echo $DEST_FILE | awk -F '/' '{print $1"/"$2"/"$3"/"$4}' | sed "s/$FA/$APP/")
    NEW_BUNDLE_NAME=$(echo $NEW_BUNDLE_DIR | awk -F '/' '{print $NF}')
    NEW_BUNDLE_FILE=$(echo "$NEW_BUNDLE_DIR/${APP}${NEW_BUNDLE_NAME}.php")
    NEW_BUNDLE_ENTRY=$(echo "    $NEW_BUNDLE_DIR/${APP}${NEW_BUNDLE_NAME}::class => ['all' => true]," | sed -e 's/src\///g' -e 's/\//\\\\/g')

    # Create bundle file if not exist
    if [ ! -f "$BASE_PATH/$NEW_BUNDLE_FILE" ]; then
        mkdir -p $NEW_BUNDLE_DIR
        sed -e "s|$FA|$APP|g" -e "s|author.*|author $GIT_USER_NAME <$GIT_USER_EMAIL>|" $BUNDLE_FILE >> $NEW_BUNDLE_FILE

        printf "Bundle file created : $NEW_BUNDLE_FILE\n\n"
    fi

    # Register bundle if not registered
    if test $(cat $BUNDLE_CONFIG_FILE | grep -E "${APP}${NEW_BUNDLE_NAME}" | wc -l) -lt 1; then
        sed -i -e "s/];/$NEW_BUNDLE_ENTRY\n];/" $BUNDLE_CONFIG_FILE

        printf "Bundle registered in '$BUNDLE_CONFIG_FILE' \n\n"
    fi
}

find_and_create_container_js_files()
{
    local SOURCE_FILE=$1
    FA_REQUIRE_FILE=$(echo "$SOURCE_FILE" | sed -e "s|\(.*\)\/Bundle\/\(.*\)|$FA\/\2|")
    FIND_IN_DIR=$(echo $BUNDLE_DIR | sed -e 's|\(.*\)\/src\/\(.*\)|\1|')
    PARENT_FILES=$(find $FIND_IN_DIR -type f -exec grep -l $FA_REQUIRE_FILE {} \;)

    # If parent files found then do following.
    if [ ! -z "$PARENT_FILES" ]; then
        # Get container js files.
        printf "Following files includes this file -> '$FA_REQUIRE_FILE'\n\n"

        local FILE_COUNT=0
        for PARENT_FILE in $PARENT_FILES
        do
            FILE_COUNT=$(expr $FILE_COUNT + 1)
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
            FILE_COUNT=$(expr $FILE_COUNT + 1)

            if [ -f "$PARENT_FILE" ]; then
                if test $TOTAL_FILE_COUNT -gt 1; then
                    printf "$FILE_COUNT) $PARENT_FILE \n\n"
                fi

                # create and prepare container js file for sass.
                create_and_prepare_container_js_file $PARENT_FILE $FA_REQUIRE_FILE
            fi
        done
    fi
}

find_and_create_container_files_for_scss()
{
    find_and_create_container_scss_or_js_files $1
}

find_and_create_container_files_for_sass()
{
    find_and_create_container_scss_or_js_files $1
}

find_and_create_container_scss_or_js_files()
{
    local SOURCE_FILE=$1
    FA_IMPORT_FILE=$(echo "$SOURCE_FILE" | sed -e "s|\(.*\)\/Bundle\/\(.*\)|$FA\/\2|")
    FIND_IN_DIR=$(echo $BUNDLE_DIR | sed -e 's|\(.*\)\/src\/\(.*\)|\1|')
    PARENT_FILES=$(find $FIND_IN_DIR -type f -exec grep -l $FA_IMPORT_FILE {} \;)

    # If parent files found then do following.
    if [ ! -z "$PARENT_FILES" ]; then
        # Get container js files.
        printf "Following files includes this file -> '$FA_IMPORT_FILE'\n\n"

        local FILE_COUNT=0
        for PARENT_FILE in $PARENT_FILES
        do
            FILE_COUNT=$(expr $FILE_COUNT + 1)
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
            FILE_COUNT=$(expr $FILE_COUNT + 1)

            if [ -f "$PARENT_FILE" ]; then
                if echo $PARENT_FILE | grep -Eq '\.js$'; then
                    # if container file is Js file
                    if test $TOTAL_FILE_COUNT -gt 1; then
                        printf "\n==> Js $FILE_COUNT) $PARENT_FILE \n\n"
                    fi

                    # create and prepare container js file for sass.
                    create_and_prepare_container_js_file $PARENT_FILE $FA_IMPORT_FILE
                else
                    # if container file is Scss file
                    if test $TOTAL_FILE_COUNT -gt 1; then
                        printf "\n==> Scss $FILE_COUNT) $PARENT_FILE \n\n"
                    fi

                    # create and prepare container scss file for sass.
                    create_and_prepare_container_scss_file $PARENT_FILE $FA_IMPORT_FILE
                fi
            fi
        done
    fi
}

create_and_prepare_container_js_file()
{
    local PARENT_FILE=$1
    local FA_REQUIRE_FILE=$2
    NEW_PARENT_FILE=$(echo $PARENT_FILE | sed -e "s|.*\/$FA\/\(.*\)|src\/$APP\/\1|")
    FA_REQUIRE_PARENT_LINE=$(echo "$PARENT_FILE" | sed -e "s|\(.*\)\/Bundle\/\(.*\)|$FA\/\2|")
    FA_REQUIRE_LINE=$(cat $PARENT_FILE | grep -h $FA_REQUIRE_FILE)
    APP_REQUIRE_LINE=$(echo $FA_REQUIRE_LINE | sed "s/$FA/$APP/g" | sed "s/FA/APP/g")

    # Create parent file if not exist
    if [ ! -f "$NEW_PARENT_FILE" ]; then
        # Create nested directories and copy file there.
        local NEW_DIR=$(echo $NEW_PARENT_FILE | sed "s/\(.*\)\/.*/\1/")
        mkdir -p $NEW_DIR

        # Copy file
        cp $PARENT_FILE $NEW_PARENT_FILE

        # Make file empty.
        echo "" > $NEW_PARENT_FILE

        printf "File created : $NEW_PARENT_FILE \n\n"
    fi

    # Create and register bundle
    create_and_register_bundle $PARENT_FILE $NEW_PARENT_FILE

    # Add require entry for parent js file.
    if test $(cat $NEW_PARENT_FILE | grep -E "$FA_REQUIRE_PARENT_LINE" | wc -l) -lt 1; then
        echo "require('$FA_REQUIRE_PARENT_LINE');" >> $NEW_PARENT_FILE

        printf "Line added : 'require('$FA_REQUIRE_PARENT_LINE');' in '$NEW_PARENT_FILE' \n\n"
    fi

    # Add require entry for overwrited js file
    if test $(cat $NEW_PARENT_FILE | grep -E "$(echo $APP_REQUIRE_LINE | sed -e 's/(/\\(/g' | sed -e 's/)/\\)/g')" | wc -l) -lt 1; then
        echo $APP_REQUIRE_LINE >> $NEW_PARENT_FILE

        printf "Line added : '$APP_REQUIRE_LINE' in '$NEW_PARENT_FILE' \n\n"
    fi

    # Add entry to webpack config file.
    add_webpack_config_entry $PARENT_FILE
}

create_and_prepare_container_scss_file()
{
    local PARENT_FILE=$1
    local FA_IMPORT_FILE=$2
    NEW_PARENT_FILE=$(echo $PARENT_FILE | sed -e "s|.*\/$FA\/\(.*\)|src\/$APP\/\1|")
    FA_IMPORT_PARENT_LINE=$(echo "$PARENT_FILE" | sed -e "s|\(.*\)\/Bundle\/\(.*\)|~$FA\/\2|")
    FA_IMPORT_LINE=$(cat $PARENT_FILE | grep -h $FA_IMPORT_FILE)
    APP_IMPORT_LINE=$(echo $FA_IMPORT_LINE | sed "s/$FA/$APP/g" | sed "s/FA/APP/g")

    # Create parent file if not exist
    if [ ! -f "$NEW_PARENT_FILE" ]; then
        # Create nested directories and copy file there.
        local NEW_DIR=$(echo $NEW_PARENT_FILE | sed "s/\(.*\)\/.*/\1/")
        mkdir -p $NEW_DIR

        # Copy file
        cp $PARENT_FILE $NEW_PARENT_FILE

        # Make file empty.
        echo "" > $NEW_PARENT_FILE

        printf "File created : $NEW_PARENT_FILE \n\n"
    fi

    # Create and register bundle
    create_and_register_bundle $PARENT_FILE $NEW_PARENT_FILE

    # Add import entry for parent scss file.
    if test $(cat $NEW_PARENT_FILE | grep -E "$FA_IMPORT_PARENT_LINE" | wc -l) -lt 1; then
        echo "@import '$FA_IMPORT_PARENT_LINE';" >> $NEW_PARENT_FILE

        printf "Line added : \"@import '$FA_IMPORT_PARENT_LINE';\" in '$NEW_PARENT_FILE' \n\n"
    fi

    # Add import entry for overwrited scss file
    if test $(cat $NEW_PARENT_FILE | grep -E "$(echo $APP_IMPORT_LINE | sed -e 's/(/\\(/g' | sed -e 's/)/\\)/g')" | wc -l) -lt 1; then
        echo $APP_IMPORT_LINE >> $NEW_PARENT_FILE

        printf "Line added : '$APP_IMPORT_LINE' in '$NEW_PARENT_FILE' \n\n"
    fi

    # find and copy container scss or js files for scss.
    find_and_create_container_files_for_scss $PARENT_FILE
}

BASE_PATH="$PWD"
GIT_USER_NAME=$(git config --global user.name)
GIT_USER_EMAIL=$(git config --global user.email)
FILE=$1
NEW_FILE=''
NEW_YAML_FILE=''
BUNDLE_CONFIG_FILE=''
KERNEL_FILE=''
IMG_PARAM_FILE=''
TRANSLATION_CONFIG_FILE=''
WEBPACK_MAIN_FILE='webpack.config.js'
IS_COPY=1
IS_PHP_FILE=0
IS_CONTROLLER_FILE=0
IS_TWIG_FILE=0
IS_YAML_FILE=0
IS_VALID_FILE=1
IS_IMG_FILE=0
IS_JS_FILE=0
IS_SASS_FILE=0
IS_SCSS_FILE=0

# Restriction to create file at project level
if [ ! -f "$FILE" ]; then
    printf "\n Sorry, file does not exist. \n\n"
    exit
fi
if echo $FILE | grep -Eqv '^vendor'; then
    IS_VALID_FILE=0
elif echo $FILE | grep -Eq 'routing.*.yaml$'; then
    IS_VALID_FILE=0
fi
if [ $IS_VALID_FILE != 1 ]; then
    printf "\n Sorry, You can not overwrite this file at project level using this command. \n\n"
    exit
fi

if echo $FILE | grep -Eq '\.php$'; then
    IS_PHP_FILE=1
elif echo $FILE | grep -Eq '(parameters|services).*\.yaml$'; then
    IS_YAML_FILE=1
elif echo $FILE | grep -Eq '\.(png|gif|jpg)$'; then
    IS_IMG_FILE=1
elif echo $FILE | grep -Eq '\.js$'; then
    IS_JS_FILE=1
elif echo $FILE | grep -Eq '\.sass$'; then
    IS_SASS_FILE=1
elif echo $FILE | grep -Eq '\.scss$'; then
    IS_SCSS_FILE=1
fi

if echo $FILE | grep -Eq 'platform'; then
    FA='Fa'
    APP='App'
    FILE=$(echo $FILE | sed "s/vendor\/fads\/platform\/\(.*\)/\1/")
    BUNDLE_CONFIG_FILE='config/bundles.php'
    KERNEL_FILE='src/App/Kernel.php'
    IMG_PARAM_FILE='config/packages/parameters.yaml'
    WEBPACK_FILE='vendor/fads/platform/webpack.config.js'
    TRANSLATION_CONFIG_FILE='config/packages/php_translation.yaml'
else
    FA='Faf'
    APP='Appf'
    FILE=$(echo $FILE | sed "s/vendor\/fads\/frontend\/\(.*\)/\1/")
    BUNDLE_CONFIG_FILE='config/frontbundles.php'
    KERNEL_FILE='src/Appf/FrontKernel.php'
    IMG_PARAM_FILE='config/frontpackages/parameters.yaml'
    WEBPACK_FILE='vendor/fads/frontend/webpack.config.js'
    TRANSLATION_CONFIG_FILE='config/frontpackages/php_translation.yaml'
fi

# We have different webpack config file for each theme.
if echo $FILE | grep -Eq '.*\/themes\/.*'; then
    THEME_NAME=$(echo $FILE | sed "s/.*\/theme\([0-9]\)\/.*/theme\1/")
    THEME_NO=$(echo $FILE | sed "s/.*\/theme\([0-9]\)\/.*/\1/")
    WEBPACK_FILE=$(echo $WEBPACK_FILE | sed "s/vendor\/fads\/\(.*\)\/webpack.config.js/vendor\/fads\/\1\/webpack.config.$THEME_NAME.js/")
fi

if echo $FILE | grep -Eq 'src\/(.*)\/Bundle\/(.*)\/Controller\/(.*)'; then
    NEW_FILE=$(echo $FILE | sed "s/src\/\(.*\)\/Bundle\/\(.*\)\/Controller\/\(.*\)/src\/$APP\/Controller\/\1\2\/\3/")
    IS_CONTROLLER_FILE=1
elif echo $FILE | grep -Eq 'src\/(.*)\/Bundle\/(.*)\/Resources\/(.*.twig)$'; then
    NEW_FILE=$(echo $FILE | sed "s/src\/\(.*\)\/Bundle\/\(.*\)\/Resources\/\(.*\)/src\/$APP\/Resources\/\1\2\/\3/")
    IS_TWIG_FILE=1
else
    NEW_FILE=$(echo $FILE | sed "s/$FA/$APP/")
fi

if [ -f "$BASE_PATH/$NEW_FILE" ]; then
    read -r -p "File is already exist at project level, do you want to overwrite it ? [Y/N] " input
    case $input in
        [yY][eE][sS]|[yY])
        ;;
        [nN][oO]|[nN])
            IS_COPY=0
        ;;
        *)
        echo "Invalid option provided, please provide Y or N"
               exit 1;;
    esac
fi

if test $IS_COPY -eq 1; then

    # Create nested directories and copy file there.
    NEW_DIR=$(echo $NEW_FILE | sed "s/\(.*\)\/.*/\1/")
    mkdir -p $NEW_DIR
    cp $1 $NEW_FILE

    printf "\nFile created : $NEW_FILE\n\n"

    # No need create bundle directory for twig file, but if want to add translation then need to create bundle.
    if test $IS_TWIG_FILE -eq 1; then
        read -r -p "For twig file we don't need to create bundle but if you want to add translations then we have to create bundle, Do you want translations ? [Y/N] " ti
        case $ti in
            [yY][eE][sS]|[yY])
            printf "\n"
            ;;
            [nN][oO]|[nN])
            printf "\n"
            exit 
            ;;
            *)
            echo "Invalid option provided, please provide Y or N"
            exit 1;;
        esac
    fi

    # Create and register bundle
    create_and_register_bundle $1 $FILE

    # PHP file
    if test $IS_PHP_FILE -eq 1; then
        FILE_CLASS=$(echo $FILE | sed -e 's/src\///g' -e 's/\.php//g' -e 's/\//\\/g')
        FILE_CLASS_NAME=$(echo $FILE_CLASS | awk -F '\' '{print $NF}')
        FILE_CLASS_ALIAS="Base"$FILE_CLASS_NAME
        FILE_USE=$(echo "use $FILE_CLASS as $FILE_CLASS_ALIAS;" | sed -e 's/\\/\\\\/g')

        NEW_FILE_CLASS=$(echo $NEW_FILE | sed -e 's/src\///g' -e 's/\.php//g' -e 's/\//\\/g')

        sed -i -e ':again' -e N -e '$!b again' -e 's/{.*}/{\n}/g' $NEW_FILE
        sed -i -e ':again' -e N -e '$!b again' -e "s/\(use.*;\)/\1\n$FILE_USE\n\n/" $NEW_FILE
        sed -i -e "s|author.*|author $GIT_USER_NAME <$GIT_USER_EMAIL>|" -e "s|class \(.*\)|class $FILE_CLASS_NAME extends $FILE_CLASS_ALIAS|" $NEW_FILE
        sed -i -e "s|class \(.*\) extends \(.*\)|class $FILE_CLASS_NAME extends $FILE_CLASS_ALIAS|" $NEW_FILE
        sed -i -e '/^$/N;/^\n$/d' $NEW_FILE

        # Namespace
        if test $IS_CONTROLLER_FILE -eq 1; then
            sed -i -e "s|namespace \(.*\);|namespace $(echo $NEW_FILE | awk -F '/' '{print $2"/"$3"/"$4}' | sed 's|\/|\\\\|g');|" $NEW_FILE
        else
            sed -i -e "s|namespace.*$FA\(.*\)|namespace $APP\1|" $NEW_FILE
        fi

        # Controller file
        if test $IS_CONTROLLER_FILE -eq 1; then
            CONTROLLER_DEFINITION="\$container->findDefinition('$(echo $FILE_CLASS | sed -e 's/\\/\\\\/g')')->setClass('$(echo $NEW_FILE_CLASS | sed -e 's/\\/\\\\/g')'::class);"
    
            if test $(cat $KERNEL_FILE | grep -E "$(echo $NEW_FILE_CLASS | sed -e 's/\\/\\\\/g')" | wc -l) -lt 1; then
                if test $(cat $KERNEL_FILE | grep -E "container->findDefinition" | wc -l) -lt 1; then
                    sed -i -e "s|\(\$container->getDefinition[(]'monolog.logger'[)]->setPublic[(].*[)];\)|\1\n\n       $CONTROLLER_DEFINITION|" $KERNEL_FILE
                else
                    sed -i -e ':again' -e N -e '$!b again' -e "s/\(\$container->findDefinition[(].*::class[)];\)/\1\n       $CONTROLLER_DEFINITION/" $KERNEL_FILE
                fi
    
                printf "Controller definition added in '$KERNEL_FILE' \n\n"
            fi
        fi

        # Service registration
        find_and_create_service_yaml_files $FILE_CLASS

        # for listener file in platform only, change listener class in entity file.
        if echo $FILE | grep -Eq '\/Listener\/' && [ $FA = 'Fa' ]; then
            ENTITY_FILE="src/App/Entity/$FILE_CLASS_NAME.php"
            if [ -f "$ENTITY_FILE" ]; then
                sed -i -e "s|$(echo $FILE_CLASS | sed -e 's/\\/\\\\/g')|$(echo $NEW_FILE_CLASS | sed -e 's/\\/\\\\/g')|g" $ENTITY_FILE

                printf "Listener class changed '$NEW_FILE_CLASS' in '$ENTITY_FILE' \n\n"
            fi
        fi
    fi

    # do translations settings if php or twig file
    if test $IS_PHP_FILE -eq 1 || test $IS_TWIG_FILE -eq 1; then
        add_translation_dirs_configs
    fi

    if test $IS_YAML_FILE -eq 1; then
        NEW_YAML_FILE=$(echo $NEW_FILE | awk -F '/' '{print $NF}')
        sed -i '1!d' $NEW_FILE

        # Add YAML entry to load
        add_yaml_entry $NEW_YAML_FILE
    fi

    # Overwrite image
    if test $IS_IMG_FILE -eq 1; then
        FA_IMG="bundles/$(echo $FA_BUNDLE | sed 's|_||')/images/$(echo $NEW_FILE | awk -F '/' '{print $NF}')"
        APP_IMG="bundles/$(echo $APP_BUNDLE | sed 's|_||')/images/$(echo $NEW_FILE | awk -F '/' '{print $NF}')"
        IMG_ENTRY="'$FA_IMG' : '$APP_IMG'"

        if test $(cat $IMG_PARAM_FILE | grep -E "faf.static.content" | wc -l) -lt 1; then
            printf "\n\n    faf.static.content:" >> $IMG_PARAM_FILE
        fi

        if test $(cat $IMG_PARAM_FILE | grep -E "$APP_IMG" | wc -l) -lt 1; then
            sed -i -e "s|faf.static.content:|faf.static.content:\n        $IMG_ENTRY|" $IMG_PARAM_FILE
        fi

        printf "Image entry added : $IMG_ENTRY in '$IMG_PARAM_FILE' \n\n"

        printf "Please change the image at given path : '$NEW_FILE' \n\n"
    fi

    # Js file
    if test $IS_JS_FILE -eq 1; then
        # do following for container js file
        FA_REQUIRE_FILE=$(echo "$FILE" | sed -e "s|\(.*\)\/Bundle\/\(.*\)|$FA\/\2|")
        FIND_IN_DIR=$(echo $BUNDLE_DIR | sed -e 's|\(.*\)\/src\/\(.*\)|\1|')
        PARENT_FILES=$(find $FIND_IN_DIR -type f -exec grep -l $FA_REQUIRE_FILE {} \;)

        # If parent files found that means it's not container js, so it's actual JS file.
        if [ ! -z "$PARENT_FILES" ]; then
            # Make Js file ready with default code.
            PARENT_NAMESPACE=$(echo $(head -1 $NEW_FILE) | sed -e 's| = (function() {||' -e 's| ||g')
            FIRST_LINE=$(head -1 $NEW_FILE)
            PROTOTYPE=$(cat $NEW_FILE | grep -h 'my_prototype:' | sed -e 's|my_prototype:||' -e 's| ||g')
            PROTOTYPE_CLASS=$(cat $NEW_FILE | grep -h "var $PROTOTYPE =")
            FUNCTIONS=''

            # if functions passed then do following.
            if [ "$#" -gt 1 ]; then
                ARG_COUNT=1
                for ARG in "$@"
                do
                    if [ "$ARG_COUNT" -gt 1 ]; then
                        FUNCTIONS="$FUNCTIONS\n\n"$(echo "    "$(cat $NEW_FILE | grep -h "$ARG =" | sed -e "s|\(.*\).prototype.\(.*\)|$PARENT_NAMESPACE.my_prototype.prototype.\2|" -e 's|\(.*\)|\1};|'))
                    fi
                    ARG_COUNT=$(expr $ARG_COUNT + 1)
                done
            fi

            sed -i "/$FIRST_LINE/,/var singleton/{/$FIRST_LINE/!{/var singleton/!d}}" $NEW_FILE
            sed -i -e "s/FA/APP/g" $NEW_FILE
            sed -i "s|var singleton|\n$PROTOTYPE_CLASS$FUNCTIONS\n\n    var singleton|" $NEW_FILE

            # find and create container js files for actual js.
            find_and_create_container_js_files $FILE
        else
            # Make file empty.
            echo "" > $NEW_FILE

            # Add require entry for parent js file.
            FA_REQUIRE_PARENT_LINE=$(echo "$FILE" | sed -e "s|\(.*\)\/Bundle\/\(.*\)|$FA\/\2|")
            echo "require('$FA_REQUIRE_PARENT_LINE');" >> $NEW_FILE
            printf "Line added : 'require('$FA_REQUIRE_PARENT_LINE');' in '$NEW_FILE' \n\n"

            # Add entry to webpack config file.
            add_webpack_config_entry $FILE
        fi
    fi

    if test $IS_SCSS_FILE -eq 1; then
        # Make file empty and import parent file.
        FA_IMPORT_PARENT_LINE=$(echo "$FILE" | sed -e "s|\(.*\)\/Bundle\/\(.*\)|~$FA\/\2|")
        echo "" > $NEW_FILE
        echo "@import '$FA_IMPORT_PARENT_LINE';" >> $NEW_FILE

        printf "Line added : \"@import '$FA_IMPORT_PARENT_LINE';\" in '$NEW_FILE' \n\n"

        # find and create container scss/js files for scss.
        find_and_create_container_files_for_scss $FILE
    fi

    if test $IS_SASS_FILE -eq 1; then
        # find and create container files for sass, those can be js or scss files.
        find_and_create_container_files_for_sass $FILE
    fi
fi
