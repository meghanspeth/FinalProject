//people is the array of data that is divided between male and female
//target is the seletion of the g element to place the graph in 
//xScale, yScale are the x and y scales
var drawgenderLines= function(people,target,xScale,yScale)

{
    var lineGenerator =d3.line()
        .x(function(entry,i)
          {
            return xScale(entry.year);
        })
          .y(function(entry)
            {
              return yScale(entry.percentage)
          })
       console.log("people",people[0].sex) 
    console.log(people[0].years)
    var lines=d3.select("#genderLineGraph") 
        .select("#graph")
        .selectAll("g")
        .data(people)
        .enter()
        .append("g")
        .attr("class", function(person)
             {
            return person.sex
            })
    
        target.append("g")
        .selectAll("circle")
        .data(people[0].years)
        .enter()
        .append("circle")
        .attr("cx", function(entry)
             {
            return xScale(entry.year)
        })
        .attr("cy", function(entry)
             { console.log(entry)
            return yScale(entry.percentage)
        })
        .attr("r",4)
        .attr("id","female")
        
     //tooltip on
      .on("mouseenter" ,function(person)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltipfemale")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
       d3.select("#percent1")   
        .text(person.percentage)
       
      })
   // tool tip off-blue line
    .on("mouseleave",function()
    {
        d3.select("#tooltipfemale")    
        .classed("hidden",true);
    })
    
    //circle and mouseenter/leave functions for male line
        target.append("g")
        .selectAll("circle")
        .data(people[1].years)
        .enter()
        .append("circle")
        .attr("cx", function(entry)
             {
            return xScale(entry.year)
        })
        .attr("cy", function(entry)
             { //console.log(entry)
            return yScale(entry.percentage)
        })
        .attr("r",4)
        .attr("id","male")
        //tooltip on-blue line
    .on("mouseenter" ,function(person)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltip2")
        .classed("hidden2",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
           d3.select("#percent2")
        .text(person.percentage); 
       
      })
   // tool tip off-blue line
    .on("mouseleave",function()
    {
        d3.select("#tooltip2")    
        .classed("hidden2",true);
    })

          lines.append("path")
       .datum(function(person)
                {
             
                 return person.years
                })
       .attr("d", lineGenerator)
    
  
}



var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


var drawgenderAxes = function(graphDim,margins,xScale,yScale)
{
  var xAxis= d3.axisBottom(xScale)
  var yAxis=d3.axisLeft(yScale)
  
    d3.select("#genderLineGraph")
        .append("g")
         .attr("transform","translate("+margins.left+","+(margins.top+graphDim.height)+")")
        .call(xAxis)
    
    d3.select("#genderLineGraph")
        .append("g")
         .attr("transform","translate("+margins.left+"," +(margins.top)+")")
        .call(yAxis)
        
}

        //labels
//graphDim -object that stores dimensions of the graph area
//margins - objedct that stores the size of the margins
var drawgenderLabels = function(graphDim,margins)
{
    var Labels= d3.select("#genderLineGraph")
        .append("g")
        .classed("labels",true)
    
        Labels.append("text")
               .text("Percentage of People with any Mental Illness Divided by Gender ")
                .classed("title", true)
                .attr("text-anchor","middle")
                .attr("x",margins.left+(graphDim.width/2))
                .attr("y",margins.top*1.1)
    
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
var drawgenderLegend = function(graphDim,margins)
{
    var Legend = d3.select("#genderLineGraph")
        .append("g")
        .classed("legend", true)
        .attr("transform","translate("+(margins.left+10) +"," + (margins.top+10)+")");
    
    var categories = [
       {
           class:"female",
           name:"Female"
       },
       {
           class:"male",
           name:"Male"
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

var initgenderGraph=function(people)
{
    //size of screen-might have to make smaller to its part of dashboard
    var screen = {width:600,height:300}
    //space on each side
    var margins=
        {left:50,right:20,top:30,bottom:50}
    
    var graph=
        {
            width:screen.width-margins.left-margins.right,
            height: screen.height-margins.top-margins.bottom
        }
    console.log(graph);
     d3.select("#genderLineGraph")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#genderLineGraph")
    .append("g")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
 
     var xScale = d3.scaleLinear()
        .domain([2008,2017])
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([10,25])
        .range([graph.height,0])
    
    
    drawgenderAxes(graph,margins,xScale,yScale);
    drawgenderLines(people,target,xScale,yScale);
    drawgenderLabels(graph,margins,xScale,yScale);
    drawgenderLegend(graph,margins,xScale,yScale);
    
}



//successFCN for line graph
var successFCN= function(people)
{
    console.log("people", people)
    initgenderGraph(people);
}
var failFCN=function(error)
{
    console.log("error", error)
}
var pplPromise=d3.json("../csv/genderD.json")
pplPromise.then(successFCN,failFCN)



