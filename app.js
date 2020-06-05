const path = require('path')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use((request, response, next) => {
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {
  request.chance = Math.random()
  next()
})

// app.get('/', (request, response) => {
//   response.json({
//     chance: request.chance
//   })
// })

app.get('/', (request, response) => {
  response.header('1222ETag', '12345')
  response.header('Access-Control-Allow-Credentials', true)
  response.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type")
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Content-Security-Policy',  "child-src 'self' *;")
  response.header('Content-Type', 'text/html')
    // res.sendFile('index.html');
  response.sendFile(path.join(__dirname+'/index.html'));

  //Accept-Ranges: bytes

})


app.listen(3000)