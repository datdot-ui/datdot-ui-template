const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const plansList = require('plans-list-layout')
const navgation = require('navgation')

module.exports = datdotApp

function datdotApp (protocol) {
    const receipients = []
    const send2Parent = protocol( receive )
    const page = 'PLANS'
    let nav = navgation({page}, pageProtocol('main-menu'))
    let user = bel`<h1>USER page</h1>`
    let plans = plansList({page}, plansListProtocol('plans-list') )
    let jobs = bel`<h1>JOBS page</h1>`
    let apps = bel`<h1>APPS page</h1>`
    const container = bel`<div class=${css.container}></div>`
    const el = bel`<div class=${css.wrap}>${container}${nav}</div>`
    container.append(plans)

    return el


    /*************************
    * ------ Actions -------
    *************************/
    function handlePageRender (message) {
        const { page, from, flow, type, action, body, filename } = message
        container.innerHTML = ''
        if (from === 'user') container.append(user)
        if (from === 'plans') container.append(plans)
        if (from === 'jobs') container.append(jobs)
        if (from === 'apps') container.append(apps)
        return send2Parent({page, from, flow, type: 'render-page', body, filename: `ui-template/${filename}`, line: 31 })
    }
    /*************************
    * ------ Protocols -------
    *************************/
    function pageProtocol (name) {
        return send => {
            receipients[name] = send
            return (message) => {
                const { page, from, flow, type, action, body, filename } = message
                send2Parent({...message, filename: `ui-template/${filename}`, line: 34})
                if (type === 'init') return send2Parent({page, from, flow, type: 'ready', body, filename: `ui-template/${filename}`, line: 30 })
                if (type === 'current-active') return handlePageRender(message)
            }
        }
    }

    function plansListProtocol (name) {
        return send => {
            receipients[name] = send
            return ( message ) => {
                // console.log( message )
                const { page, from, flow, type, action, body, filename } = message
                if (type === 'init') send2Parent({page, from: name, flow, type: 'ready', body, filename: `ui-template/${filename}`, line: 42 })
                if (type === 'create') {
                    let log = {page, from, flow: 'demoAPP', type: 'disabled', body, filename: `ui-template/${filename}`, line: 44 }
                    receipients[name](log)
                    send2Parent(log)
                    console.log('open new plan', page, from, body, 'line', 47)
                }    
                if (type === 'add new plan') console.log('addd new plan', page, from, body, 'line', 49)
            }
        }
    }

    /*************************
    * ------ receiver -------
    *************************/
    function receive (message) {
        const { page, from, flow, type, action, body } = message
        console.log( message);
    }
}


const css = csjs`
:root {
    --white: #fff;
    --black: #000;
    --dark33: #333;
    --dark4B: #4B4B4B;
    --greyBB: #BBB;
    --greyDD: #DDD;
    --greyD9: #D9D9D9;
    --greyED: #EDEDED;
    --greyEA: #EAEAEA;
    --greyE4: #E4E4E4;
    --grey70: #707070;
    --grey88: #888;
    --greyF2: #F2F2F2;
}
body {
    padding: 0;
    margin: 0;
    font-size: 100%;
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
    background-color: var(--greyE4);
}
h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
}
.wrap {
    display: grid;
    grid-template-rows: auto 40px;
    grid-template-columns: minmax(auto, 800px);
    width: 100%;
    max-width: 800px;
    height: 100%;
    margin: 0 auto;
    background-color: var(--greyF2);
}
.container {
    padding: 20px 20px 0 20px;
}
.title {
    font-size: 2.6rem;
    font-weight: bold;
    color: var(--black);
}
@media (max-width: 800px) {
    .wrap {
        grid-template-columns: 100%;
        max-width: 100%;
    }
}
`