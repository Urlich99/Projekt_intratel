from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlite3 import OperationalError
from os import path

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Haslo123'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)

    from .views import views
    app.register_blueprint(views, url_prefix='/')

    from .models import Territory
    try:
        create_database(app)
    except OperationalError:
        print("There was an issue creating the database")
    
    return app

def create_database(app):
    if not path.exists("website/" + DB_NAME):
        db.create_all(app=app)
        print("Created database!")