/**
 * 
 */
function click() {
  if (d3.event.defaultPrevented) return;
  d3.event.stopPropagation();
  
  var point = d3.mouse(this);

  d3.select('#mainCanvas').append('g').append('circle')
    .attr('cx', function(d) {
      return point[0];
    })
    .attr('cy', function(d) {
      return point[1];
    })
    .attr('r', '10')
    .attr('class', 'dot')
    .style('fill', randomColor)
    .style('cursor', 'pointer')
    .on('mousemove', function() {
    	if(!d3.select('#cursor').empty())
    		d3.select('#cursor').remove();
    })
    .on('click', select);
  console.log('create dot at ' + point[0] + ', ' + point[1]);
}

function select() {
  if (d3.event.defaultPrevented) return; // click suppressed
  d3.event.stopPropagation();

  if (d3.event.shiftKey) {
    d3.select(this.parentNode).remove();
    return;
  }

  var selected = d3.select(this);
  var group = d3.select(this.parentNode);
  var isSelected = group.classed('selected');

  if (isSelected == true) {
    console.log('selected cancle');
    group.select('rect').remove();
    return;
  }

  group.classed('selected', !isSelected)
    .append('rect')
    .classed('selection', true)
    .style('cursor', 'move')
    .attr('width', function(d) {
      return 2 * selected.attr('r');
    })
    .attr('height', function(d) {
      return 2 * selected.attr('r');
    })
    .attr('x', function(d) {
      return selected.attr('cx') - selected.attr('r');
    })
    .attr('y', function(d) {
      return selected.attr('cy') - selected.attr('r');
    })
    .on('mousemove', function() {
    	if(!d3.select('#cursor').empty())
    		d3.select('#cursor').remove();
    })
    .on('click', cancle)
    .call(dragGroup);

  var cx = parseInt(selected.attr('cx'));
  var cy = parseInt(selected.attr('cy'));
  var r = parseInt(selected.attr('r'));
  // add resizer
  var resizer = group.append('g').classed('resizer', true);

  var pedding = 2;
  var xl = cx - r - pedding;
  var xr = cx + r;
  var xm = (xl + xr) / 2;
  var yt = cy - r - pedding;
  var yb = cy + r;
  var ym = (yt + yb) / 2;

  addResizer(resizer, 'resizer-tl', xl, yt); // top left
  addResizer(resizer, 'resizer-tm', xm, yt); // top middle
  addResizer(resizer, 'resizer-tr', xr, yt); // top right
  addResizer(resizer, 'resizer-ml', xl, ym); // middle left
  addResizer(resizer, 'resizer-mr', xr, ym); // middle right
  addResizer(resizer, 'resizer-bl', xl, yb); // bottom left
  addResizer(resizer, 'resizer-bm', xm, yb); // bottom middle
  addResizer(resizer, 'resizer-br', xr, yb); // bottom right

  this.parentNode.parentNode.appendChild(this.parentNode);
}

function addResizer(node, type, x, y) {
  node.append('rect')
    .classed(type, true)
    .attr('width', function(d) {
      return 2;
    })
    .attr('height', function(d) {
      return 2;
    })
    .attr('x', function(d) {
      return x;
    })
    .attr('y', function(d) {
      return y;
    })
    .on('mousemove', function() {
    	if(!d3.select('#cursor').empty())
    		d3.select('#cursor').remove();
    })
    .call(resizeGroup);
}

function moveResizer(node, type, x, y) {
  node.select(type)
    .attr('x', function(d) {
      return x;
    })
    .attr('y', function(d) {
      return y;
    });
}

function cancle() {
  if (d3.event.defaultPrevented) return; // click suppressed
  d3.event.stopPropagation();

  var isSelected = d3.select(this.parentNode).classed('selected');

  if (isSelected == true) {
    if (d3.event.shiftKey) {
      d3.select(this.parentNode).remove();
    } else {
      d3.select(this.parentNode).classed('selected', false);
      d3.select(this.parentNode).select('.resizer').remove();
      d3.select(this).remove();
      console.log('selected cancle');
    }
  }
}

var resizeGroup = d3.behavior.drag()
  .on('dragstart', function() {
    d3.event.sourceEvent.stopPropagation();
    if (d3.event.defaultPrevented) return;
    console.log('resize start');
  })
  .on('drag', function() {
    if (d3.event.defaultPrevented) return;
    d3.event.sourceEvent.stopPropagation();
    // this.parentNode.parentNode.appendChild(this.parentNode);

    var circle = d3.select(this.parentNode.parentNode).select('circle');
    var r = parseInt(circle.attr('r'));
    var change = 0;

    if (d3.event.dx > d3.event.dy)
      change = parseInt(d3.event.dx);
    else
      change = parseInt(d3.event.dy);

    d3.select(this.parentNode.parentNode).select('circle').attr('r', function(d) {
      r = r + change;

      if (r < 10)
        r = 10;
      else if (r > 100)
        r = 100;

      return r;
    });

    var resizer = d3.select(this.parentNode);
    var cx = parseInt(circle.attr('cx'));
    var cy = parseInt(circle.attr('cy'));
    var pedding = 2;
    // move resizer
    var xl = cx - r - pedding;
    var xr = cx + r;
    var xm = (xl + xr) / 2;
    var yt = cy - r - pedding;
    var yb = cy + r;
    var ym = (yt + yb) / 2;

    moveResizer(resizer, '.resizer-tl', xl, yt); // top left
    moveResizer(resizer, '.resizer-tm', xm, yt); // top middle
    moveResizer(resizer, '.resizer-tr', xr, yt); // top right
    moveResizer(resizer, '.resizer-ml', xl, ym); // middle left
    moveResizer(resizer, '.resizer-mr', xr, ym); // middle right
    moveResizer(resizer, '.resizer-bl', xl, yb); // bottom left
    moveResizer(resizer, '.resizer-bm', xm, yb); // bottom middle
    moveResizer(resizer, '.resizer-br', xr, yb); // bottom right

    var selection = d3.select(this.parentNode.parentNode).select('.selection');
    selection.attr('width', function(d) {
      return 2 * r;
    }).attr('height', function(d) {
      return 2 * r;
    }).attr('x', function(d) {
      return cx - r;
    }).attr('y', function(d) {
      return cy - r;
    });
    
    console.log('resizing: ' + r);
  })
  .on('dragend', function() {
    console.log('resize end');
    d3.event.sourceEvent.stopPropagation();
    if (d3.event.defaultPrevented) return;
  });

var dragGroup = d3.behavior.drag()
  .origin(function() {
    var current = d3.select(this);
    return {
      x: current.attr('x'),
      y: current.attr('y')
    };
  })
  .on('dragstart', function() {
    d3.event.sourceEvent.stopPropagation();
    if (d3.event.defaultPrevented) return;
    d3.select(this.parentNode).select('.resizer').remove();
    console.log('start');
  })
  .on('drag', function() {
    var obj = d3.select(this);
    var parent = d3.select(this.parentNode);
    var circle = parent.select('circle');
    var x = parseInt(d3.event.x);
    var y = parseInt(d3.event.y);
    var xmax = simulator.width - obj.attr('width');
    var ymax = simulator.height - obj.attr('height');

    if(x < 0) x = 0;
    else if(x > xmax) x = xmax;
    if(y < 0) y = 0;
    else if(y > ymax) y = ymax;
    
    obj.attr('x', x).attr('y', y);
    circle.attr('cx', function(d) {
        return x + parseInt(circle.attr('r'));
      })
      .attr('cy', function(d) {
        return y + parseInt(circle.attr('r'));
      });
    this.parentNode.parentNode.appendChild(this.parentNode);

    d3.event.sourceEvent.stopPropagation();
    if (d3.event.defaultPrevented) return;
  })
  .on('dragend', function() {
    // add resizer
    var group = d3.select(this.parentNode);
    var resizer = group.append('g').classed('resizer', true);
    var cx = parseInt(d3.select(this.parentNode).select('circle').attr('cx'));
    var cy = parseInt(d3.select(this.parentNode).select('circle').attr('cy'));
    var r = parseInt(d3.select(this.parentNode).select('circle').attr('r'));
    var pedding = 2;
    var xl = cx - r - pedding;
    var xr = cx + r;
    var xm = (xl + xr) / 2;
    var yt = cy - r - pedding;
    var yb = cy + r;
    var ym = (yt + yb) / 2;

    addResizer(resizer, 'resizer-tl', xl, yt); // top left
    addResizer(resizer, 'resizer-tm', xm, yt); // top middle
    addResizer(resizer, 'resizer-tr', xr, yt); // top right
    addResizer(resizer, 'resizer-ml', xl, ym); // middle left
    addResizer(resizer, 'resizer-mr', xr, ym); // middle right
    addResizer(resizer, 'resizer-bl', xl, yb); // bottom left
    addResizer(resizer, 'resizer-bm', xm, yb); // bottom middle
    addResizer(resizer, 'resizer-br', xr, yb); // bottom right

    d3.event.sourceEvent.stopPropagation();
    if (d3.event.defaultPrevented) return;
  });

var randomColor = (function() {
  var golden_ratio_conjugate = 0.618033988749895;
  var h = Math.random();

  var hslToRgb = function(h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return '#' + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16);
  };

  return function() {
    h += golden_ratio_conjugate;
    h %= 1;
    return hslToRgb(h, 0.5, 0.60);
  };
})();
