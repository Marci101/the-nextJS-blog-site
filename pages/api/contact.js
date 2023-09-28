import { connectDatabase, insertDocument } from '../../lib/db-util';

async function handler(req, res) {

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!', error: error.message });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input!' });
      client.close();
      return;
    }

    const newMessage = {
      email,
      name,
      message
    };

    try {
      const result = await insertDocument(client, 'messages', newMessage);
      newMessage.id = result.insertedId;
      res.status(201).json({ message: 'Successfully stored message!', data: newMessage });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!', error: error.message });
      client.close();
    }
  }
  client.close();
}

export default handler;
