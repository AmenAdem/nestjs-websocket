const app = new Vue({
 el: '#app',
 data: {
  title: 'Simple Websockets Chat',
  name: '',
  text: '',
  messages: [],
  socket: null
 },
 methods: {
  sendMessage() {
   if(this.validateInput()) {
    const message = {
    name: this.name,
    text: this.text
   }
   this.socket.emit('msgToServer', message)
   this.text = ''
  }
 },
 receivedMessage(message) {
    console.log(message)
  this.messages.push(message)
 },
 validateInput() {
  return this.name.length > 0 && this.text.length > 0
 }
},
 created() {
  this.socket = io('https://aggressive-bell-bottoms-newt.cyclic.app/')
  this.socket.on('msgToClient', (message) => {
   this.receivedMessage(message)
  })
 }
})