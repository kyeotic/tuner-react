fs = require('fs');
path = require('path');
express = require('express');

var server = express();

server.set('port', (process.env.PORT || 3000));
server.use(express.static(path.join(__dirname)));

//
// Server-side rendering (Not Yet Implemented)
// -----------------------------------------------------------------------------

var templateFile = path.join(__dirname, 'built/index.html');
var template = fs.readFileSync(templateFile, 'utf8');

server.get('*', function(req, res) {
  res.send(template);
});

server.listen(server.get('port'), function() {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
