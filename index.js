const mjml = require('mjml');
const fs = require('fs');
const Handlebars = require('handlebars');

// Load the raw MJML file
const rawMJML = fs.readFileSync('./emailTemplate.mjml', 'utf8');

// Load the JSON data
const templateData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

// Compile the MJML using Handlebars
const handlebarsTemplate = Handlebars.compile(rawMJML);

// For each template data item, generate the compiled template
templateData.forEach((data, i) => {
    const compiledTemplate = handlebarsTemplate(data);

    // Convert MJML to HTML
    const { html, errors } = mjml(compiledTemplate);

    if (errors.length) {
        console.error('MJML Errors:', errors);
    } else {
        // Generate a unique filename
        const fileName = `output${i}.html`;

        // Save the HTML file to disk
        fs.writeFileSync(fileName, html);

        console.log(`Generated HTML file: ${fileName}`);
    }
});
