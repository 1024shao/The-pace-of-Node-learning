import { createServer } from 'http';
import { static } from './module/routes';
createServer(function (request, response) {
  static(request, response, 'static')
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');