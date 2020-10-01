{  
    d3.select("#graph1")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
     {
        console.log (xScale(getFinal(penguin)));
        return xScale(getFinal(penguin));
     })
     .attr("cy", function(penguin)
          {
            console.log (yScale(getHwMean(penguin)));   
            return yScale(getHwMean(penguin));
          }) 
    .attr("r",2)
    
     .on("mouseenter", function(penguin)
       {
        var xPos=d3.event.pageX;
        var yPos=d3.event.pageY;
        d3.select("#tooltip")
                .classed("hidden", false)
                .style("top",yPos+"px")
                .style("left",xPos+"px")
        d3.select("img")
        .attr("src", "imgs/" + penguin.picture)
        drawPlot(penguin,screen,xScale,yScale)
 })
}