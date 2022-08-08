import express, { response } from 'express'
import { v4 as uuid } from 'uuid'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({origin: '*'}))

interface User {
    id: string
    name: string
    email: string
}

const users: User[] = []

app.get('/users', (req, res) => {
    return res.json(users)
})

app.post('/users', (req, res) => {
    const { name, email } = req.body
    const user = { id: uuid(), name, email }
    users.push(user)
    return res.json(user)
})

app.put('/users/:id', (req, res) => {
    const { id } = req.params
    const { name, email } = req.body

    const userIndex = users.findIndex((user) => {
        return user.id == id
    })

    if (userIndex < 0) {
        return res.status(404).json({ error: 'User not found' })
    }

    users[userIndex] = { id, name, email }

    return res.json({ id, name, email })
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params

    const userIndex = users.findIndex((user) => {
        return user.id == id
    })

    if (userIndex < 0) {
        return res.status(404).json({ error: 'User not found' })
    }

    users.splice(userIndex, 1);

    return res.status(204).send()
})

app.listen('3333', () => {
    console.log("Server Started.")
})