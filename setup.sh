#this is the main setup script that trigger other all relevant scripts

apt-get update

apt-get upgrade -y

#install some great software
apt-get install -y htop

#install Node Version Manager and NodeJS
source ./Server_setup/node_setup.sh


