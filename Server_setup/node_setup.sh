#install Node.js with Node Version Manager

apt-get install -y build-essential checkinstall curl

apt-get install -y libssl-dev

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash

#reflesh the environment
source ~/.profile

#list all the version
nvm ls-remote

#install version 6.X
nvm install 6

#show node version
node -v

#show npm version
npm -v

#set the current version to $node_version
node_version=$(echo $(node -v) )

#set $NODE_PATH for npm global modules for this session
export NODE_PATH=~/.nvm/versions/node/$node_version/lib/node_modules

#set $NODE_PATH every time the session start
echo "export NODE_PATH=~/.nvm/versions/node/$node_version/lib/node_modules" >>~/.profile

#use nodejs without Close and reopen your terminal
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  

