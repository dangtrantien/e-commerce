import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import ContactList from './ContactList';
import Message from './Message';

import styles from './Chat.module.css';

// ==================================================

const Chat = () => {
  const [roomId, setRoomId] = useState('');

  const showMessageHandler = (roomId) => {
    setRoomId(roomId);
  };

  useEffect(() => {
    setRoomId('');
  }, []);

  return (
    <Card className={styles['card-container']}>
      <ContactList roomId={roomId} onShowMessage={showMessageHandler} />

      <Message roomId={roomId} />
    </Card>
  );
};

export default Chat;
