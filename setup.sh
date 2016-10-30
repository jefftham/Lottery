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

#set the system timezone
echo 'America/New_York' > /etc/timezone
rm /etc/localtime
cp /usr/share/zoneinfo/US/Eastern /etc/localtime

#use it instantly
export TZ=America/New_York


pushd $APP_DIR

#install node dependencies
npm install

#start the app
npm start

popd
