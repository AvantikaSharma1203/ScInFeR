const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const jsonfile = require('jsonfile');

// Add CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Load the gene data JSON file
const geneDataFile = './gene_data.json';
let jsonData = jsonfile.readFileSync(geneDataFile);

// Serve the JSON file
app.get('/gene_data.json', (req, res) => {
  res.sendFile(__dirname + '/gene_data.json');
});

// Handle search requests
app.get('/search', (req, res) => {
  const geneName = req.query.geneName;
  console.log(`Searching for gene name: ${geneName}`);

  // Perform a case-insensitive search
  const results = jsonData.filter((gene) => gene.name.toLowerCase() === geneName.toLowerCase());

  res.json({ results });
});

// Add the dropdown menu JavaScript code
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('.dropdown-btn');
  const dropdowns = document.querySelectorAll('.dropdown-content');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove('show');
      });
      dropdowns[index].classList.toggle('show');
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});