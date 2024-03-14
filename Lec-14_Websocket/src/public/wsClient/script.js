const socket = io();

const input = document.getElementById('msg');
const btn = document.getElementById('send');
const div = document.querySelector('.messages');

const ul = document.getElementById('list');

btn.addEventListener('click', ()=>{
    const value = input.value;
    if(value) {

        const div = document.createElement('div');
        div.setAttribute("class", "sender");

       const li = document.createElement("li");
       li.innerText = value;

       const para = document.createElement('p');
       para.innerText = "sender";

       div.appendChild(para);
       div.appendChild(li);

       ul.appendChild(div);

       socket.emit("message", value);
       input.value = "";
    }
});

socket.on("broadcast", (message)=>{
        const div = document.createElement('div');
        div.setAttribute("class", "reciever");

       const li = document.createElement("li");
       li.innerText = message;

       const para = document.createElement('p');
       para.innerText = "reciever";

       div.appendChild(para);
       div.appendChild(li);

       ul.appendChild(div);
});


const grpBtn = document.getElementById('createGrp');

grpBtn.addEventListener('click', ()=>{
    console.log("group created request");
    socket.emit("create_grp", Math.floor(Math.random(0,1)*1000));
});

const joinBtn = document.getElementById('joinGrp');

joinBtn.addEventListener('click', ()=>{
    console.log("group join req");
    socket.emit("join_room");
})

const stgBtn = document.getElementById('stg');

stgBtn.addEventListener('click', ()=>{
  let value = input.value;

  if(value.length) {
    socket.emit("grp_message", value);
  }
});

socket.on('serv_grp_message', (data)=>{
     const div = document.createElement('div');
        div.setAttribute("class", "reciever");

       const li = document.createElement("li");
       li.innerText = data;

       const para = document.createElement('p');
       para.innerText = "reciever";

       div.appendChild(para);
       div.appendChild(li);

       ul.appendChild(div);
      console.log("Group message->", data);
});


socket.on("message", (data)=>{
    console.log('recieving message ->', data)
});