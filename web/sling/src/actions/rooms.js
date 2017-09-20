import { reset } from 'redux-form';
import api from '../api';

export function fetchRooms() {
  return dispatch => api.fetch('/rooms')
    .then((response) => {
      dispatch({ type: 'FETCH_ROOMS_SUCCESS', response });
    });
}

export function fetchUserRooms(userId) {
  return dispatch => api.fetch(`/users/${userId}/rooms`)
    .then((response) => {
      dispatch({ type: 'FETCH_USER_ROOMS_SUCCESS', response });
    });
}

export function createRoom(data, router) {
  return dispatch => api.post('/rooms', data)
    .then((response) => {
      dispatch({ type: 'CREATE_ROOM_SUCCESS', response });
      router.transitionTo(`/r/${response.data.id}`);
    });
}

export function joinRoom(roomId, router) {
  return dispatch => api.post(`/rooms/${roomId}/join`)
    .then((response) => {
      dispatch({ type: 'ROOM_JOINED', response });
      router.transitionTo(`/r/${response.data.id}`);
    });
}

export function connectToChannel(socket, roomId) {
  return (dispatch) => {
    if (!socket) { return false; }
    const channel = socket.channel(`rooms:${roomId}`);

     channel.on('message_created', (message) => {
      dispatch({ type: 'MESSAGE_CREATED', message });
    });

    channel.join().receive('ok', (response) => {
      dispatch({ type: 'ROOM_CONNECTED_TO_CHANNEL', response, channel });
    });

    return false;
  };
}
