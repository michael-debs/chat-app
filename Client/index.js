const chat = document.querySelector(".chat")
const message = document.querySelector('#message')
const send = document.querySelector('#send')
const username = document.querySelector('#username')

// const ws = new WebSocket("wss://fantastic-achieved-comfort.glitch.me")
const ws = new WebSocket("wss://fantastic-achieved-comfort.glitch.me")

ws.onmessage = data => {
    let message = JSON.parse(data.data)
    appendToChat(message.name, message.message)
    chat.scrollTop = chat.scrollHeight
}

// setTimeout(() => {
//     ws.send("Hello I am Client!!")
// }, 2000);

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