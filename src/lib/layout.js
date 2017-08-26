import store from '../renderer/store/index.js'
import { remote } from 'electron'

const getWebviewWidth = () => {
    return store.state.config.webviewWidth
}

const getZoomLevel = () => {
    return store.state.config.zoomLevel
}

const additionalStyle = document.createElement('style')

remote.getCurrentWindow().webContents.on('dom-ready', () => {
  document.body.appendChild(additionalStyle)
})

const getFlexCss = ({ webviewWidth }) => {
    return `
        .main-game {
            flex: ${webviewWidth};
        }
        .main-tab {
            flex: ${window.innerWidth - webviewWidth};
        }
    `
}

const setCss = ({ webviewWidth , webviewHeight , mainTabViewHeight}) => {
    let { innerHeight } = window
    let { zoomLevel } = getZoomLevel()
    additionalStyle.innerHTML = `
        .main-game {
            width: 0;
            height: 0;
        }
        .main-tab {
            width: calc(100% / ${zoomLevel});
        }
        .main-tab-view {
            height: ${mainTabViewHeight}px;
            overflow:auto;
        }
        webview {
            width: ${ webviewWidth }px !important;
            height: ${ webviewHeight }px !important;
        }
        ${getFlexCss({webviewWidth: webviewWidth})}
    `
    if (webviewWidth > -0.00001 && webviewWidth < 0.00001) {
        document.querySelector('#game').style.display = 'none'
    }
    document.querySelector('#game').style.marginLeft = '0'
    document.querySelector('#game').style.marginTop = `${Math.max(0, Math.floor((innerHeight - webviewHeight) / 2.0))}px`
    try {
    document.querySelector('webview').executeJavaScript('window.align()')
        } catch (e) {
        console.error(e)
    }
}

export const adjustSize = () => {
    const zoom =  getZoomLevel()
    let webviewWidth = getWebviewWidth()
    let webviewHeight = Math.min(window.innerHeight , Math.round(webviewWidth / 800.0 * 480.0))
    let cap
    cap = Math.ceil(375 * 1 * zoom)
    if ((window.innerWidth - webviewWidth) < cap) {
    webviewWidth = window.innerWidth - cap
    webviewHeight = Math.min(innerHeight, Math.round(webviewWidth / 800.0 * 480))
    }
    let mainTabViewHeight = (window.innerHeight - document.querySelector('.shigure-tab>.tabs').clientHeight)
    setCss({webviewWidth,webviewHeight,mainTabViewHeight})
}


window.addEventListener('DOMContentLoaded', adjustSize)
window.addEventListener('resize', adjustSize)

store.watch( (state) => state.config.webviewWidth, () => { adjustSize() })
store.watch( (state) => state.config.zoomLevel, () => { adjustSize() })
