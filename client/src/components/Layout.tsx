import { Layout, Menu, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 1
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space size="large">
            <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
              <Link to="/">Cultural Exchange DAO</Link>
            </Title>
            <Menu mode="horizontal" style={{ border: 'none' }}>
              <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="blogs"><Link to="/blogs">Blogs</Link></Menu.Item>
              <Menu.Item key="login"><Link to="/login">Login</Link></Menu.Item>
              <Menu.Item key="signup"><Link to="/signup">Sign Up</Link></Menu.Item>
            </Menu>
          </Space>
          <div>
            <WalletSelector />
          </div>
        </div>
      </Header>
      
      <Content style={{ padding: '24px 50px' }}>
        {children}
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Cultural Exchange DAO ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
