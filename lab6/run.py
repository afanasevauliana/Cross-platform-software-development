from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
server = ThreadingHTTPServer(("127.0.0.1", 8000), SimpleHTTPRequestHandler)
print("Сайты доступны по адресу http://127.0.0.1:8000")
server.serve_forever()
