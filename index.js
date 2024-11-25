const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const api = require('./routes/api.routes')

dotenv.config();
const databaseConnect = require('./db/config')
databaseConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', api)

module.exports = app