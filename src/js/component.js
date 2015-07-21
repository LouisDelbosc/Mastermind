import React from 'react';
import Peer from 'peerjs';
import { PeerServer } from 'peerjs';

let Component = React.createClass({

  /*
   * peer: the current instance
   * conn: connection to an other peer
   * TODO: make it an array so multiple channels are available
   */
  getInitialState() {
    var _peer = new Peer( {host: 'localhost', port: 9000});
    return {
      peer: _peer,
      conn: ''
    };
  },

  /*
   * @param: conn: connection you want to start listening
   * start listening to the connection so you can receive data
   * TODO: change the console.log to do real stuff
   */
  startListening(conn){
    conn.on('open', function() {
      conn.on('data', function(data) {
        console.log(data);
      });
      conn.send('Hello');
    });
  },

  /*
   * Take the value in the input (id name) and try to connect
   * TODO: manage error
   */
  connectButton() {
    var dest = document.getElementById('name').value;
    var conn = this.state.peer.connect(dest);
    this.setState({ conn: conn });
    this.startListening(conn);
  },

  /*
   * Send the message in the input
   */
  sendMessage() {
    var message = document.getElementById('toSend').value;
    this.state.conn.send(message);
  },

  /*
   * Close the connection in conn
   */
  disconnectButton(){
    this.state.conn.close();
  },

  /*
   * When the component is Mounted:
   * show the id in console
   * add action when you received a connection
   */
  componentDidMount() {
    var peer = this.state.peer;
    peer.on('open', function(id) {
      console.log(id);
    });
    peer.on('connection', function(conn) {
      this.setState({ conn: conn });
      this.startListening(conn);
    }.bind(this));
  },

  render() {
    return (
      <div>
        <input type="text" id="name" placeholder="l'uid de ton poto" />
        <button onClick={this.connectButton} >Connect</button>
        <br/>
        <input type="text" id="toSend" placeholder="ton message" />
        <button onClick={this.sendMessage} >Send</button>
        <button onClick={this.disconnectButton} >disconnection</button>
      </div>
    );
  }
});

module.exports = Component;
