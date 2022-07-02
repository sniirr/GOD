import io from 'socket.io-client';
import { Message } from '../redux/reducers/chatReducer';

let socket: any;

export const initiateSocket = (room?: string) => {
  socket = io('http://localhost:3000');
  console.log('Connecting socket...');
  if (socket && room) socket.emit('join', room);
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};

export const joinRoom = (room: string, callbacks: any) => {
  if (!socket) {
    setTimeout(() => joinRoom(room, callbacks), 500)
    return
  }

  socket.emit('join-room', room);

  socket.off('chat-message');
  socket.on('chat-message', (msg: any) => {
    console.log('chat-message received!', { msg });
    return callbacks.onMessage(msg);
  });
  socket.on('question-vote', (userVotes: any) => {
    console.log('question-vote received!', { userVotes });
    return callbacks.onVote(userVotes);
  });
};

export const leaveRoom = (room: string) => {
  socket.emit('leave-room', room);
};

export const sendMessage = (message: Message) => {
  if (socket) socket.emit('chat-message', message);
};

export const vote = (qid: string, sid: string, uid: string, value: number) => {
  if (socket) socket.emit('question-vote', { qid, sid, value, userId: uid });
};
