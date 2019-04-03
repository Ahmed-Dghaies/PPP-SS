
  const express = require('express')
  const bodyParser = require('body-parser')
  const cors = require('cors')
  const PORT = process.env.PORT || 3000
  const api = require('./routes/api')
  const app = express()
  const path = require('path');
  
  
  app.use(cors())
  app.use(bodyParser.json())
  app.use(express.static('./dist/App'));

  app.get('/*', function(req,res) {
    
    res.sendFile(path.join(__dirname,'/dist/App/index.html'));
    });

  app.get('/', function(req, res) {
      res.send('Hello from server')
  }  )
  
  
  app.use('/api',api)


  app.listen (PORT, function(){
      console.log('Server running at localhost: '+ PORT)
  })


