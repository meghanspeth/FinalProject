

//group is the object of category of person
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawBars = function(group,target,
                         xScale,yScale)
{
   target.selectAll("rect") 
        .data(group)
        .enter()
        .append("rect")
        .attr("x", function(year)
             {
                return xScale([0].year)
             })
        .attr("y", function(year)
             {
                return yScale([0])
            })
        .attr("width", xScale.bandwidth)
         .attr("height", function (year)
            {
                return graphDim.height-yScale([0])
            })    
}


var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{
  var xAxis= d3.axisBottom(xScale)
  var yAxis=d3.axisLeft(yScale)
  
    d3.select("svg")
        .append("g")
         .attr("transform","translate("+margins.left+","+(margins.top+graphDim.height)+")")
        .call(xAxis)
    
    d3.select("svg")
        .append("g")
         .attr("transform","translate("+margins.left+"," +(margins.top)+")")
        .call(yAxis)
        
}

        //labels
//graphDim -object that stores dimensions of the graph area
//margins - objedct that stores the size of the margins
var drawLabels = function(graphDim,margins)
{
    var Labels= d3.select("svg")
        .append("g")
        .classed("labels",true)
    
        Labels.append("text")
               .text("Percentage of people who had a mental illness vs those who received treatment")
                .classed("title", true)
                .attr("text-anchor","middle")
                .attr("x",margins.left+(graphDim.width/2))
                .attr("y",margins.top*1.5)
    
        Labels.append("text")
                .text("Years")
                .classed("label",true)
                .attr("text-anchor","middle")
                .attr("x", margins.left+(graphDim.width/2))
                .attr("y",screen.height*.75)
    
     Labels.append("g")
            .attr("transform","translate(15,"+(margins.top+(graphDim.height/2))+")")
            .append("text")
            .text("Percentage")
            .classed ("label",true)
            .attr("text-anchor","middle")
            .attr("transform","rotate(270)")
      
}

//draw legend
var drawLegend = function(graphDim,margins)
{
    var Legend = d3.select("svg")
        .append("g")
        .classed("legend", true)
        .attr("transform","translate("+(margins.left+10) +"," + (margins.top+10)+")");
    
    var categories = [
       {
           class:"withMI",
           name:"People with Mental Illness"
       },
       {
           class:"withHelp",
           name:"People with mental illness who receieved mental health services"
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
var initGraph = function(groups)
{
    //size of screen
    var screen = {width:870,height:600}
    //how much space on each side
    var margins = {left:50,right:20,top:10,bottom:40}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("svg")
    .append("g")
    .attr("id","#graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    
    var xScale = d3.scaleBand()
        .domain([2008,2017])
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([graph.height,0])
    
    drawAxes(graph,margins,xScale,yScale);
    drawBars(groups,target,graph, xScale,yScale);
    drawLabels(graph,margins);
    drawLegend(graph,margins);
      
    
}



//successFCN for compare bar graph
 
var successFCN=function(groups)
{
    console.log("groups", groups)
    initGraph(groups)
}
var failFCN=function(error)
{
    console.log("error",error)
}
var groupPromise=d3.csv("receivedservices.csv")
 groupPromise.then(successFCN, failFCN)