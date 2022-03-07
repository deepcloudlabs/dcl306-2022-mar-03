set NODE_HOME=D:\DEVEL\stage\opt\node-v16.14.0
set PATH=%NODE_HOME%;node_modules\.bin;%PATH%
nodemon ./ --exec babel-node server.js