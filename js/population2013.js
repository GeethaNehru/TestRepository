let margin = {top: 150, right: 50, bottom: 150, left:150},
    width = 1500 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;


let svg = d3.select("body")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");



let xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

let yScale = d3.scale.linear()
    .range([height, 0]);

let xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

let yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");


d3.json("../output/population13.json", function(data) {
 

  
  data.forEach(function(d) {
    d.Country = d.Country;
    d.value = +d.value;       
    console.log(d.value);  
  });


  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.Country; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.value; } ) ]);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(800)
    .delay( function(d,i) { return i * 200; })
    .attr({
      "x": function(d) { return xScale(d.Country); },
      "y": function(d) { return yScale(d.value); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.value); }
    })
    .style("fill", function(d,i) { return 'rgb(100, 10, ' + ((i * 10) + 25) + ')'});


        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function(d){
                return d.value;
            })
            .attr({
                "x": function(d){ return xScale(d.Country)+ xScale.rangeBand()/1.8; },
                "y": function(d){ return yScale(d.value) -5; },
                "font-family": 'sans-serif',
                "font-size": '13px',
                "font-weight": 'bold',
                "fill": 'pink',
                "text-anchor": 'middle'
            })
            ;

    // Draw xAxis and position the label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "20px");
        
    svg.append("g")
        .attr("class","x axis")
        .attr("transform","translate(0," + height + ")")
        .append("text")
        .attr("dx","30em")
        .attr("dy","10em")
        .text("Countries");


        
    
    // Draw yAxis and position the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-5em")
        .style("text-anchor", "middle")
        .style("fill","white")
        .text("In Millions");
});

