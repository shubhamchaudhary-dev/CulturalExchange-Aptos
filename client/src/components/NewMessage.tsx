import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface MessageProps {
  content: string;
  duration?: number;
}

const Message: React.FC<MessageProps> = ({ content, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1010,
      color: '#ffffff',
      background: '#1677FF',
      padding: '12px 20px',
      borderRadius: '4px',
      boxShadow: 'none',
      border: 'none',
      fontSize: '20x',
      fontWeight: 500
    }}>
      {content}
    </div>
  );
};

export const showNewMessage = (content: string, duration: number = 3000) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const remove = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  };

  ReactDOM.render(
    <Message content={content} duration={duration} />,
    container
  );

  return remove;
};