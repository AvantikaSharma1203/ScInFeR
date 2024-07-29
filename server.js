const express = require('express');
const app = express();
const port = 3000;

// Add CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static webpage directly
app.use(express.static(__dirname));

// Serve the JSON file
app.get('/gene_data.json', (req, res) => {
  res.sendFile(__dirname + '/gene_data.json');
});

// Handle search requests
app.get('/search', (req, res) => {
  const geneName = req.query.geneName;
  console.log(`Searching for gene name: ${geneName}`);

  // Load the JSON file(s) and search for the gene name
  const jsonData = require('./gene_data.json');
  const results = jsonData.filter((gene) => gene.name === geneName);

  res.json({ results });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});