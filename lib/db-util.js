import { MongoClient } from 'mongodb';

export async function connectDatabase() {   // MongoDB operations
  const url = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.6pwciop.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  await client.connect();   // use connect method to connect to the server
  console.log('Connected successfully to server');
  return client;
}

export async function insertDocument(client, collectionName, documentName) {
  const dbName = process.env.mongodb_database;
  const db = client.db(dbName);   // access to the database
  const collection = db.collection(collectionName);   // access to a "collection" (like to a "DB table" into wich we wanna store data)
  const insertResult = await collection.insertOne(documentName);   // insert a "document" (a JS object) to the "collection"
  console.log('Inserted documents =>', insertResult);
  return insertResult;
}