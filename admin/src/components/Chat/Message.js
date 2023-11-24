import { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

import styles from './Message.module.css';
import { FaPaperPlane } from 'react-icons/fa';

// ==================================================

const socket = io(host, {
  withCredentials: true,
  transports: ['websocket'],
});

const Message = (props) => {
  const sendRequest = useHttp();

  const messageRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [enteredInput, setEnteredInput] = useState('');

  // Tự động kéo message list đến message mới nhất
  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    sendRequest({
      url: `${host}/message/${props.roomId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: enteredInput }),
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setEnteredInput('');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.roomId !== '') {
      sendRequest({
        url: `${host}/message/${props.roomId}`,
      })
        .then((result) => {
          if (result.error) {
            return alert(result.message);
          }

          setMessages(result.messages);
        })
        .catch((err) => console.log(err));
    }

    socket.on('chat', (data) => {
      if (data.action === 'update-session') {
        setMessages(data.result);
        scrollToBottom();
      } else if (data.action === 'delete-session') {
        setMessages([]);
      }
    });

    scrollToBottom();
  }, [sendRequest, props.roomId]);

  return (
    <div className={styles['message-container']}>
      <div className={styles['message-list--container']}>
        <ul>
          {messages.map((message) => (
            <li
              key={message._id}
              className={
                message.user.role === 'client'
                  ? `${styles['message-item']} ${styles['client-message']}`
                  : styles['message-item']
              }
            >
              {message.user.role === 'client' && (
                <img
                  className={styles.avatar}
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADrElEQVR4nO2Y3WsTWRiHZxUVL0VhwUuxEbzwgyxrFXcm502lLZMpMwnZZUWR9j/YpV4Iih94oV5VjTSiFFFpoLustD0nKctiW2kV3F2xLqjrB7Zq/baxamvBpK+cqYnp2DbJTDoTJT/40eHMnDnPM2cGQgWhlFJKKeWrSXl5+UJCyM8A8DsA3CCEvAUATNXr9XqEYo3H4wkQQgYygY0lhHQKxRgA2DcTuEHif0LIQQD4ViiGEEJ25Apv6GtCiN9ReAD4HgDemxTgu5EAgE2OCRBCzpuFz5AYcLvd82yH93q9a3OFrA1W4KmdlXjvjKz/neKaoO0ChJA9uUD3n5URY8qkRvZWGa9vckKgc6YnbYQ21rATfzshcD/bk87WyKed6LddAABG+eL5QhsLEx/yiBMCWCgBAMCSQD7B5jJ5+5b17wq1Azu2bRjFiKtasCsYcT1INq/Ao/WVk2Aaa8swXFs2LexU50PbK3E8sgKx2XXfVgGMuD4D5HDhuukFpj0fcdkuUK1LMHnc6iuEUTnJ4bHZVWWbQFok6rtpWSCmXLcd/JOAcsL6Dihh5wRiNRWWBZgCjgnoElHfeQsCXY7C6wJUXoYx5bmJV+cldijLhWII0hoRY8pQXvAx+QehmIJ/ymV4bkN2+HPrsWievDEYFhBPLUH8bRViG0Fk1RPlx3yMnwsL9v9wy0sghwrFGvwSBYhK3ZJKQ6JG71y71DuI/e2I/+yZeN9PL50oP+Zj/e147WLvoKjR26LKjoiB6FrHwD01dJ2o0h5JY5hq3a/dPZiRp42N+KShIXMI637pnjRH0tgFKcC+sw28qiq6QNLYcUmj4wYQlFQ2Gn819iIF/9/q1XpTEq+G3w3xa6aYl5RUdmxlsGX+rMJLvrYlksq6PwPI6KFQXxeHfdbUlBbgMjwHjvZ1zTRX0lgvKK2z8z9Tr/rHYlGjN7MAIASiA4lkMpGIx9MC/DiRTCb5uWzzJY1d3yjTRQXGx29ElXXksLjejs6Hl0euXk0LjPT16WO5zhdVRguKL/np1lwX5w3U/XV5qLU1LRBva9PH8rmH6GebCwIfDLbMlVR2N5/F+Uf5776GeErgyv4jw/qHmt89bgm7d88pxNOvyGvhj931U2gwJbDzx9CgmXuIfkqsC6jssJnFQWsfvrLGjbygtb82cw9Jow3WBTR20dziDE/66t+c8NW/NTtfVGmPZQFRZY/NAvgDLY94zQuwx9YFNDpmFsBqRY2OWRYoRZjdfAA67siGQ8wzQwAAAABJRU5ErkJggg=='
                  alt='user avatar'
                />
              )}

              <p ref={messageRef}>
                {message.user.role === 'client'
                  ? `Client: ${message.message}`
                  : `You: ${message.message}`}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <form className={styles['form-container']} onSubmit={submitHandler}>
        <input
          type='text'
          value={enteredInput}
          onChange={(e) => setEnteredInput(e.target.value)}
          placeholder='Type and enter'
        />

        <button type='submit'>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Message;
