const fs = require('fs').promises;
const path = require('path');

exports.handler = async function(event, context) {
  const filePath = path.join(__dirname, '../../data.json');
  const method = event.httpMethod;

  try {
    if (method === 'GET') {
      const data = await fs.readFile(filePath, 'utf8');
      return {
        statusCode: 200,
        body: data
      };
    } else if (method === 'POST') {
      const newProperty = JSON.parse(event.body);
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      data.properties.push({ id: Date.now().toString(), ...newProperty });
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Property added', property: newProperty })
      };
    } else if (method === 'PUT') {
      const { id, ...updatedProperty } = JSON.parse(event.body);
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      const index = data.properties.findIndex(p => p.id === id);
      if (index === -1) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Property not found' }) };
      }
      data.properties[index] = { id, ...updatedProperty };
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Property updated', property: updatedProperty })
      };
    } else if (method === 'DELETE') {
      const { id } = JSON.parse(event.body);
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      const index = data.properties.findIndex(p => p.id === id);
      if (index === -1) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Property not found' }) };
      }
      data.properties.splice(index, 1);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Property deleted' })
      };
    } else {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: ' + error.message })
    };
  }
};