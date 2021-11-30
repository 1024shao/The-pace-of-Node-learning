const querystring = require('querystring')

const query = "?id=2&name=vujson&from='北京'"
const newQuery = querystring.parse(query.split("").splice(1).join(""))
console.log(newQuery)