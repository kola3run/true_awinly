const fs = require('fs').promises;
const path = require('path');

exports.handler = async function(event, context) {
  const filePath = path.join(__dirname, '../../data.json');
  const method = event.httpMethod;
  console.log(`[${new Date().toISOString()}] Received ${method} request to /api/properties`);

  try {
    try {
      await fs.access(filePath);
      console.log(`[${new Date().toISOString()}] data.json found at ${filePath}`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] data.json not found, creating new one`);
      await fs.writeFile(filePath, JSON.stringify({ properties: [] }, null, 2));
    }

    if (method === 'GET') {
      const data = await fs.readFile(filePath, 'utf8');
      console.log(`[${new Date().toISOString()}] Successfully read data.json`);
      return { statusCode: 200, body: data };
    } else if (method === 'POST') {
      const newProperty = JSON.parse(event.body);
      console.log(`[${new Date().toISOString()}] Adding new property:`, newProperty);
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      data.properties.push({ id: Date.now().toString(), ...newProperty });
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(`[${new Date().toISOString()}] Property added, data.json updated`);
      return { statusCode: 200, body: JSON.stringify({ message: 'Property added', property: newProperty }) };
    } else if (method === 'PUT') {
      const { id, ...updatedProperty } = JSON.parse(event.body);
      console.log(`[${new Date().toISOString()}] Updating property with id: ${id}`);
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      const index = data.properties.findIndex(p => p.id === id);
      if (index === -1) {
        console.error(`[${new Date().toISOString()}] Property not found: ${id}`);
        return { statusCode: 404, body: JSON.stringify({ error: 'Property not found' }) };
      }
      data.properties[index] = { id, ...updatedProperty };
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(`[${new Date().toISOString()}] Property updated, data.json updated`);
      return { statusCode: 200, body: JSON.stringify({ message: 'Property updated', property: updatedProperty }) };
    } else if (method === 'DELETE') {
      const { id } = JSON.parse(event.body);
      console.log(`[${new Date().toISOString()}] Deleting property with id: ${id}`);
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      const index = data.properties.findIndex(p => p.id === id);
      if (index === -1) {
        console.error(`[${new Date().toISOString()}] Property not found: ${id}`);
        return { statusCode: 404, body: JSON.stringify({ error: 'Property not found' }) };
      }
      data.properties.splice(index, 1);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(`[${new Date().toISOString()}] Property deleted, data.json updated`);
      return { statusCode: 200, body: JSON.stringify({ message: 'Property deleted' }) };
    } else {
      console.error(`[${new Date().toISOString()}] Method not allowed: ${method}`);
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Function error:`, error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error: ' + error.message }) };
  }
};