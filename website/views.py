from flask import Blueprint, render_template, request, jsonify
import json
import numpy
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
    print(coordinates)
    polygon = []
    for entry in coordinates:
        polygon.append((entry['x'], entry['y']))
    print(polygon)
    b64_im = request_json['image'].split(",")[1]
    im = Image.open(io.BytesIO(base64.b64decode(b64_im)))
    im.save('out.png')
    return response