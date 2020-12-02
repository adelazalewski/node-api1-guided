const http = require("http");

const server = http.createServer((req, res) => {
    //200 success
res.statusCode= 200;
//tell the client we're sending back some html
res.setHeader("Content-Type", "text/html")
res.write("<h1>Hello World</h1>");
res.write(`<h2>The current time is ${new Date()}</h2>`)
//close the response and send the res back to the client
res.end();
});

//start the server so it can start listening for requests
//web servers need to constantly be lsitening for incoming requests
server.listen(8080, () => {
    console.log("server started at http://localhost:8080")
})