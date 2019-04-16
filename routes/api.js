const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/check-auth');




router.get('/', (req,res)=>{
    res.send('From API route')
})

router.get('/parameters', verifyToken, (req, res) => {
    
        let specialEvents = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
        res.json(specialEvents)
        console.log(res.status)
})

router.post('/register', (req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registered) => {
        if (error) {
            console.log(error)
        } else {
            let payload ={ subject : registered._id}
            let token = jwt.sign(payload, 'secretKey') 
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email : userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            }
            else if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payload ={ subject : user._id}
                let token = jwt.sign(payload, 'secretKey') 
                res.status(200).send({token})
            }
        }
    })
})

module.exports = router