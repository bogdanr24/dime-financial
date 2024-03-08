// app.js

// Sample data for the pie chart
var data = {
    labels: ["Category A", "Category B", "Category C"],
    datasets: [{
      data: [30, 40, 30], // Values for each category
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for each category
    }]
  };
  
  // Get the context of the canvas element
  var ctx = document.getElementById("pieChart").getContext("2d");

  
  // Create a pie chart
  var pieChart = new Chart(ctx, {
    type: 'pie',
    data: data
  });
  