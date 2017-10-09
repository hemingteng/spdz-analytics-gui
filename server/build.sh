#!/bin/bash
# Build a docker image for production build of analytics GUI.
# First builds client app and then invokes docker build.

HERE=$(cd `dirname $0`; pwd)
PROJROOT=$HERE/..

echo "Building in $PROJROOT"

echo "======================="
echo "Building client app...."
echo "======================="
cd $PROJROOT/client
npm run build

echo "======================="
echo "Copy to server dir ...."
echo "======================="
if test -d $PROJROOT/server/gui_build; then
    rm -fr $PROJROOT/server/gui_build
fi

cp -r $PROJROOT/client/build $PROJROOT/server
mv $PROJROOT/server/build $PROJROOT/server/gui_build 

cd $PROJROOT/server

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo "=================================================="
echo "Build docker image at version $PACKAGE_VERSION...."
echo "=================================================="
  
docker build -t spdz/analytics-gui:v$PACKAGE_VERSION .
