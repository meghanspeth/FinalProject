//people is the array of data that is divided between male and female
//target is the seletion of the g element to place the graph in 
//xScale, yScale are the x and y scales
var drawLines= function(people,target,xScale,yScale)

{
    var lineGenerator =d3.line()
        .x(function(year,i)
          {
            return xScale(i);
        })
          .y(function(percent)
            {
              return yScale(percentage)
          })
          
    var lines=d3.select("svg") 
        .select("#graph")
        .selectAll("g")
        .data(people)
        .enter()
        .append("g")
        .classed("line",true)
        .attr("fill", "none")
          
       lines.append("path")
       .datum(function(people)
                {
             //console.log("function")
                 return people.percentage
                })
       .attr("d", lineGenerator)
    
}



var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}



var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var initGraph=function(people)
{
    //size of screen-might have to make smaller to its part of dashboard
    var screen = {width:300,height:150}
    //space on each side
    var margins=
        {left:20,right:20,top:20,bottom:20}
    
    var graph=
        {
            width:screen.width-margins.left-margins.right,
            height: screen.height-margins.top-margins.bottom
        }
    console.log(graph);
     d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("svg")
    .append("g")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
 
     var xScale = d3.scaleLinear()
        .domain([2008,2017])
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([0,25])
        .range([graph.height,0])
    
    
    //drawAxes(graph,margins,xScale,yScale);
    drawLines(people,target,xScale,yScale);
    //drawLabels(graph,margins);
      
}




var successFCN= function(people)
{
    console.log("people", people)
    initGraph(people);
}
var failFCN=function(error)
{
    console.log("error",error)
}
var pplPromise=d3.json("genderData.json")
pplPromise.then(successFCN,failFCN)