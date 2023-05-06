const express = require("express");
const server = express();
const cors = require("cors");
const db = require("./Connections/DB/DB_Connect");
const dotenv = require("dotenv");
dotenv.config();
const env = process.env;
const PORT = env.PORT;
const App_Router = require("./Routers/router");
const fs = require("fs");
const Fupload = require("express-fileupload")

server.use(cors());
server.use(express.json());
server.use(Fupload());

server.get("/", (req, res) => {
  console.log(__dirname)
  res.status(200).sendFile(`${__dirname}/index.html`);
});

server.get("/upload", (req, res) => {
  console.log(__dirname)
  res.status(200).sendFile(`${__dirname}/upload.html`);
});

server.post("/upload", (req, res) => {
  if(req.files){
    console.log(req.files)
    const file = req.files.videofile;
    const Fname = file.name;
    file.mv(`./Videos/${Fname}`,(error)=>{
      if(error){
        res.send(error);
      }
      else{
        res.send("file Uploaded")
      }
    })
  }
});


// server.get("/video", (req, res) => {
//   const range = req.headers.range;
//   console.log(range);
//   if (!range) {
//     res.status(400).send("Requires Range header");
//   }
//   const V_Path = "./Videos/Motu_Patlu.mp4";
//   const V_Size = fs.statSync(V_Path).size;
//   const CHUNK_SIZE = 10**6; // 1MB
//   const start_num = Number(range.replace(/\D/g, ""));
//   console.log(start_num)
//   const end_num = Math.min(start_num + CHUNK_SIZE , V_Size - 1);
//   console.log(end_num)
//   const content_length = start_num - end_num + 1;
//   const headers = {
//     "Content-Range": `bytes ${start_num}-${end_num}/${V_Size}`,
//     "Accept-Ranges": "bytes",
//     "Content-Length": content_length,
//     "Content-Type": "video/mp4"
//   }
//   res.writeHead(206, headers);
//   const videoStream = fs.createReadStream(V_Path, {start_num, end_num});
//   videoStream.pipe(res);
//   // console.log(res)
// });

// set middleware and router setup
server.use("/Api/V_1", App_Router);

let app = server.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    let host = app.address().address;

    // console.log("Example app listening at http://%s:%s", host, port)
    // console.log(`Your Api listening at http://${host}${port}`)
    console.log(`Your Api listening at http://localhost:${PORT}`);
  }
});
