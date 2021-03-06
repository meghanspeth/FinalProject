
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawreasonBars = function(reasons,target, graph, xScale,yScale)
{ console.log(xScale("Other"))
   target.selectAll("rect") 
        .data(reasons)
        .enter()
        .append("rect")
        .attr("id","bars")
        .attr("y", function(reason)
             { var y = yScale(reason.ReasonShort) ; console.log(y,reason.ReasonShort);
                return y
             })
        .attr("x", function(reason)
             {
             console.log(xScale(reason.Percentage))
            return xScale(0)
            })
        .attr("height", yScale.bandwidth)
         .attr("width", function (reason)
           { 
       console.log (xScale(reason.Percentage))
       var x= xScale(reason.Percentage);
               console.log(xScale([0]))
                return x
            }) 
  .on("mouseenter" ,function(reason)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltipreasons")
        .classed("hiddenreasons",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#tooltipreasons")
        .text(reason.Reason); 
       
      })
   // tool tip off-blue line
    .on("mouseleave",function()
    {
        d3.select("#tooltipreasons")    
        .classed("hiddenreasons",true);
    })

        
      
    
}


var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawreasonAxes = function(graphDim,margins,
                         xScale,yScale)
{
  var xAxis= d3.axisBottom(xScale)
  var yAxis=d3.axisLeft(yScale)
  
    d3.select("#reasonsbargraph")
        .append("g")
         .attr("transform","translate("+margins.left+","+(margins.top+graphDim.height)+")")
        .call(xAxis)
    
    d3.select("#reasonsbargraph")
        .append("g")
         .attr("transform","translate("+margins.left+"," +(margins.top)+")")
        .call(yAxis)
        .attr("id","yreason")
        
}

        //labels
//graphDim -object that stores dimensions of the graph area
//margins - objedct that stores the size of the margins
var drawreasonLabels = function(graphDim,margins)
{
    var Labels= d3.select("#reasonsbargraph")
        .append("g")
        .classed("labels",true)
    
        Labels.append("text")
               .text("Percentage of Self Reported Reasons People Did Not Seek Mental Health Services")
                .classed("title", true)
                .attr("text-anchor","middle")
                .attr("x",margins.left+(graphDim.width/2))
                .attr("y",margins.top*.8)
                .style()
    
        Labels.append("text")
                .text("Percentage")
                .classed("label",true)
                .attr("text-anchor","middle")
                .attr("x", margins.left+(graphDim.width/2))
                .attr("y",screen.height*.74)
    
     Labels.append("g")
            .attr("transform","translate(15,"+(margins.top+(graphDim.height/2))+")")
            .append("text")
            .text("Reasons")
            .classed ("label",true)
            .attr("text-anchor","middle")
            .attr("transform","rotate(270)")
      
}

//draw legend
//var drawLegend = function(graphDim,margins)
//{
 //   var Legend = d3.select("svg")
  //      .append("g")
 //       .classed("legend", true)
 //        .attr("transform","translate("+(margins.left+10) +"," + (margins.top+10)+")");
    
 //    var categories = [
 //       {
 //           class:"cost",
 //           name:"People with Mental Illness"
 //       },
 //       {
 //           class:"withHelp",
 //           name:"People with mental illness who // receieved mental health services"
 //       }
  //   ]
    
  //   var entries=Legend.selectAll("g")
  //       .data(categories)
  //       .enter()
  //       .append("g")
 //        .classed("legendEntry",true)
//         .attr("class", function(category)
 //             {
//             return category.class;
  //       })
  //       .attr("transform", // function(category,index)
  //            {
 //                return "translate(0,"+(index*20)+")";
  //       })
 
  //   entries.append("rect")
  //           .attr("width",10)
  //           .attr("height",10)
    
  //   entries.append("text")
  //           .text(function(category)
  //                {return category.name})
   //          .attr("x",15)
   //          .attr("y",10)
   
    
// }

//sets up several important variables and calls the functions for the visualization.
var initreasonGraph = function(reasons)
{
    //size of screen
    var screen = {width:800,height:600}
    //how much space on each side
    var margins = {left:140,right:20,top:30,bottom:40}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("#reasonsbargraph")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#reasonsbargraph")
    .append("g")
    .attr("id","#graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    
    var yScale = d3.scaleBand()
        .domain(["Cost","Resources","Confidentiality","Could Handle Themselves","Other","Forced to take Meds"])
        .range([graph.height,0])
        .paddingInner(.40)
//console.log(xScale("Other"))
    var xScale = d3.scaleLinear()
        .domain([0,75])
        .range([0,graph.width])
    
    drawreasonAxes(graph,margins,xScale,yScale);
    drawreasonBars(reasons,target,graph,xScale,yScale);
    drawreasonLabels(graph,margins);
    //drawLegend(graph,margins);
      
    
}



//successFCN for compare bar graph
 
var successreasonFCN=function(reasons)
{
    console.log("reasons", reasons)
    initreasonGraph(reasons)
}
var failreasonFCN=function(error)
{
    console.log("error",error)
}
var reasonsPromise=d3.csv("../csv/reasonsfornotherapy.csv")
 reasonsPromise.then(successreasonFCN, failreasonFCN)