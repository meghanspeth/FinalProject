//ageGroup is the array of data that is divided between male and female
//target is the seletion of the g element to place the graph in 
//xScale, yScale are the x and y scales
var drawageLines= function(ageGroup,target,xScale,yScale)

{
  //line for teen age group
    var lineGenerator2 =d3.line()
        .x(function(group)
          { //console.log (xScale(group.Year))
            return xScale(group.Year);
        })
          .y(function(group)
            { console.log (yScale(group.teen))
              return yScale(group.teen)
          })
        console.log("ageGroup",ageGroup[0].teen)
     d3.select("#linegraph2") 
        .select("#graph")
        .append("path")
        .datum(ageGroup)
        .attr("d", lineGenerator2)
    
//line for twenty (26 or older) line
    var lineGenerator4 =d3.line()
        .x(function(group)
          { //console.log (xScale(group.Year))
            return xScale(group.Year);
        })
          .y(function(group)
            { console.log (yScale(group.twenty))
              return yScale(group.twenty)
          })
        console.log("ageGroup",ageGroup[0].twenty)
  
        
    d3.select("#linegraph2") 
        .select("#graph")
        .append("path")
        .datum(ageGroup)
        .attr("d", lineGenerator4)
    
    //line for mid age (26-49) group
    var lineGenerator3 =d3.line()
        .x(function(group)
          { //console.log (xScale(group.Year))
            return xScale(group.Year);
        })
          .y(function(group)
            { console.log (yScale(group.mid))
              return yScale(group.mid)
          })
        console.log("ageGroup",ageGroup[0].mid)
  
        
    d3.select("#linegraph2") 
        .select("#graph")
        .append("path")
        .datum(ageGroup)
        .attr("d", lineGenerator3)
       
 //line for old (50 or older) line
    var lineGenerator5 =d3.line()
        .x(function(group)
          { //console.log (xScale(group.Year))
            return xScale(group.Year);
        })
          .y(function(group)
            { console.log (yScale(group.old))
              return yScale(group.old)
          })
        console.log("ageGroup",ageGroup[0].old)
  
        
    d3.select("#linegraph2") 
        .select("#graph")
        .append("path")
        .datum(ageGroup)
        .attr("d", lineGenerator5)
}



var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


var drawageAxes = function(graphDim,margins,xScale,yScale)
{
  var xAxis= d3.axisBottom(xScale)
  var yAxis=d3.axisLeft(yScale)
  
    d3.select("#linegraph2")
        .append("g")
         .attr("transform","translate("+margins.left+","+(margins.top+graphDim.height)+")")
        .call(xAxis)
    
    d3.select("#linegraph2")
        .append("g")
         .attr("transform","translate("+margins.left+"," +(margins.top)+")")
        .call(yAxis)
        
}

        //labels
//graphDim -object that stores dimensions of the graph area
//margins - objedct that stores the size of the margins
var drawageLabels = function(graphDim,margins)
{
    var Labels= d3.select("#linegraph2")
        .append("g")
        .classed("labels",true)
    
        Labels.append("text")
               .text("Percentage of People with any Mental Illness Divided by Age Group ")
                .classed("title", true)
                .attr("text-anchor","middle")
                .attr("x",margins.left+(graphDim.width/2))
                .attr("y",margins.top*1.05)
    
        Labels.append("text")
                .text("Year")
                .classed("label",true)
                .attr("text-anchor","middle")
                .attr("x", margins.left+(graphDim.width/2))
                .attr("y",graphDim.height*1.3)
    
     Labels.append("g")
            .attr("transform","translate(15,"+(margins.top+(graphDim.height/2))+")")
            .append("text")
            .text("Percent ")
            .classed ("label",true)
            .attr("text-anchor","middle")
            .attr("transform","rotate(270)")
      
}

//draw legend
var drawageLegend = function(graphDim,margins)
{
    var Legend = d3.select("#linegraph2")
        .append("g")
        .classed("legend", true)
        .attr("transform","translate("+(margins.left+10) +"," + (margins.top+10)+")");
    
    var categories2 = [
       {
           class:"18",
           name:"18-25"
       },
       {
           class:"26",
           name:"26 or Older"
       },
         {
           class:"49",
           name:"26-49"
       },
         {
           class:"50",
           name:"50 or Older"
       }
    ]
    
    var entries=Legend.selectAll("g")
        .data(categories2)
        .enter()
        .append("g")
        .classed("legendEntry",true)
        .attr("class", function(category)
             {
            return category.class;
        })
        .attr("transform", function(category2,index)
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

var initageGraph=function(ageGroup)
{
    //size of screen-might have to make smaller to its part of dashboard
    var screen = {width:600,height:300}
    //space on each side
    var margins=
        {left:40,right:30,top:50,bottom:30}
    
    var graph=
        {
            width:screen.width-margins.left-margins.right,
            height: screen.height-margins.top-margins.bottom
        }
    console.log(graph);
     d3.select("#linegraph2")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#linegraph2")
    .append("g")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.right+","+
                        margins.bottom+")");
    
 
     var xScale = d3.scaleLinear()
        .domain([2008,2017])
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([15,25])
        .range([graph.height,0])
    
  
        
    drawageAxes(graph,margins,xScale,yScale);
    drawageLines(ageGroup,target,xScale,yScale);
    drawageLabels(graph, margins,xScale,yScale);
    drawageLegend(graph,margins,xScale,yScale);
    
}



//successFCN for line graph
var successageFCN= function(ageGroup)
{
    console.log("ageGroup", ageGroup)
    initageGraph(ageGroup);
   
}
var failageFCN=function(error)
{
    console.log("error", error)
}
var groupPromise=d3.csv("../csv/ageGroup.csv")
groupPromise.then(successageFCN,failageFCN)

