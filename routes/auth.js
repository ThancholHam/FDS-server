//import...

const express = require('express')
const router = express.Router()

//import controller
const {register,login,currentUser,currentAdmin} = require('../controllers/auth')
//import Middleware
const { authCheck , adminCheck} = require('../middleware/authCheck')

router.post('/register', register)
router.post('/login',login)
router.post('/current-user',authCheck,currentUser)
router.post('/current-admin',authCheck,adminCheck,currentUser)

module.exports = router














module.exports = router