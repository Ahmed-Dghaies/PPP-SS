
  const express = require('express')
  const bodyParser = require('body-parser')
  const cors = require('cors')
  const PORT = 3000
  const api = require('./routes/api')
  const app = express()
  
  
  app.use(cors())
  app.use(bodyParser.json())
  
  app.get('/', function(req, res) {
      res.send('Hello from server')
  }  )
  
  
  app.use('/api',api)
  app.listen (PORT, function(){
      console.log('Server running at localhost: '+ PORT)
  })