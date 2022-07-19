from flask import Blueprint, render_template, request, jsonify
import json
import base64
import io
from PIL import Image

views = Blueprint("views", __name__)

@views.route("/")
def home():
    return render_template("index.html")

@views.route("/image", methods=["POST"])
def receive_image():
    response = jsonify({"success": True})
    request_json = request.get_json()
    coordinates = request_json['coordinates']
    cropdata = (
    coordinates["left"],
    coordinates["top"],
    (coordinates["left"]) + (coordinates["width"]),
    (coordinates["top"]) + (coordinates["height"])
    )
    print(cropdata)
    b64_im = request_json['image'].split(",")[1]
    im = Image.open(io.BytesIO(base64.b64decode(b64_im)))
    im = im.resize((1280, 720))
    im = im.crop(cropdata)
    im = im.convert('RGB')
    im.save("test_image.jpg")
    return response
