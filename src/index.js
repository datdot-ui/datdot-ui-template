const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const plansList = require('plans-list-layout')
const navgation = require('navgation')

module.exports = datdotApp

function datdotApp (page = "PLANS") {
    const receipients = []
    const el = bel`
    <div class=${css.wrap}>
        <div class=${css.container}>
            ${plansList({page}, plansListProtocol('plans-list') )}
        </div>
        ${navgation({page}, pageProtocol('main-menu'))}
    </div>
    `
    return el

    function pageProtocol (name) {
        return send => {
            receipients[name] = send
            send({page, from: 'datdotApp', flow: name, type: 'ready', filename, line: 25 })
            return (message) => {
                const { page, from, flow, type, action, body } = message
            }
        }
    }

    function plansListProtocol (name) {
        return send => {
            receipients[name] = send
            send({page, from: 'datdotApp', flow: name, type: 'ready', filename, line: 35 })
            return ( message ) => {
                // console.log( message )
                const { page, from, flow, type, action, body } = message
                if (type === 'create') {
                    receipients[name]({page, from: 'datdotApp', type: 'disabled'})
                    console.log('open new plan', filename, 'line', 33)
                }    
                if (type === 'add new plan') console.log('addd new plan', filename, 'line', 43)
            }
        }
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
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
html {
    font-size: 62.5%;
    height: 100%;
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
        grid-template-columns: 100vw;
    }
}
`