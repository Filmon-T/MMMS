const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const cookieParser = require('cookie-parser')

const AppError = require('./src/utils/appError')
const globalErrorHandler = require('./src/controllers/errorController')
const userRouter = require('./src/routes/userRoutes')
const equipmentMaintenanceForm = require('./src/routes/equipmentMaintenanceFormRoutes')
const workOrderFormat = require('./src/routes/workOrderFormatRoutes')

const cors = require('cors')

const app = express()

app.use(cors())

app.use(
   cors({
      // origin: 'http://192.168.1.2:8080',
      origin: '*',
   })
)

dotenv.config({ path: './config.env' })
app.use(morgan('dev'))
if (process.env.NODE_ENV === 'development') {
}

app.use(
   express.json({
      //limit: '10kb'
   })
)

app.use(express.urlencoded({ extended: true, limit: '10kb' }))

app.use(cookieParser())

// Test middleware
app.use((req, res, next) => {
   req.requestTime = new Date().toISOString()
   next()
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/workOrderFormat/', workOrderFormat)
app.use('/api/v1/equipmentMaintenanceForm', equipmentMaintenanceForm)

app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

mongoose
   .connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
   })
   .then(() => console.log('DB connection successful!'))

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
   console.log(`Server has started: http://localhost:${port}`)
})

process.on('unhandledRejection', (err) => {
   console.log('UNHANDLED REJECTION! Shutting down...')
   console.log(err.name, err.message)
   server.close(() => {
      process.exit(1)
   })
})

module.exports = app
