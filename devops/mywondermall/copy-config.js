const shell = require('shelljs')
shell.rm('-rf', 'node_modules/.cache')
shell.cp('-R', 'config/mywondermall/index.js', 'config/index.js')
shell.cp('-R', 'config/mywondermall/icon.png', 'static/icon.png')
shell.cp('-R', 'config/mywondermall/favicon.ico', 'static/favicon.ico')
shell.cp('-R', 'devops/mywondermall/pm2.config.js', 'prod/pm2.config.js')
