const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'uscities.csv'; // Replace with your CSV file path
const outputFile = 'usInfo/cities.json'; // Replace with your desired JSON output file path

const cities = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const cityName = row['city']; // Adjust the column name as needed
    cities.push({ countryName: 'United States', cityName });
  })
  .on('end', () => {
    // Write the JSON file
    fs.writeFileSync(outputFile, JSON.stringify(cities, null, 2), 'utf-8');
    console.log(`City names have been written to ${outputFile}`);
  })
  .on('error', (error) => {
    console.error('Error:', error.message);
  });
