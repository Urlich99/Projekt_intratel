from flask import Blueprint, render_template, request, jsonify
import json
import base64
import io
from PIL import Image, ImageDraw

views = Blueprint("views", __name__)

@views.route("/")
def home():
    return render_template("index.html")

@views.route("/image", methods=["POST"])
def receive_image():
    response = jsonify({"success": True})
    request_json = request.get_json()
    coordinates = request_json['coordinates']
    image_wh = request_json['canvas_size']
    print(image_wh)
    print(coordinates)
    resizedata = (image_wh["width"], image_wh["height"])
    print(resizedata)
    polygon = []
    for entry in coordinates:
        polygon.append((entry['x'], entry['y']))
    print(polygon)
    b64_im = request_json['image'].split(",")[1]
    im = Image.open(io.BytesIO(base64.b64decode(b64_im)))
    im = im.resize(resizedata)
    im.save('out.png')
    return response