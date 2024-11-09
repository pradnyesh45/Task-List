from flask import Flask
from .models import db  # Import db from models
from .routes import bp as main_bp  # Import the blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')  # Load configuration

    db.init_app(app)  # Initialize db with the app

    app.register_blueprint(main_bp)  # Register the blueprint

    with app.app_context():
        db.create_all()  # Create database tables

    return app
