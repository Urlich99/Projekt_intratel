LabeledPolygon = fabric.util.createClass(fabric.Polygon, {

    type: 'labeledPoly',
    initialize: function(polygonPoints, options) {
      options || (options = { });
  
      this.callSuper('initialize', polygonPoints, options);
      this.set('label', options.label || '');
    },
  
    toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
        label: this.get('label')
      });
    },
  
    _render: function(ctx) {
      this.callSuper('_render', ctx);
      var font_size = Math.ceil((this.height + this.width) / 20);
      ctx.font = '500 ' + font_size.toString() + 'px Share Tech Mono';
      ctx.fillStyle = 'rgb(0, 255, 213)';
      ctx.textAlign = 'center';
      ctx.fillText(this.label, 0, 0);
      console.log(JSON.stringify(ctx.font));
    }
  });


prototypefabric.polygon = {
    drawPolygon : function() {
        polygonMode = true;
        pointArray = new Array();
        lineArray = new Array();
        activeLine;
    },
    addPoint : function(options) {
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var id = new Date().getTime() + random;
        var circle = new fabric.Circle({
            radius: 5,
            fill: '#ffffff',
            stroke: '#333333',
            strokeWidth: 0.5,
            left: (options.e.layerX/canvas.getZoom()),
            top: (options.e.layerY/canvas.getZoom()),
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX:'center',
            originY:'center',
            id:id
        });
        if(pointArray.length == 0){
            circle.set({
                fill:'rgb(0, 255, 213)'
            })
        }
        var points = [(options.e.layerX/canvas.getZoom()),(options.e.layerY/canvas.getZoom()),(options.e.layerX/canvas.getZoom()),(options.e.layerY/canvas.getZoom())];
        line = new fabric.Line(points, {
            strokeWidth: 2,
            fill: 'transparent',
            strokeDashArray: [5, 5],
            stroke:  'rgb(0, 255, 213)',
            strokeWidth: 4,
            class:'line',
            originX:'center',
            originY:'center',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false
        });
        if(activeShape){
            var pos = canvas.getPointer(options.e);
            var points = activeShape.get("points");
            points.push({
                x: pos.x,
                y: pos.y
            });
            var polygon = new fabric.Polygon(points,{
                strokeDashArray: [5, 5],
                stroke:  'rgb(0, 255, 213)',
                strokeWidth: 4,
                fill: 'transparent',
                opacity: 0.1,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false
            });
            canvas.remove(activeShape);
            canvas.add(polygon);
            activeShape = polygon;
            canvas.renderAll();
        }
        else{
            var polyPoint = [{x:(options.e.layerX/canvas.getZoom()),y:(options.e.layerY/canvas.getZoom())}];
            var polygon = new fabric.Polygon(polyPoint,{
                strokeDashArray: [5, 5],
                stroke:  'rgb(0, 255, 213)',
                strokeWidth: 4,
                fill: 'transparent',
                opacity: 0.1,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false
            });
            activeShape = polygon;
            canvas.add(polygon);
        }
        activeLine = line;

        pointArray.push(circle);
        lineArray.push(line);

        canvas.add(line);
        canvas.add(circle);
        canvas.selection = false;
    },
    generatePolygon : function(pointArray){
        var points = new Array();
        $.each(pointArray,function(index,point){
            points.push({
                x:point.left,
                y:point.top
            });
            canvas.remove(point);
        });
        $.each(lineArray,function(index,line){
            canvas.remove(line);
        });
        canvas.remove(activeShape).remove(activeLine);
        var polygon = new LabeledPolygon(points,{
            strokeDashArray: [5, 5],
            stroke:  'rgb(0, 255, 213)',
            strokeWidth: 4,
            fill: 'transparent',
            hasBorders: false,
            hasControls: false
        });
        canvas.add(polygon);
        polygon.label = name_selection();
        polygon.dirty = true;
        canvas.requestRenderAll();
        console.log(JSON.stringify(polygon))
        document.getElementById("create-polygon").checked = false;
        activeLine = null;
        activeShape = null;
        polygonMode = false;
        canvas.selection = true;
    }
};
function name_selection() {
    var sel_name = prompt("Name selection");
    return sel_name;
  }
