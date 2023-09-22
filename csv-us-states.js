const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'uscities.csv'; // Replace with your CSV file path
const outputFile = 'usInfo/usstates.json'; // Replace with your desired JSON output file path

const states = new Set(); // Use a Set to store unique state names

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const stateName = row['state_name']; // Assuming 'state_id' is the column name with state names
    states.add(stateName);
  })
  .on('end', () => {
    // Convert the Set to an array and write it to the JSON file
    const uniqueStates = [...states];
    fs.writeFileSync(outputFile, JSON.stringify(uniqueStates, null, 2), 'utf-8');
    console.log(`Unique U.S. state names have been written to ${outputFile}`);
  })
  .on('error', (error) => {
    console.error('Error:', error.message);
  });
