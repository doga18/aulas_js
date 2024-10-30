// Importando o mongoose para criar a conexão com o mongo.
const mongoose = require("mongoose");
// Importando o dotenv para pegar as variáveis de ambiente.
require("dotenv").config();
// Importando o mongoose para criar a conexão com o mongo.
username = process.env.DB_USERNAME;
password = process.env.DB_PASSWORD;

const { MongoClient, ServerApiVersion } = require('mongodb');

const conn = async () => {
  const uri = `mongodb+srv://${username}:${password}@cluster0.qeahd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    const dbConn = await mongoose.connect(
      uri
    )

    console.log("Conectado ao banco de dados com sucesso!");

  } catch (error) {
    console.error(error);
  }
}

conn();

module.exports = { conn };


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function run() {
//   try{
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// // Criando a conexão de banco de dados com o mongo para ser exportada para o projeto e a api.

// module.exports = {client};