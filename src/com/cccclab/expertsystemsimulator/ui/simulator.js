/**
 * simulator class js
 */
var simulator = null;

function Simulator(element) {
  this.mode = "circle";
  this.element = element;
  this.spacing = 10;
  this.width = 600; // this.spacing * Math.floor(window.innerWidth / this.spacing);
  this.height = 600; // this.spacing * Math.floor(window.innerHeight / this.spacing);
  this.svg = d3.select(this.element)
    .append('svg')
    .attr('id', 'mainSVG')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight)
    .append('g')
    .attr('transform', 'translate(0, 0)');
  this.container = this.svg.append('g').attr('id', 'mainContainer');
  this.rect = this.container.append('rect')
    .attr('id', 'mainRect')
    .attr('width', this.width)
    .attr('height', this.height)
    .style('fill', 'none')
    .style('pointer-events', 'all');
  this.canvas = this.container.append('g').attr('id', 'mainCanvas');
  // main svg zooming and dragging
  this.zoomer = d3.behavior.zoom()
    .scaleExtent([1, 8])
    .on('zoom', function() {
      /*var translate = d3.event.translate;
      var xmax = window.innerWidth / 2;
      var ymax = window.innerHeight / 2;
      if (translate[0] > xmax)
        translate[0] = xmax;
      if (translate[1] > ymax)
        translate[1] = ymax;
      var trans = translate[0] + "," + translate[1];
      console.log(translate[0] + ', ' + translate[1]);
      d3.select('#mainContainer').attr('transform', 'translate(' + trans + ')scale(' + d3.event.scale + ')');*/
      d3.select('#mainContainer').attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
    });
  this.cursor = {
    type: "circle"
  };
}
// initialize d3 behavior and d3 event listeners for interaction
Simulator.prototype.init = function() {
  // behaviors
  this.svg.call(this.zoomer);
  // event listeners
  this.container.on('click', click);

  this.grid();
  this.canvas.node().parentNode.appendChild(this.canvas.node());

  this.container
    .on("mouseover", function() {
      if (d3.select('#cursor').empty()) {
        if (simulator.mode == "circle") {
          d3.select('#mainCanvas').append('circle').attr('r', 10).attr('id', 'cursor');
        } else {
          d3.select('#mainCanvas').append('rect').attr('width', 20).attr('height', 20).attr('id', 'cursor');
        }
      }
    })
    .on("mousemove", function() {
      var coordinates = [0, 0];
      coordinates = d3.mouse(this);
      var x = parseInt(coordinates[0]);
      var y = parseInt(coordinates[1]);
      var xmax = simulator.width - 10;
      var ymax = simulator.height - 10;

      if (x < 10) x = 10;
      else if (x > xmax) x = xmax;
      if (y < 10) y = 10;
      else if (y > ymax) y = ymax;
      d3.select('#cursor').attr('cx', x).attr('cy', y).attr('x', x - 10).attr('y', y - 10);
    });
};
// draw grid x-axis y-axis
Simulator.prototype.grid = function() {
  this.container.append('g')
    .attr('class', 'x axis')
    .selectAll('line')
    .data(d3.range(0, this.width + 5, this.spacing))
    .enter().append('line')
    .attr('x1', function(d) {
      return d;
    })
    .attr('y1', 0)
    .attr('x2', function(d) {
      return d;
    })
    .attr('y2', this.height);

  this.container.append('g')
    .attr('class', 'y axis')
    .selectAll('line')
    .data(d3.range(0, this.height + 5, this.spacing))
    .enter().append('line')
    .attr('x1', 0)
    .attr('y1', function(d) {
      return d;
    })
    .attr('x2', this.width)
    .attr('y2', function(d) {
      return d;
    });
};
//
Simulator.prototype.setValue = function(value) {
  // console.log('set value: ' + value);
  alert(value);
  this.mode = value;
  if (!d3.select('#cursor').empty())
    d3.select('#cursor').remove();

  if (!d3.select('#cursor').empty()) {
    if (simulator.mode == "circle") {
      d3.select('#mainCanvas').append('circle').attr('r', 10).attr('id', 'cursor');
    } else {
      d3.select('#mainCanvas').append('rect').attr('width', 20).attr('height', 20).attr('id', 'cursor');
    }
  }
};

Simulator.prototype.getValue = function() {
  // console.log('get value');
  return this.mode;
};
