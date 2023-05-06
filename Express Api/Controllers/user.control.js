const User = require("../Models/user.model");
const fs = require("fs");

const getAllVideo = async (req, res) => {
  // res.status(200).send("hello users");
   await res.status(200).json({ msg: "hello users" });
};

const TestVideo = (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const V_Path = "././Videos/Motu_Patlu.mp4";
  const V_Size = fs.statSync(V_Path).size;
  console.log("size :", V_Size);
  const CHUNK_SIZE = 10**6; // 1MB
  const start_num = Number(range.replace(/\D/g, ""));
  const end_num = Math.min(start_num + CHUNK_SIZE , V_Size - 1);
  const content_length = start_num - end_num + 1;
  console.log(start_num , end_num, content_length);
  const headers = {
    "Content-Range": `bytes ${start_num} - ${end_num} / ${V_Size}`,
    "Accept-Ranges": "bytes",
    "Content-Length": content_length,
    "Content-Type": "video/mp4"
  }
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(V_Path, {start_num, end_num});
  videoStream.pipe(res);
};

const UploadVideo = async (req, res) => {
  res.status(200).sendFile(`${__dirname}/././upload.html`);
};
const getAllUser = async (req, res) => {
  console.log(req.query);
  let draw = req.query.draw;
  let columns = req.query.columns; // Ex. [{ data: '_id',  name: '',searchable: 'true',orderable: 'true',search: [Object] },
  let order = req.query.order;   // Ex. [ { column: '0', dir: 'asc' } ],
  let start = req.query.start;
  let length = req.query.length;
  let search = req.query.search.value;  //Ex.  { value: '', regex: 'false' },
  const AllUser = await User.find();
  // console.log(AllUser);
  let FilterData = {
    draw: draw,
    recordsTotal: 200,
    recordsFiltered: 100,
    data: AllUser
  }
  res.status(200).send(FilterData);

};

const AddUser = async (req, res) => {
  const user =  new User(req.body);
  await user.save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const AllUsers = async (req, res) => {
  const AllUser = await User.find();
  
  res.status(200).send(AllUser);

  // res.status(400).send(error);
   
};

module.exports = { getAllVideo, AddUser, AllUsers, TestVideo, UploadVideo , getAllUser};
