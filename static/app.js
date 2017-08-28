const express = require('express')
var path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})