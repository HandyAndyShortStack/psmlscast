const { formatDate } = require('./format_date.js');

const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "Nils" }));

console.log(formatDate());
