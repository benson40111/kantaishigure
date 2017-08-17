///////////////////////////
//  copy from poooi/poi  //
///////////////////////////

import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import { warn } from './utils.es'

// Specify flash path, supposing it is placed in the same directory with main.js.
let pluginName, folderName
switch (process.platform) {
case 'win32':
  pluginName = 'pepflashplayer.dll'
  folderName = `win-${process.arch}`
  break
case 'darwin':
  pluginName = 'PepperFlashPlayer.plugin'
  folderName = `mac-${process.arch}`
  break
case 'linux':
  pluginName = 'libpepflashplayer.so'
  folderName = `linux-${process.arch}`
  break
}
const flashPaths = [
  path.join(process.env.NODE_ENV === 'development' ? __static : __resources , 'PepperFlash', folderName, pluginName).replace(/\\/g, '\\\\'),
]

try {
  const path = app.getPath('pepperFlashSystemPlugin')
  flashPaths.unshift(path)
} catch (e) {
  warn('Cannot get system flash plugin path')
}

for (const flashPath of flashPaths) {
  try {
    fs.accessSync(flashPath, fs.R_OK)
    app.commandLine.appendSwitch('ppapi-flash-path', flashPath)
    break
  } catch (e) {
    warn(`Flash in ${flashPath} not found.`)
  }
}
