const chat = document.querySelector(".chat")
const message = document.querySelector('#message')
const send = document.querySelector('#send')
const username = document.querySelector('#username')

const ws = new WebSocket("wss://brindle-berry-freeze.glitch.me")

ws.onmessage = data => {
    let message = JSON.parse(data.data)
    appendToChat(message.name, message.message)
    chat.scrollTop = chat.scrollHeight
}

send.addEventListener('click', e => {
    window.localStorage.setItem("username", username.value)
    ws.send(JSON.stringify({message: message.value, name: username.value}))
    appendToChat(username.value, message.value)
    message.value = ''
})


function appendToChat(username, data) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = `
    <div class="message">
        <div class="">
            <p class="name">
                <span>${username}</span>: 
            </p>
            <p class="content">
                ${data}
            </p>
        </div>
    </div>
    `;
    chat.appendChild(tempDiv);

}

username.value = window.localStorage.getItem('username')