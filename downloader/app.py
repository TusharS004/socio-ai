# modify instagram.py and twitter.py as it must return json object and image / video download should begin in background

from flask import Flask, jsonify, request
from main import download_from_url

app = Flask(__name__)

@app.route('/api/url', methods=['POST'])
def greet():
    try:
        url = request.json.get('url')  # Access the URL from JSON
        if not url:
            return jsonify({"error": "URL is required"}), 400

        print(f"{url} from app.py")
        result = download_from_url(url)
        if result is None:
            return jsonify({"error": "Invalid URL format"}), 400

        return jsonify({"message": "Success", "data": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
    app.run(port=5000)  # Run on port 5000