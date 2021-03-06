var http = require('http');
var query = require('querystring');
var fs = require('fs');

var server = http.createServer(function (req, res) {
   if (req.method.toLowerCase() == 'post') {
      const contentType = req.headers['content-type'];
      console.log('content type : ', contentType);

      // contentType : application/x-www-form-urlencoded 비교
      if ( contentType.search('urlencoded') >= 0 ) {
         handlePostReqeust(req, res);
      }
      else {
         res.end('Not URLEncoded');
      }
   }
   // get이면 폼 목록 출력
   else {
      fs.createReadStream('form.html').pipe(res);
   }
});

function handlePostReqeust(req, res) {
   var buffer = '';

   req.on('data', function (chunk) {
      console.log('data event : ' + chunk.length);
      buffer += chunk;
   });
   req.on('end', function () {
      console.log('end : ' + buffer);

      // 바디 파싱
      var parsed = query.parse(buffer);
      // JSON 형태로 출력      
      res.end(JSON.stringify(parsed));
   });
}

server.listen(3000);
console.log('Server is running on 3000');