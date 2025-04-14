import { Button, Form, Input, Typography } from 'antd';

const { Title } = Typography;

export default function LoginPage() {
  return (
    <div 
      className="white-box"
      style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        padding: '24px',
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Title level={3}>Login</Title>
      <Form layout="vertical">
        <Form.Item label="Email" name="email">
          <Input style={{ color: '#000000' }} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
