import express from 'express'
import 'dotenv/config'
import authRouter from './routers/auth'
import cors from 'cors'

const app = express()

const PORT = 4000

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)
app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`)
})
