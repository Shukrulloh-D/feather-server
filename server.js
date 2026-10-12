import express from 'express'
import cors from 'cors'
import { readFile } from 'node:fs/promises'

const app = express()
const PORT = process.env.PORT || 3001

// cors разрешает фронтенду (с другого адреса) обращаться к этому серверу
app.use(cors())

// GET /api/hero, /api/rooms ... — отдаём нужный раздел из db.json
app.get('/api/:section', async (req, res) => {
  const db = JSON.parse(await readFile('./db.json', 'utf-8'))
  const data = db[req.params.section]

  // Если нет ответ 404
  if (data === undefined) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.json(data)
})

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`))