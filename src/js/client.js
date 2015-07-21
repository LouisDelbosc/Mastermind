import Peer from 'peerjs';
import { PeerServer } from 'peerjs';

/*
 * try using ES6 syntax
 * @attribut: personnal id && list of everyother id
 * @function to do: 
 * - create (@constructor)
 * - handle connect
 * - handle disconnect
 * - send messages
 */
class Client {
  constructor(myPeer, peerArray = []) {
    this.myPeer = myPeer;
    this.listOfPeer = peerArray;
  }

  /*
   * make it able to listen and display the peer id
   */
  init() {
    this.myPeer.on('open', function(id){
      var div = document.getElementById('idclient');
      var titre = document.createElement('h3');
      var text = document.createTextNode(id);
      titre.appendChild(text);
      div.appendChild(titre);
    });   
    this.myPeer.on('connection', function(conn) {
      this.listOfPeer.push(conn);
      this.startListening(conn)
    }.bind(this));
  }

  /*
   * Add peer in listOfPeer and start listening to it
   */
  addPeer(peerId) {
    var conn = this.myPeer.connect(peerId);
    this.startListening(conn);
    this.listOfPeer.push(conn);
  }

  /*
   * Disconnect from the channel
   */
  disconnect() {
    for( index in this.listOfPeer ) {
      this.listOfPeer[index].close();
    }
  }

  /*
   * Send message in Broadcast
   */
  sendMessage(message) {
    for( var index in this.listOfPeer ){
      this.listOfPeer[index].send(message); 
      this.displayMessage(message);
    }
  }

  /*
   * Listen to a connection to display the messages
   */
  startListening(conn) {
    conn.on('open', function() {
      conn.on('data', function(data) {
        this.displayMessage(data);
      }.bind(this));
      conn.send('Hello');
    }.bind(this));
  }

  /*
   * Display the message you send and you get
   * TODO: display in the view
   */
  displayMessage(message){
    console.log(message); 
  }
}

module.exports = Client;
