const developperURL = "https://raw.githubusercontent.com/Noah-B-Baker/Gaming-Dataset/main/data/developper.csv?raw=true";
const plateformURL = "https://raw.githubusercontent.com/Noah-B-Baker/Gaming-Dataset/main/data/plateform.csv?raw=true";
const publisherURL = "https://raw.githubusercontent.com/Noah-B-Baker/Gaming-Dataset/main/data/publisher.csv?raw=true";
const vgsalesURL = "s";
const currentURL = vgsalesURL;

// from data.js
const tableData = data;

// get table references
const tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    const row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    }
    );
  });
}

function handleClick() {

  // Grab the datetime value from the filter
  const date = d3.select("#datetime").property("value");
  let filteredData = tableData;

  // Check to see if a date was entered and filter the
  // data using that date.
  if (date) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.datetime === date);
  }

  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
// buildTable(tableData);




// // FUNCTION #3 of 4
function optionChanged(option) {
  d3.csv(option).then(function (devData) {
    console.log(devData)
    buildTable(devData);
  });
}

// // FUNCTION #4 of 4
// function initDashboard() {
//     var dropdown = d3.select("#selDataset")
//     d3.json("samples.json").then(data => {
//         var names = data.names;
//         names.forEach(UID => {
//             dropdown.append("option").text(UID).property("value", UID)
//         })
//         buildCharts(names[0]);
//         populateDemoInfo(names[0]);
//     });
// };

// initDashboard();
