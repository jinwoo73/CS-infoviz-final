// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    var category = select.options[select.selectedIndex].value;
    console.log(category);
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
  var sugarScale,totalDeathScale,femaleDeathScale,maleDeathScale,maleRateScale,femaleRateScale; // y axis
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
  
    // sugarScale = d3.scaleLinear()
    // .range([chartHeight, 0])
    // .domain([0, d3.max(data, function(d) { return d.totalDeaths; })]);
    totalDeathScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, data.reduce((prev, cur) => cur.totalDeaths > prev.totalDeaths ? cur : prev).totalDeaths/1000.0]);

    maleDeathScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, data.reduce((prev, cur) => cur.maleDeaths > prev.maleDeaths ? cur : prev).maleDeaths/1000.0]);

    femaleDeathScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, data.reduce((prev, cur) => cur.femaleDeaths > prev.femaleDeaths ? cur : prev).femaleDeaths/1000.0]);

    maleRateScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, data.reduce((prev, cur) => cur.maleRate > prev.maleRate ? cur : prev).maleRate]);

    femaleRateScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, data.reduce((prev, cur) => cur.femaleRate > prev.femaleRate ? cur : prev).femaleRate]);
  
    // Add axes to chart
    addAxes();
  
    // Update the chart for All cereals to initialize
    updateChart('Total Deaths');
  });
  
  function addAxes() {
  
  var xAxis = d3.axisBottom()
  .scale(xBandScale)
  
  var yAxis = d3.axisLeft()
  .scale(totalDeathScale)
  
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
  
  
//   svg.append('g')
//   .attr('transform', `translate(${padding.l}, ${padding.t})`)
//   .call(yAxis);
  
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
  
    for (let i = 0; i <= 10; i++) {
    const y = 60 + i * 19;
    svg.append('g')
      .append("text")
      .attr("x", 45)
      .attr("y", y)
      .text(10 - i)
      .style("font-size", "10px");
  }
  
  function updateChart(manufacturer) {
    //  Create a filtered array of cereals based on the manufacturer
    // var deaths = manufacturer === 'Total Deaths' ? data : data.filter(d => d.manufacturer === manufacturer);
    
    deaths = data;
    console.log('Updating chart with', deaths.length, 'elements')
    console.log(deaths)
    console.log(manufacturer)
    const cutoff = Number(document.getElementById('cutoff').value);
    console.log(function(d){return maleDeathScale(d.maleDeaths)});
    // deaths = deaths.filter(d => manufacturer >= cutoff)

    // **** Draw and Update your chart here ****
    const barGroups = chartG.selectAll('.bar-group')
        .data(deaths, (d) => d.age)

    const groupEnter = barGroups.enter()
        .append('g')
        .attr('class', 'bar-group')
    groupEnter.merge(barGroups)
        .transition()
        .delay((d, i) => i / data.length * 500)
        .duration(250)
        .attr('transform', (d, i) => `translate(${5 + i * barBand}, 0)`);
    const  totaldeaths = [0.0,1.7,0.9,4.6,8.3,8.1,7.2,6.2,5.4,5.0,5.3,5.9,5.3,4.0,3.1,2.4,1.7,1.8];
    const maledeaths = [0.0,1.6,1.0,5.3,9.9,9.9,9.1,7.6,6.7,6.3,6.6,7.5,6.6,7.5,6.6,4.8,3.5,2.6,1.8,1.9];
    if (manufacturer == "Total Deaths") {
      groupEnter.append('rect')
        .data(totaldeaths)
        .attr('width', barWidth-2)
        .attr('height', d =>  19*d)
        .attr('x',function(d,i) {
            return -38 + 2.7*i;
        })
        .attr('y', d => 190-19*d)
        .attr('class', 'bar')
    }
    
    else if (manufacturer === "Male Deaths") {
        groupEnter.append('rect')
        .data(maledeaths)
        .attr('width', barWidth-2)
        .attr('height', d =>  19*d)
        .attr('x',function(d,i) {
            return -38 + 2.7*i;
        })
        .attr('y', d => 190-19*d)
        .attr('class', 'bar')
    }
    else if(manufacturer === "Female Deaths") {
        groupEnter.append('rect')
        .attr('width', barWidth)
        .attr('height', d => chartHeight - femaleDeathScale(d.femaleDeaths))
        .attr('y', d => (femaleDeathScale(d.femaleDeaths)))
        .attr('class', 'bar')
    }
    else if(manufacturer === "Male Rate per 100k") {
        groupEnter.append('rect')
        .attr('width', barWidth)
        .attr('height', d => chartHeight - maleRateScale(d.maleRate))
        .attr('y', d => (maleRateScale(d.maleRate)))
        .attr('class', 'bar')
    }
    else if(manufacturer === "Female Rate per 100k") {
        groupEnter.append('rect')
        .attr('width', barWidth)
        .attr('height', d => chartHeight - femaleRateScale(d.femaleRate))
        .attr('y', d => (femaleRateScale(d.femaleRate)))
        .attr('class', 'bar')
    }
    

    groupEnter.append('text')
        .attr('transform', (d, i) => `translate(15, ${chartHeight + 10}) rotate(-45)`)
        .text(d => d.age)
        .attr('font-size', '14px')
        .attr('text-anchor', 'end');

    barGroups.exit().remove();
}