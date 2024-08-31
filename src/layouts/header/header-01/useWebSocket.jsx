import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL.replace('/api/v1/', '');
// console.log('process.env.NEXT_PUBLIC_SOCKET_SERVER_URL:', process.env.NEXT_PUBLIC_BASE_URL.replace('/api/v1/', ''));

const useSocketIO = (userId) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const connectSocket = useCallback(() => {
    console.log('Attempting to connect to Socket.IO server...');
    const newSocket = io(SOCKET_SERVER_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Socket.IO connected successfully');
      setIsConnected(true);
      newSocket.emit('authenticate', { userId });
    });

    newSocket.on('authentication_successful', (data) => {
      console.log('Authentication successful:', data);
    });

    newSocket.on('authentication_error', (error) => {
      console.error('Authentication failed:', error);
    });

    newSocket.on('notification', (notification) => {
      console.log('Received notification:', notification);
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket.IO disconnected:', reason);
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
      setIsConnected(false);
    });

    setSocket(newSocket);

    return newSocket;
  }, [userId]);

  useEffect(() => {
    const newSocket = connectSocket();

    return () => {
      console.log('Closing Socket.IO connection...');
      newSocket.disconnect();
    };
  }, [userId, connectSocket]);

  const sendMessage = useCallback((eventName, data) => {
    if (socket) {
      socket.emit(eventName, data);
    }
  }, [socket]);

  return { 
    isConnected, 
    notifications,
    sendMessage
  };
};

export default useSocketIO;