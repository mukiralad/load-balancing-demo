import itertools
import requests
from flask import Flask, request, Response

app = Flask(__name__)

# --- Configuration ---
# TODO: Replace with actual backend server addresses
# These could be dynamically discovered or read from config
BACKEND_SERVERS = [
    "http://localhost:8081",
    "http://localhost:8082",
    # Add more backend server addresses here
]

# Cycle through servers in a round-robin fashion
server_pool = itertools.cycle(BACKEND_SERVERS)

# --- Load Balancing Logic ---
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'])
def proxy(path):
    """Forwards the incoming request to the next available backend server."""
    selected_server = None
    try:
        # Select the next server from the pool
        selected_server = next(server_pool)
    except StopIteration:
        return "No backend servers available", 503 # Service Unavailable

    target_url = f"{selected_server}/{path}"

    # Forward the request
    try:
        resp = requests.request(
            method=request.method,
            url=target_url,
            headers={key: value for (key, value) in request.headers if key != 'Host'},
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False,
            stream=True # Stream response for potentially large content
        )

        # Create a Flask response from the backend response
        # Stream the content to avoid loading large responses into memory
        response = Response(resp.iter_content(chunk_size=8192),
                            status=resp.status_code,
                            headers=resp.headers.items())
        return response

    except requests.exceptions.RequestException as e:
        # Handle connection errors, timeouts, etc.
        print(f"Error connecting to backend server {selected_server}: {e}")
        # TODO: Implement health checks and remove unhealthy servers from the pool
        return f"Backend server error: {selected_server}", 502 # Bad Gateway

if __name__ == '__main__':
    # Run the load balancer on port 5000
    # In a production environment, use a proper WSGI server like Gunicorn
    app.run(host='0.0.0.0', port=5000, debug=True)
