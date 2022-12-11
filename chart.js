// Global function called when select element is changed
function onCategoryChanged() {
  var select = d3.select('#categorySelect').node();
  var category = select.options[select.selectedIndex].value;
  // Update chart with the selected category of cereal
  updateChart(category);
}
const texts = [
  [70, 275, "<13"], [95, 280, "13-15"], [124, 280, "16-19"], [153, 280, "20-24"],
  [182, 280, "25-29"],[211, 280, "30-34"],[240, 280, "35-39"],[269, 280, "40-44"],
  [298, 280, "45-49"],[327, 280, "50-54"],[356, 280, "55-59"],[385, 280, "60-64"],
  [414, 280, "65-69"],[443, 280, "70-74"],[472, 280, "75-79"],[501, 280, "80-84"],
  [530, 280, "85-89"],[559, 275, "85+"],
  
];

d3.select("body")
  .style("background-color", "lightblue");
// recall that when data is loaded into memory, numbers are loaded as strings
// this function helps convert numbers into string during data preprocessing
function dataPreprocessor(row) {
  return {
      age: row['Age'],
      maleDeaths: row['MaleDeaths'],
      maleRate: row['MaleRate_Per_100K'],
      femaleDeaths: row['FemaleDeaths'],
      femaleRate: row['FemaleRate_Per_100K'],
      totalDeaths: row['TotalDeaths']

  };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = { t: 60, r: 20, b: 80, l: 60 };

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Variable for the spacing of bar charts
var barBand;
var barWidth;

// scales
var sugarScale; // y axis
var xBandScale; // x axis

// Create a group element for appending chart elements
var chartG = svg.append('g')
  .attr('transform', `translate(${padding.l}, ${padding.t})`);

var data;

d3.csv('transport.csv', dataPreprocessor).then(function(dataset) {
  // Create global variables here and intialize the chart
  data = dataset;

  // Compute the spacing for bar bands based on number of cereals
  barBand = chartWidth / data.length;
  barWidth = 0.7 * barBand;

  // **** Your JavaScript code goes here ****
  let ages = data.map(d=>d.Age);
  xBandScale = d3.scaleBand()
  .range([0, chartWidth])
  .domain(ages);

  sugarScale = d3.scaleLinear()
  .range([chartHeight, 0])
  .domain([0, d3.max(data, function(d) { return d.totalDeaths; })]);


  // Add axes to chart
  addAxes();
  
  // Update the chart for All cereals to initialize
  updateChart('Total Deaths');
});

function addAxes() {

var xAxis = d3.axisBottom()
.scale(xBandScale)

var yAxis = d3.axisLeft()
.scale(sugarScale)

svg.append('g')
  .attr('transform', `translate(${padding.l}, ${chartHeight + padding.t})`)
  .call(xAxis)
  .selectAll("text")
  .attr("transform", "rotate(-45)")
  .style("text-anchor", "end");
//xaxis content(ages)


const textElements = svg
  .append('g')
  .selectAll("text")
  .data(texts)
  .enter()
  .append("text")
  .attr("x", d => d[0])
  .attr("y", d => d[1])
  .text(d => d[2])
  .style("font-size","11px")
  .attr("transform", (d, i) => `rotate(-45 ${d[0]} ${d[1]})`);


svg.append('g')
.attr('transform', `translate(${padding.l}, ${padding.t})`)
.call(yAxis);

chartG.append('text').text('Transportation Deaths')
        .attr('x', chartWidth / 2)
        .attr('y', -20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '18px')
}
svg.append('g')
  .append("text")
  .attr("x",285)
  .attr("y",305)
  .text("Age Range")
  .style("font-size","12px")



function updateChart(manufacturer) {
  //  Create a filtered array of cereals based on the manufacturer
  var deaths;
  if (manufacturer === 'Total Deaths')
      deaths = data.filter(d => d.manufacturer !== manufacturer);
  else deaths = data.filter(d => d.manufacturer === manufacturer);

  // **** Draw and Update your chart here ****
  console.log(deaths);

  let ages = deaths.map(d=>d.age);

  // xBandScale.domain(ages).range([0,barBand*ages.length]);
  xBandScale.domain(data.map(function(d) { return d.Age; }));
  var oldChart = chartG.selectAll(".bar")
       .data(deaths);
      //  .attr("class",'bar');
  var newChart = oldChart.enter()
       .append("rect")
       .attr("class","bar");
  newChart.merge(oldChart)
       .attr("x", function(d) { return xBandScale(d.age); })
       .attr("y", function(d) { return sugarScale(d.maleDeaths); })
       .attr("width", barWidth)
       .attr("height", function(d) { return chartHeight - sugarScale(d.maleDeaths); })
       .attr("fill", "#69b3a2");
  newChart.append('g')
       .attr('transform', `translate(${padding.l}, ${chartHeight + padding.t})`)
       .selectAll("text")
       .attr("transform", "rotate(-45)")
       .style("text-anchor", "end");
  var oldlabels = chartG.selectAll(".labels")
       .data(deaths);
      //  .attr("class",'bar');
  var newlabels = oldlabels.enter()
       .append("text")
       .attr("class","labels");
  // newlabels.merge(oldlabels)
  // .attr('transform', `translate(${xBandScale(d.cerealName)},${sugarScale(d.sugar)})`)
  //      .text(function(d) { return d.cerealName; })
  oldChart.exit().remove();
}