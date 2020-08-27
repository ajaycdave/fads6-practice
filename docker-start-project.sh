#!/bin/bash

# stop all other project php and nginx containers
for cid in $(docker ps | grep -E '.*_(php|nginx)' | awk '{ print $1 }'); do docker container stop $cid; done;

# Up current project docker container
docker-compose --verbose -f deployment/docker-compose-local.yml up


