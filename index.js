const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const streaming = require('./routes/streaming')
app.use('/streaming', streaming)

module.exports = app