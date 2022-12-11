// Global function called when select element is changed
function onCategoryChanged() {
  var select = d3.select('#categorySelect').node();
  var category = select.options[select.selectedIndex].value;
  // Update chart with the selected category of cereal
  updateChart(category);
}

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

  // chartG.selectAll(".bar")
  //      .data(data)
  //      .enter()
  //      .append("rect")
  //      .attr("x", function(d) { return xBandScale(d.cerealName); })
  //      .attr("y", function(d) { return sugarScale(d.sugar); })
  //      .attr("width", barWidth)
  //      .attr("height", function(d) { return chartHeight - sugarScale(d.sugar); })
  //      .attr("fill", "#69b3a2");

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
svg.append('g')
  .append("text")
  .attr("x",70)
  .attr("y",260)
  .text("13")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",95)
  .attr("y",260)
  .text("13~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",95)
  .attr("y",280)
  .text("15")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",120)
  .attr("y",260)
  .text("16~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",120)
  .attr("y",280)
  .text("19")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",145)
  .attr("y",260)
  .text("20~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",145)
  .attr("y",280)
  .text("24")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",170)
  .attr("y",260)
  .text("25~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",170)
  .attr("y",280)
  .text("29")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",195)
  .attr("y",260)
  .text("30~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",195)
  .attr("y",280)
  .text("34")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",220)
  .attr("y",260)
  .text("35~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",220)
  .attr("y",280)
  .text("39")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",245)
  .attr("y",260)
  .text("40~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",245)
  .attr("y",280)
  .text("44")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",270)
  .attr("y",260)
  .text("45~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",270)
  .attr("y",280)
  .text("49")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",295)
  .attr("y",260)
  .text("50~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",295)
  .attr("y",280)
  .text("54")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",320)
  .attr("y",260)
  .text("55~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",320)
  .attr("y",280)
  .text("59")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",345)
  .attr("y",260)
  .text("60~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",345)
  .attr("y",280)
  .text("64")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",370)
  .attr("y",260)
  .text("65~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",370)
  .attr("y",280)
  .text("69")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",395)
  .attr("y",260)
  .text("70~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",395)
  .attr("y",280)
  .text("74")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",420)
  .attr("y",260)
  .text("75~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",420)
  .attr("y",280)
  .text("79")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",445)
  .attr("y",260)
  .text("80~")
  .style("font-size","12px")
svg.append('g')
  .append("text")
  .attr("x",445)
  .attr("y",280)
  .text("84")
  .style("font-size","12px")
  svg.append('g')
  .append("text")
  .attr("x",470)
  .attr("y",260)
  .text("85+")
  .style("font-size","12px")


svg.append('g')
.attr('transform', `translate(${padding.l}, ${padding.t})`)
.call(yAxis);
}

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