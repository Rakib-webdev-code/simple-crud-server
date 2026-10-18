import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
console.log(process.env.DB_USER)

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const conectedClient = await connectToMongoDB()
const db = client.db("SimplecurdDB");
const users = db.collection('users')




app.get('/' ,(req, res) =>{
    res.send('Simple CRUD Server is running')
})

app.get('/users',async(req,res) =>{
  const cursor = users.find({})
  const allUsers = await cursor.toArray()
  res.send(allUsers)
})

app.get('/users/:id', async(req,res) =>{
  console.log('params in the server',req.params)
  const id = req.params.id
  const query = {_id: new ObjectId(id)}
  res.send(result)
})

app.post('/users', async (req, res)=>{
  const newUser = req.body
  const result = await users.insertOne(newUser)
  res.send(result)

  console.log('Adding new user', newUser)
  
})

app.listen(PORT,() =>{
    console.log(`Example app listening on port ${PORT}`)
})