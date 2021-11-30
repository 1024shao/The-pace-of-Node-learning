const axios = require('axios')

axios.get('http://127.0.0.1:8000').then(res => {
  console.log(res.data)
})