/*
 * 
 * 
 */

window.com_cccclab_expertsystemsimulator_ui_Simulator = function() {
    var simulatorElement = this.getElement();

    var margin = {
        top: -5,
        right: -5,
        bottom: -5,
        left: -5
    };

    var width = window.innerWidth; //- margin.left - margin.right,
    var height = window.innerHeight; // - margin.top - margin.bottom;
    // default spacing between grid line is set to 10 units
    var spacing = 10;

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);

    var dragCircle = d3.behavior.drag()
        .origin(function() {
            var current = d3.select(this);
            return {
                x: current.attr("cx"),
                y: current.attr("cy")
            };
        })
        .on("dragstart", dragCircleStart)
        .on("drag", dragCircleMove)
        .on("dragend", dragCircleEnd);

    var dragEdge = d3.behavior.drag()
        .origin(function() {
            var current = d3.select(this);
            return {
                x: current.attr("x"),
                y: current.attr("y")
            };
        })
        .on("dragstart", dragEdgeStart)
        .on("drag", dragEdgeMove)
        .on("dragend", dragEdgeEnd);

    var svg = d3.select(simulatorElement).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
        .call(zoom);

    var rect = svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all");
    // svg, obj container
    var container = svg.append("g");
    // grid x-axis y-axis
    container.append("g")
        .attr("class", "x axis")
        .selectAll("line")
        .data(d3.range(0, width, spacing))
        .enter().append("line")
        .attr("x1", function(d) {
            return d;
        })
        .attr("y1", 0)
        .attr("x2", function(d) {
            return d;
        })
        .attr("y2", height);

    container.append("g")
        .attr("class", "y axis")
        .selectAll("line")
        .data(d3.range(0, height, spacing))
        .enter().append("line")
        .attr("x1", 0)
        .attr("y1", function(d) {
            return d;
        })
        .attr("x2", width)
        .attr("y2", function(d) {
            return d;
        });
    // end grid x-axis y-axis
    /*
        d3.tsv("dots.tsv", dottype, function(error, dots) {
            dot = container.append("g")
                .attr("class", "dot")
                .selectAll("circle")
                .data(dots)
                .enter().append("circle")
                .attr("r", 5)
                .attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                })
                .call(drag);
        });
    */
    var jsonCircles = [{
        "x_axis": 30,
        "y_axis": 30,
        "radius": 10,
        "color": "green"
    }, {
        "x_axis": 70,
        "y_axis": 70,
        "radius": 30,
        "color": "purple"
    }, {
        "x_axis": 110,
        "y_axis": 100,
        "radius": 20,
        "color": "red"
    }];
    
    var circlesEdge = container.append("g")
    .selectAll("circle")
    .attr("class", "circleEdge")
    .data(jsonCircles)
    .enter()
    .append("rect")
    .attr("width", function(d) {
        return d.radius * 2;
    })
    .attr("height", function(d) {
        return d.radius * 2;
    })
    .attr("x", function(d) {
        return d.x_axis - d.radius;
    })
    .attr("y", function(d) {
        return d.y_axis - d.radius;
    })
    .attr("fill", "none")
    .attr("stroke", function(d) {
        return d.color;
    })
    .attr("stroke-width", 2)
    .call(dragEdge);
    
    var circles = container.selectAll(".circleEdge")
        .attr("class", "circle")
        .data(jsonCircles)
        .enter()
        .append("circle")
        .attr("r", function(d) {
            return d.radius;
        })
        .attr("cx", function(d) {
            return d.x_axis;
        })
        .attr("cy", function(d) {
            return d.y_axis;
        })
        .attr("fill", function(d) {
            return d.color;
        })
        .call(dragCircle);

    function zoomed() {
        container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }
    // drag circle events
    function dragCircleStart(d) {
        this.parentNode.appendChild(this);
        d3.select(this).classed("dragging", true).attr("fill-opacity", 0.3);
        d3.event.sourceEvent.stopPropagation();
    }

    function dragCircleMove(d) {
        var obj = d3.select(this);
        var r = obj.attr("r");
        var x = Math.max(r, Math.min(width - r, d3.event.x));
        var y = Math.max(r, Math.min(height - r, d3.event.y));

        obj.attr("cx", x).attr("cy", y);

        // return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5);
    }

    function dragCircleEnd(d) {
        d3.select(this).classed("dragging", false).attr("fill-opacity", 1.0);
    }
    // end drag circle events
    // drag edge events
    function dragEdgeStart(d) {
        d3.select(this).classed("dragging", true);
        d3.event.sourceEvent.stopPropagation();
    }

    function dragEdgeMove(d) {
        var obj = d3.select(this);
        var dw = obj.attr("width");
        var dh = obj.attr("height");
        var x = Math.max(0, Math.min(width - dw, d3.event.x));
        var y = Math.max(0, Math.min(height - dh, d3.event.y));

        obj.attr("x", x).attr("y", y).attr("fill-opacity", 0.3);

        // return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5);
    }

    function dragEdgeEnd(d) {
        d3.select(this).classed("dragging", false).attr("fill-opacity", 1.0);
    }
    
    // end drag edge events
    this.onStateChange = function() {

    }
}
