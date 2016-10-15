#this is the main setup script that trigger other all relevant scripts

# $BASE_DIR is the root directory of the repo
export BASE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )/" && pwd )

export APP_DIR="$BASE_DIR/Lottery/"

apt-get update

apt-get upgrade -y

#install some great software
apt-get install -y htop

#install Node Version Manager and NodeJS
source $BASE_DIR/Server_setup/node_setup.sh

#use nodejs without Close and reopen your terminal
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  

pushd $APP_DIR

#install node dependencies
npm install

#start the app
npm start

popd
