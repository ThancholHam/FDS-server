//step import express

const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')
const { register } = require('./controllers/auth')
const { category } = require('./config/prisma')


// const authRouter = require('./routes/auth')
// const categoryRouter = require('./routes/category')

//middleware
app.use(morgan('combined'))
app.use(express.json({limit:'20mb'}))
app.use(cors())

// app.use('/api', authRouter)
// app.use('/api', categoryRouter)
readdirSync('./routes')
.map((c)=>app.use('/api',require('./routes/'+c)))



// app.use('/api', register)


//step 3 Router
// app.post('/api',(req,res)=> {
//     //code
//     const {username,password} = req.body
//     console.log(username,password)
//     res.send('Jukkru 555+')
// })




//step 2 start sever
app.listen(5007, () => console.log('Sever is running on port 5007'))