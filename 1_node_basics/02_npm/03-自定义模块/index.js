const _ = require('lodash')

function myChunk(arr) {
  return _.chunk(arr, 2)
}

module.exports = myChunk