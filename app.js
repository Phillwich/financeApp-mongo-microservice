const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./src/routes')()
const { createMongoConnection } = require('./src/datastore')
const PORT = process.env.PORT || 8000

createMongoConnection()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/finance', routes)
app.use((error, req, res, next) => {
    if (error.statusCode) return res.status(error.statusCode).send(error.message)
    return res.send(error)
})

app.listen(PORT, () => console.log('Application is running on', PORT))