const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// --- API routes ---
app.get('/api/health', (req,res)=>res.json({status:'ok'}));

// 로그인 데모
app.post('/api/login',(req,res)=>{
  const {username,password} = req.body;
  if(username==='test' && password==='1234'){
    res.json({success:true, userId:1});
  } else {
    res.status(401).json({success:false});
  }
});

// 통계 데모
app.get('/api/stats',(req,res)=>{
  res.json({data:{
    ongoingAssignments:3,
    joinedStudies:2,
    joinedClubs:1,
    weeklyCompletionRate:'80%'
  }});
});

// Todo CRUD
app.get('/api/todos',(req,res)=>{
  db.all("SELECT * FROM todos",[],(err,rows)=>{
    if(err) return res.status(500).json({error:err.message});
    res.json({items:rows});
  });
});

app.post('/api/todos',(req,res)=>{
  const {text,due_date=null}=req.body;
  db.run("INSERT INTO todos (text,due_date,completed) VALUES (?,?,0)",[text,due_date],function(err){
    if(err) return res.status(500).json({error:err.message});
    res.json({id:this.lastID});
  });
});

app.put('/api/todos/:id',(req,res)=>{
  const {text,completed,due_date} = req.body;
  db.run("UPDATE todos SET text=COALESCE(?,text), completed=COALESCE(?,completed), due_date=COALESCE(?,due_date) WHERE id=?",
  [text,completed,due_date,req.params.id],function(err){
    if(err) return res.status(500).json({error:err.message});
    res.json({changed:this.changes});
  });
});

app.delete('/api/todos/:id',(req,res)=>{
  db.run("DELETE FROM todos WHERE id=?",[req.params.id],function(err){
    if(err) return res.status(500).json({error:err.message});
    res.json({deleted:this.changes});
  });
});

// 스터디 그룹 / 클럽 데모
app.get('/api/study-groups',(req,res)=>{
  res.json([{id:1,name:'알고리즘 스터디'},{id:2,name:'영어 회화'}]);
});
app.get('/api/clubs',(req,res)=>{
  res.json([{id:1,name:'축구부'},{id:2,name:'음악동아리'}]);
});

// --- 정적 파일 제공 ---
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 추가된 개별 페이지 라우트
app.get('/lectures', (req, res) => {
  res.sendFile(path.join(__dirname, 'lectures.html'));
});
app.get('/mentoring', (req, res) => {
  res.sendFile(path.join(__dirname, 'mentoring.html'));
});
app.get('/clubs', (req, res) => {
  res.sendFile(path.join(__dirname, 'clubs.html'));
});
app.get('/todo', (req, res) => {
  res.sendFile(path.join(__dirname, 'todo.html'));
});

// --- Socket.IO ---
io.on('connection',(socket)=>{
  socket.on('chat:send',(data)=>{
    io.emit('chat:message',data);
  });
});

server.listen(PORT,()=>console.log("Server running on "+PORT));
