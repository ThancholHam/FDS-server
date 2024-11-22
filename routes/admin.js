//import...

const express = require('express')
const { authCheck } = require('../middleware/authCheck')
const router = express.Router()

//import controller
const { getOrderAdmin, changeOrderStatus,getUser } = require('../controllers/admin')



router.put('/admin/order-status',authCheck,changeOrderStatus)
router.get('/admin/orders',authCheck,getOrderAdmin)
router.get('/admin/manage',authCheck,getUser)


module.exports = router





