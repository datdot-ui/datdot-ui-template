const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const plansList = require('plans-list-layout')

module.exports = datdotApp

function datdotApp (page = "PLANS") {
    const el = bel`
    <div class=${css.wrap}>
        ${plansList({page}, plansListProtocol('plans-list') )}
    </div>
    `
    return el

    function plansListProtocol (name) {
        return send => {
            send({page: "PLANS", from: 'datdotApp', flow: name, type: 'ready', filename, line: 19 })
            return ( message ) => {
                console.log( message )
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
    --grey70: #707070;
    --grey88: #888;
}
html {
    font-size: 62.5%
}
body {
    padding: 0;
    margin: 0;
    font-size: 100%;
    height: 100%;
}
h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
}
.wrap {
    padding: 20px 20px 0 20px;
    max-width: 600px;
}
.title {
    font-size: 2.6rem;
    font-weight: bold;
    color: var(--black);
}
`