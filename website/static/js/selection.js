var image = "";

var LabeledRect = fabric.util.createClass(fabric.Rect, {

  type: 'labeledRect',
  initialize: function(options) {
    options || (options = { });

    this.callSuper('initialize', options);
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
    ctx.fillStyle = 'lightgreen';
    ctx.fillText(this.label, -this.width/2 + 5, -this.height/2 + font_size-2);
  }
});

var canvas = new fabric.Canvas('image_canvas', { backgroundImage: image});
canvas.setDimensions({width: '147.5%', height: '133%'}, {cssOnly: true})
  
  var rect, isDown, origX, origY;
  
  function drawRect() {
    canvas.on('mouse:down', onMouseDown);
    canvas.on('mouse:up', onMouseUp);
    canvas.on('mouse:move', onMouseMove);
    changeSelection(false);
  }
  
  function selection() {
    canvas.off('mouse:down', onMouseDown);
    canvas.off('mouse:up', onMouseUp);
    canvas.off('mouse:move', onMouseMove);
    changeSelection(true);
  }
  
  function onMouseDown(o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    var pointer = canvas.getPointer(o.e);
    
    shadow = new fabric.Shadow({
      color: 'rgba(2, 52, 19, 0.4)',
      blur: 2,
    });
    
    rect = new LabeledRect({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      width: pointer.x - origX,
      height: pointer.y - origY,
      angle: 0,
      label: '',
      transparentCorners: true,
      hasBorders: false,
      hasControls: false,
      strokeDashArray: [5, 5],
      stroke:  'lightgreen',
      strokeWidth: 4,
      fill: 'transparent',
      shadow: shadow
    });
  canvas.add(rect);
  
  };
  
  function onMouseMove(o) {
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);
  
    if (origX > pointer.x) {
      rect.set({
        left: Math.abs(pointer.x)
      });
    }
    if (origY > pointer.y) {
      rect.set({
        top: Math.abs(pointer.y)
      });
    }
  
    rect.set({
      width: Math.abs(origX - pointer.x)
    });
    rect.set({
      height: Math.abs(origY - pointer.y)
    });
    canvas.requestRenderAll();
  };
  
  function onMouseUp(o) {
    isDown = false;
    
    rect.label = name_selection();
    rect.dirty = true;
    canvas.requestRenderAll();
    rect.setCoords();
    sendToAPI()
  };

  function name_selection() {
    var sel_name = prompt("Name selection");
    return sel_name;
  }

  function sendToAPI() {
    var coordinates = {
      "left": rect.left,
      "top": rect.top,
      "width": rect.width,
      "height": rect.height
    }

    var data = {
        coordinates: coordinates,
        image: uploaded_image
      }

    fetch("http://127.0.0.1:5000/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        console.log("POST sent, response: ", response)
      })
      .catch(err => {
        console.log("POST failed, err: ", err)
      })
  }
  
  function changeSelection(value) {
    canvas.selection = value;
    canvas.forEachObject(function(obj) {
      obj.selectable = value;
    });
    canvas.requestRenderAll();
  }

  function enable_selection(){
    var checkBox = document.getElementById("selection");
    if (checkBox.checked == true){
        drawRect();
      } else {
        selection();
      }
  }
