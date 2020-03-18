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
app.use((err, req, res, next) => {
    return res.status(err.statusCode).send(err.message)
})

app.listen(PORT, () => console.log('Application is running on', PORT))