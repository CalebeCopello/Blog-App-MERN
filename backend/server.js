import express from 'express'

const app = express()
const PORT = 3050

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`)
})