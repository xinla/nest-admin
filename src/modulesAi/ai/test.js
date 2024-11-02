const http = require('http')

http
  .createServer((req, res) => {
    if (req.headers.accept && req.headers.accept === 'text/event-stream') {
      // 发送带有时间戳的事件数据
      const data = new Date().toISOString()
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      })
      setInterval(() => {
        res.write(`data: ${data}\n\n`)
      }, 1000)
    } else {
      res.writeHead(200)
      res.end()
    }
  })
  .listen(4000, () => {
    console.log('Server is running on port 3000')
  })
