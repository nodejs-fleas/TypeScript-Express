// 模块的依赖关系
import app from '../app'
import debug from 'debug';
import http from 'http';
import { HttpError } from 'http-errors'

// 从环境中获取端口并在Express中存储
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// 创建HTTP服务器
const server = http.createServer(app);

// 在所有网络接口上监听所提供的端口。 
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// 将端口规范化为数字、字符串或false
function normalizePort<T>(val: T): T | number | false {
  const port = Number(val);

  if (isNaN(port)) {
    // 命名管道
    return val;
  }

  if (port >= 0) {
    // 端口号
    return port;
  }

  return false;
}

// HTTP服务器 “error” 事件的事件监听器
function onError(error: HttpError) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // 用友好的消息处理特定的监听错误
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// HTTP服务器 “listening” 事件的事件监听器
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr!.port;
    debug('typescript-express:server')('Listening on ' + bind);
}