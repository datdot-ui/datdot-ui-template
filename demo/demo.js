const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const domlog = require('ui-domlog')
const datdotApp = require('..')

function demoTemplate() {
    const content = datdotApp( protocol('demo') )
     // show logs
    let terminal = bel`<div class=${css.terminal}></div>`
    const el = bel`
    <div class=${css.demo}>
        ${content}
        ${terminal}
    </div>`
    return el

    /*********************************
    * ------ protocols() -------
    *********************************/
    function protocol (name) {
        return send => {
            return function receive (message) {
                showLog(message)
            }
        }
    }

    /*********************************
    * ------ Promise() Element -------
    *********************************/
    // keep the scroll on bottom when the log displayed on the terminal
    function showLog (message) { 
        sendMessage(message)
        .then( log => {
            terminal.append(log)
            terminal.scrollTop = terminal.scrollHeight
        }
    )}

    async function sendMessage (message) {
        return await new Promise( (resolve, reject) => {
            if (message === undefined) reject('no message import')
            const log = domlog(message)
            return resolve(log)
        }).catch( err => { throw new Error(err) } )
    }
}


const css = csjs`
*, *:before, *:after {
    box-sizing: inherit;
}
html {
    font-size: 62.5%;
    height: 100%;
}
.demo {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 75% 25%;
    height: 100%;
}
.terminal {
    background-color: #212121;
    color: #f2f2f2;
    font-size: 13px;
    overflow-y: auto;
}
`
document.body.append( demoTemplate() )