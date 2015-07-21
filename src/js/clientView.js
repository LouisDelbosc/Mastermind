import React from 'react';
import Peer from 'peerjs';
import { PeerServer } from 'peerjs';
import Client from './client';

var ClientView = React.createClass({

  getInitialState() {
    var peer = new Peer( {host: 'localhost', port: 9000} );
    var chan = new Client(peer);
    return {
      peer: peer,
      chan: chan
    };
  },

  connection() {
    var dest = document.getElementById('name').value;
    this.state.chan.addPeer(dest);
  },

  sendMessage() {
    var message = document.getElementById('toSend').value;
    this.state.chan.sendMessage(message);
  },

  disconnect(){
    this.state.chan.disconnect();
  },

  componentDidMount(){
    this.state.chan.init();
  },

  render() {
    return (
      <div>
        <input type="text" id="name" placeholder="your wanted connection" />
        <button onClick={this.connection} >Send</button>
        <br />
        <input type="text" id="toSend" placeholder="your message" />
        <button onClick={this.sendMessage} >Send</button>
        <button onClick={this.disconnect} >deco</button>
      </div>
    );
  }
});

module.exports = ClientView;