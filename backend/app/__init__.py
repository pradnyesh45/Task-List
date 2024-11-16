from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from .models import db
from .routes import bp as main_bp

def create_app():
    app = Flask(__name__)
    
    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

    @app.route('/tasks', methods=['OPTIONS'])
    def handle_options():
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

    app.config.from_object('app.config.Config')
    db.init_app(app)
    app.register_blueprint(main_bp)

    return app
