const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });
const rooms = {};

wss.on('connection', ws => {
  ws.id = uuidv4();
  console.log(`[${ws.id}] Client connected`);

  ws.on('message', msg => {
    let data;
    try { data = JSON.parse(msg); } catch (e) { console.warn(`[${ws.id}] Invalid JSON: ${msg}`); return; }
    const { type, room, payload } = data;
    console.log(`[${ws.id}] Received '${type}'` + (room ? ` for room '${room}'` : ''));

    switch (type) {
      case 'join':
        rooms[room] = rooms[room] || [];
        rooms[room].push(ws);
        ws.room = room;
        console.log(`[${ws.id}] Joined room '${room}'. Members: ${rooms[room].length}`);
        break;

      case 'offer':
      case 'answer':
      case 'candidate':
        console.log(`[${ws.id}] Broadcasting '${type}' to room '${room}'`);
        (rooms[room] || []).forEach(client => {
          if (client !== ws) {
            client.send(JSON.stringify({ type, payload }));
            console.log(`[${ws.id}] Sent '${type}' to [${client.id}]`);
          }
        });
        break;

      case 'leave':
        console.log(`[${ws.id}] Leaving room '${ws.room}'`);
        leaveRoom(ws);
        break;

      default:
        console.warn(`[${ws.id}] Unknown message type '${type}'`);
    }
  });

  ws.on('close', () => {
    console.log(`[${ws.id}] Connection closed`);
    leaveRoom(ws);
  });
});

function leaveRoom(ws) {
  const room = ws.room;
  if (!room || !rooms[room]) return;
  rooms[room] = rooms[room].filter(c => c !== ws);
  console.log(`[${ws.id}] Removed from room '${room}'. Remaining: ${rooms[room].length}`);
  rooms[room].forEach(client => client.send(JSON.stringify({ type: 'leave' })));
  if (rooms[room].length === 0) {
    delete rooms[room];
    console.log(`Room '${room}' deleted as it is empty`);
  }
}

console.log('Signaling server running on ws://0.0.0.0:8080');