import express from 'express'
import cors from 'cors'
import userRouter from './routes/users.js'
import errorHandlerMiddleware from './middlewares/errorHandler.js';
import nedb from 'nedb-promises';
import registerRouter from './routes/register.js'

export const database = new nedb({ filename : 'users.db', autoload : true });


const app = express()
const PORT = 8000


// Middleware
app.use(express.json())
app.use(cors())


// Routes
app.use('/api/users', userRouter )
app.use('/api/register', registerRouter)


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    console.log('USERNAME', username, 'PASSWORD', password);
    const existingUser = await database.findOne({ username : username, password: password })
    if(!existingUser) return res.status(400).json({ message: `Fel användarnamn eller lösenord`})

    const response = {
        success : true,
        status : 201,
        message : 'success'
    }

    res.json(response)
    console.log('Våran response:', response);
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})

// Middleware för felhantering
app.use(errorHandlerMiddleware)