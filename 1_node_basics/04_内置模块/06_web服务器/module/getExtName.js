function getFileType(extname) {
  switch (extname) {
    case '.html':
      return 'text/html'
    case '.js':
      return 'text/js'
    case '.css':
      return 'text/css'
    default:
      return 'text/html'
  }
}

module.exports = { getFileType }