import { Breadcrumb } from 'react-bootstrap';

import Chat from '../components/Chat/Chat';

// ==================================================

const ChatPage = () => {
  return (
    <>
      <div>
        <h3>Chat</h3>

        <Breadcrumb>
          <Breadcrumb.Item href='/dashboard'>Apps</Breadcrumb.Item>
          <Breadcrumb.Item active>Chat</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Chat />
    </>
  );
};

export default ChatPage;
