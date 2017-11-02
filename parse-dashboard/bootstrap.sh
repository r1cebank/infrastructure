#!bin/sh

# replace-in-file {APP_ID} $APP_ID dashboard-config.json
# replace-in-file {MASTER_KEY} $MASTER_KEY dashboard-config.json
# replace-in-file {APP_NAME} $APP_NAME dashboard-config.json
# replace-in-file {APP_ICON} $APP_ICON dashboard-config.json
# replace-in-file {APP_USER} $APP_USER dashboard-config.json
# replace-in-file {APP_PASSWORD} $APP_PASSWORD dashboard-config.json

node replace.js

parse-dashboard --config dashboard-config.json