import { MongoClient } from 'mongodb';
import { dbCredentials } from '../secret.config';

export async function connectDatabase() {   // MongoDB operations
  const url = `mongodb+srv://${dbCredentials.username}:${dbCredentials.password}@cluster0.6pwciop.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  await client.connect();   // use connect method to connect to the server
  console.log('Connected successfully to server');
  return client;
}

export async function insertDocument(client, collectionName, documentName) {
  const dbName = dbCredentials.databaseName;
  const db = client.db(dbName);   // access to the database
  const collection = db.collection(collectionName);   // access to a "collection" (like to a "DB table" into wich we wanna store data)
  const insertResult = await collection.insertOne(documentName);   // insert a "document" (a JS object) to the "collection"
  console.log('Inserted documents =>', insertResult);
  return insertResult;
}