

//counties is the array of data
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawcompareBars = function(compare,target,graph, xScale,yScale)
{
   { 
   target.selectAll("rect") 
        .data(compare)
        .enter()
        .append("rect")
        .attr("x", function(compare)
             { console.log (compare.Year);
              var x = xScale(compare.Year); console.log(x,compare.Year);
               // return x
             })
        .attr("y", function(compare)
             {
              console.log(yScale(compare.total))
            return yScale(compare.total)
            })
        .attr("width", yScale.bandwidth)
         .attr("height", function (compare)
           { var y= yScale(compare.total);
               console.log(yScale([0]))
                return graph.height - y
            })    
}

}
var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawcompareAxes = function(graphDim,margins,
                         xScale,yScale)
{
  var xAxis= d3.axisBottom(xScale)
  var yAxis=d3.axisLeft(yScale)
  
    d3.select("#comparebargraph")
        .append("g")
         .attr("transform","translate("+margins.left+","+(margins.top+graphDim.height)+")")
        .call(xAxis)
    
    d3.select("#comparebargraph")
        .append("g")
         .attr("transform","translate("+margins.left+"," +(margins.top)+")")
        .call(yAxis)
        
}

        //labels
//graphDim -object that stores dimensions of the graph area
//margins - objedct that stores the size of the margins
var drawcompareLabels = function(graphDim,margins)
{
    var Labels= d3.select("#comparebargraph")
        .append("g")
        .classed("labels",true)
    
        Labels.append("text")
               .text("Those who have any mental illness vs those with mental illnesses who received mental health services  ")
                .classed("title", true)
                .attr("text-anchor","middle")
                .attr("x",margins.left+(graphDim.width/2))
                .attr("y",margins.top*1.5)
    
        Labels.append("text")
                .text("Years ")
                .classed("label",true)
                .attr("text-anchor","middle")
                .attr("x", margins.left+(graphDim.width/2))
                .attr("y",screen.height*.75)
    
     Labels.append("g")
            .attr("transform","translate(15,"+(margins.top+(graphDim.height/2))+")")
            .append("text")
            .text("Percentage ")
            .classed ("label",true)
            .attr("text-anchor","middle")
            .attr("transform","rotate(270)")
      
}

//draw legend
var drawcompareLegend = function(graphDim,margins)
{
    var Legend = d3.select("#comparelinegraph")
        .append("g")
        .classed("legend", true)
        .attr("transform","translate("+(margins.left+10) +"," + (margins.top+10)+")");
    
    var categories = [
       {
           class:"withMI",
           name:"With Mental Illness"
       },
       {
           class:"withHelp",
           name:"Those who received mental health services"
       }
    ]
    
    var entries=Legend.selectAll("g")
        .data(categories)
        .enter()
        .append("g")
        .classed("legendEntry",true)
        .attr("class", function(category)
             {
            return category.class;
        })
        .attr("transform", function(category,index)
             {
                return "translate(0,"+(index*20)+")";
        })
 
    entries.append("rect")
            .attr("width",10)
            .attr("height",10)
    
    entries.append("text")
            .text(function(category)
                 {return category.name})
            .attr("x",15)
            .attr("y",10)
  


    
    
    
}

//sets up several important variables and calls the functions for the visualization.
var initcompareGraph = function(compare)
{

      //size of screen
    var screen = {width:800,height:600}
    //how much space on each side
    var margins = {left:50,right:20,top:30,bottom:40}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("#comparebargraph")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#comparebargraph")
    .append("g")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
  
    var xScale = d3.scaleBand()
        .domain(["total","services"])
        .range([0,graph.width])
        .padding(.5)

    var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([graph.height,0])
    
    drawcompareAxes(graph,margins,xScale,yScale);
    drawcompareBars(compare,target,graph, xScale,yScale);
    drawcompareLabels(graph,margins);
   // drawcompareLegend(graph,margins);
      
    
}


var successcompareFCN = function(compare)
{
    console.log("compare",compare);
    initcompareGraph(compare);
}

var failcompareFCN = function(compare)
{
    console.log("error",error);
}

var comparePromise = d3.csv("../csv/received.csv")
comparePromise.then(successcompareFCN,failcompareFCN)