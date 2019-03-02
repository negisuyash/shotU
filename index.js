






console.log("in index.js")


var base64=require('base-64')
var utf8=require('utf8')

var getUserMedia = require('getusermedia')

getUserMedia({ video: true, audio: true }, function (err, stream) {
  if (err) return console.error(err)

  var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })

  peer.on('signal', function (data) {
    document.getElementById('yourid').value = base64.encode(utf8.encode(JSON.stringify(data)))
  })

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(utf8.decode(base64.decode(document.getElementById('otherid').value)))
    peer.signal(otherId)
  })


  document.getElementById('send').addEventListener('click', function () {
    if (document.getElementById('yourMessage').value.trim() != "")
    {
      var yourMessage = document.getElementById('yourMessage').value
      document.getElementById('yourMessage').value=" "
      document.getElementById('messages').textContent+=' YOU : '+ yourMessage +'\n'
      peer.send(yourMessage)
    }
 
  })

  peer.on('data', function (data) {
    document.getElementById('messages').textContent +=' OTHER : '+ data + '\n'
  })

  peer.on('stream', function (stream) {
    var video = document.createElement('video')
    document.body.appendChild(video)

    video.srcObject = stream
    video.play()
  })
})