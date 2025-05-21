# WebRTC Local Signaling Server

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> A minimal Node.js WebSocket server for WebRTC signaling (offer/answer/ICE).  
> Designed to pair with the Android WebRTC Video Call App.


## About

This is a simple signaling server that uses WebSockets (via the `ws` library) to relay WebRTC SDP offers, answers, and ICE candidates between two peers in the same “room.” It handles room creation, broadcasting of messages, and cleans up when peers leave.

## Features

- 🔌 WebSocket-based signaling  
- 💬 Room management for pairing exactly two peers  
- 🔄 Broadcasts `offer`, `answer`, and `candidate` messages  
- 🗑️ Cleans up rooms when peers disconnect

## Getting Started

### Prerequisites

- **Node.js** v14 or higher  
- **npm** (bundled with Node.js)

### Installation

```bash
  git clone https://github.com/miraljaviya/WebRTCLocalServer.git
  cd WebRTCLocalServer
  npm install
```

### Running
```bash
node index.js
```

### Success
You will see a log in your terminal indicating the server has started, for example: 
**Signaling server running on ws://0.0.0.0:8080**


## Related Repositories
Android Client: Android WebRTC Video Call App
https://github.com/miraljaviya/LocalVideoCallWebRTC
A Kotlin-based Android application demonstrating peer-to-peer video calling with WebRTC.


