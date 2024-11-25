from flask import Flask, jsonify, request
from flask_cors import CORS
from main import download_from_url
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/testing', methods=['GET'])
def hello():
    try:
        return "Python server is live", 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/url', methods=['POST'])
def greet():
    try:
        url = request.json.get('url')  # Access the URL from JSON
        print(f'\n\nurl------{url}\n\n')
        if not url:
            return jsonify({"error": "URL is required"}), 400

        print(f"{url} from app.py")
        result = download_from_url(url)
        if result is None:
            return jsonify({"error": "Invalid URL format"}), 400

        if "error" in result:
            return jsonify(result), 500
        else:
            return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Ensure app binds to host 0.0.0.0 and the correct port
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port, debug=True)



# Tushar Code previous
# from flask import Flask, jsonify, request
# from main import download_from_url
# from dotenv import load_dotenv
# import os

# load_dotenv()
# app = Flask(__name__)

# @app.route('/testing', methods=['GET'])
# def hello():
#     try:
#         return "Python server is live", 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# @app.route('/api/url', methods=['POST'])
# def greet():
#     try:
#         url = request.json.get('url')  # Access the URL from JSON
#         print(f'\n\nurl------{url}\n\n')
#         if not url:
#             return jsonify({"error": "URL is required"}), 400

#         print(f"{url} from app.py")
#         result = download_from_url(url)
#         if result is None:
#             return jsonify({"error": "Invalid URL format"}), 400

#         if "error" in result:
#             return jsonify(result), 500
#         else:
#             return jsonify(result), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     # Run the server
#     app.run(debug=True)
#     app.run(host="0.0.0.0", port=port)
# modify instagram.py and twitter.py as it must return json object and image / video download should begin in background


#  honcho kundan discarded code

# from flask import Flask, jsonify, request
# from main import download_from_url
# from dotenv import load_dotenv
# import os

# load_dotenv()
# app = Flask(__name__)

# @app.route('/api/url', methods=['POST'])
# def greet():
#     try:
#         print(f'\n HELLO WORLD \n\n')
#         url = request.json.get('url')  # Access the URL from JSON
#         if not url:
#             return jsonify({"error": "URL is required"}), 400

#         print(f"{url} from app.py")
#         result = download_from_url(url)
#         if result is None:
#             return jsonify({"error": "Invalid URL format"}), 400

#         if "error" in result:
#             return jsonify(result), 500
#         else:
#             return jsonify(result), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '_main_':
#     port = int(os.environ.get('PORT', 5000))
#     # Run the server
#     app.run(host="0.0.0.0", port=port)
#     app.run(debug=True)