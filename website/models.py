from . import db

class Territory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255))
    date_uploaded = db.Column(db.DateTime(timezone=True))