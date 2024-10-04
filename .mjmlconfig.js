const mjml2html = require('mjml')
const Handlebars = require("handlebars")
const fs = require('fs');

module.exports = function ({ file, data }) {
    data = data || {}
    const mjml = fs.readFileSync('./emailsData.json', 'utf8')
    const template = Handlebars.compile(mjml)
    const { html } = mjml2html(template(data))
    return html
}
