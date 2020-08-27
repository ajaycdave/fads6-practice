#!/bin/bash
force_update=0
while getopts ":s:d:c:f:u:i:e:" opt; do
  case $opt in
    i)
      identifier="${OPTARG}"
      ;;
    d)
      document="${OPTARG}"
      ;;
    f)
      force_update="${OPTARG}"
      ;;
    e)
      mailto="${OPTARG}"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

if [[ "" == "$document" ]]; then
    output_file="$DIR/var/log/$identifier.txt"
else
    output_file="$DIR/var/log/$identifier$document.txt"
fi

output_file="$DIR/var/log/$identifier.txt"
bzip2_file="$output_file.bz2"

echo "Running open stage..."
if [[ "" == "$document" ]]; then
    /usr/bin/php $DIR/bin/console fa:import:item open --identifier=$identifier &> $output_file
else 
    /usr/bin/php $DIR/bin/console fa:import:item open --identifier=$identifier --document=$document &> $output_file
fi

echo "Running source stage..."
/usr/bin/php $DIR/bin/console fa:import:item source --identifier=$identifier &>> $output_file

echo "Running data stage..."
if [[ "1" == "$force_update" ]]; then
    /usr/bin/php $DIR/bin/console fa:import:item data --identifier=$identifier --force-update=1 &>> $output_file
else
    /usr/bin/php $DIR/bin/console fa:import:item data --identifier=$identifier &>> $output_file
fi

if [[ "" == "$document" ]]; then
    echo "Running close stage..."
    /usr/bin/php $DIR/bin/console fa:import:item close-subset --identifier=$identifier &>> $output_file
    /usr/bin/php $DIR/bin/console fa:import:item close --identifier=$identifier &>> $output_file
else
    echo "Skip close stage..."
    /usr/bin/php $DIR/bin/console fa:import:item close --identifier=$identifier &>> $output_file
fi

echo "Running prepare stage..."
/usr/bin/php $DIR/bin/console fa:import:item prepare --identifier=$identifier &>> $output_file

echo "Running sync stage..."
/usr/bin/php $DIR/bin/console fa:import:item sync --identifier=$identifier &>> $output_file

echo "Running complete stage..."
/usr/bin/php $DIR/bin/console fa:import:item complete --identifier=$identifier &>> $output_file


bzip2 -k -f $output_file
