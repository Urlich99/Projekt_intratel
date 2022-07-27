var min = 99;
var max = 999999;
var polygonMode = true;
var pointArray = new Array();
var lineArray = new Array();
var activeLine;
var activeShape = false;
var canvas
$(window).load(function(){
    document.getElementById("create-polygon").checked = true;
    prototypefabric.initCanvas();
    $('#create-polygon').click(function() {
        prototypefabric.polygon.drawPolygon(); 
    });
});
var prototypefabric = new function () {
    this.initCanvas = function () {
        var image = "";
        canvas = new fabric.Canvas('image_canvas', { backgroundImage: image});
        //canvas.selection = false;

        canvas.on('mouse:down', function (options) {
            if(options.target && options.target.id == pointArray[0].id){
                prototypefabric.polygon.generatePolygon(pointArray);
                // sendToAPI(polygon);
            }
            if(polygonMode){
                prototypefabric.polygon.addPoint(options);
            }
        });
        canvas.on('mouse:up', function (options) {

        });
        canvas.on('mouse:move', function (options) {
            if(activeLine && activeLine.class == "line"){
                var pointer = canvas.getPointer(options.e);
                activeLine.set({ x2: pointer.x, y2: pointer.y });

                var points = activeShape.get("points");
                points[pointArray.length] = {
                    x:pointer.x,
                    y:pointer.y
                }
                activeShape.set({
                    points: points
                });
                canvas.renderAll();
            }
            canvas.renderAll();
        });
    };
    
};

function sendToAPI(points) {
    console.log("sendToAPI byla wywolana ", pointArray)
    var coordinates = points;

    var data = {
        coordinates: coordinates,
        image: uploaded_image,
        canvas_size: { width: canvas.width, height: canvas.height }
      }

    fetch("http://localhost:5000/image", {
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