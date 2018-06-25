const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

const roomName = document.getElementById('roomName');

state = {
    _id: 0,
    messages: ""
};

roomName.addEventListener('change', (e) => {
    e.preventDefault();
    state._id = e.target.value;
});
   

const ws = new WebSocket('ws://192.168.100.5:8000');

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    const li = document.createElement('li');

    li.innerHTML = value;
    messages.appendChild(li);
}

form.addEventListener('submit', event => {
    event.preventDefault();


    if (!state._id){
        alert("Выберите Пользователя Базы")
        return;
    }

    state.messages = input.value;

    console.log("Change: ", JSON.stringify(state));
   

    ws.send(JSON.stringify(state));
    input.value = '';
    
})

ws.onopen = () => setStatus('ONLINE');

ws.onclose = () => setStatus('DISCONNECTED');

ws.onmessage = response => printMessage(response.data);