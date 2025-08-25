const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const uri = 'mongodb+srv://awinly:Bariska228337@cluster0.i92pwtr.mongodb.net/Awinly?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    console.log('Function started at:', new Date().toISOString());
    console.log('Attempting to connect to MongoDB with URI:', uri);
    await client.connect();
    console.log('Connected to MongoDB successfully');
    const db = client.db('Awinly'); // Убедись, что имя базы совпадает
    const collection = db.collection('properties');

    if (event.httpMethod === 'GET') {
      console.log('Processing GET request');
      const properties = await collection.find({}).toArray();
      console.log('Fetched properties count:', properties.length);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify(properties)
      };
    }

    if (event.httpMethod === 'POST') {
      console.log('POST request received with body:', event.body);
      const property = JSON.parse(event.body);
      const result = await collection.insertOne(property);
      console.log('Inserted property with ID:', result.insertedId);
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Property added', id: result.insertedId })
      };
    }

    if (event.httpMethod === 'PUT') {
      console.log('PUT request received with body:', event.body);
      const property = JSON.parse(event.body);
      const { id, ...updateData } = property;
      const result = await collection.updateOne(
        { id: property.id },
        { $set: updateData }
      );
      if (result.matchedCount === 0) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ message: 'Property not found' })
        };
      }
      console.log('Updated property with ID:', property.id);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Property updated' })
      };
    }

    if (event.httpMethod === 'DELETE') {
      console.log('DELETE request received with body:', event.body);
      const { id } = JSON.parse(event.body);
      const result = await collection.deleteOne({ id });
      if (result.deletedCount === 0) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ message: 'Property not found' })
        };
      }
      console.log('Deleted property with ID:', id);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Property deleted' })
      };
    }

    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error occurred at:', new Date().toISOString());
    console.error('Error message:', error.message);
    console.error('Full error stack:', error.stack);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Server error', error: error.message })
    };
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed at:', new Date().toISOString());
    }
  }
};