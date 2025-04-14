import { message } from 'antd';
import React from 'react';

export const showCustomMessage = (content: string) => {
  message.success({
    content: (
      <div style={{
        color: '#000000',
        background: '#f6ffed',
        padding: '10px 16px',
        borderRadius: '4px',
        boxShadow: 'none',
        border: 'none'
      }}>
        {content}
      </div>
    ),
    duration: 3,
    style: {
      background: 'transparent',
      boxShadow: 'none',
      padding: 0,
      margin: 0
    }
  });
};
