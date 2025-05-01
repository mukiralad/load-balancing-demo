# Simple Round Robin Load Balancer

This directory contains a basic Python-based load balancer using Flask.

## Features

*   Proxies incoming HTTP requests to a pool of backend servers.
*   Uses a simple Round Robin algorithm for server selection.
*   Forwards request methods, headers, data, and cookies.
*   Streams responses from backend servers.

## Setup

1.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
2.  **Configure backend servers:**
    - Edit `load_balancer.py` and update the `BACKEND_SERVERS` list with the actual addresses of your backend application instances.
3.  **Run the load balancer:**
    ```bash
    python load_balancer.py
    ```
    The load balancer will listen on port 5000 by default.

## TODO

*   Implement health checks for backend servers.
*   Dynamically add/remove servers from the pool.
*   Add more sophisticated load balancing algorithms (e.g., Least Connections, Weighted Round Robin).
*   Improve error handling and logging.
*   Use a production-grade WSGI server (e.g., Gunicorn) instead of the Flask development server.
