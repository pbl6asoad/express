const express = require('express')
const fs = require("fs")
const router = require('./routers/export-router')
const app = express()

// console.log(router);
app.use(express.json())

const port = 3000

app.use('/users', router.userRouter)

app.listen(port, () => console.log(`Example app listening on port port!`))