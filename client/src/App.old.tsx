import './optimizedDarkTheme.css';
import { BrowserRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import RouterConfig from './FinalRouterConfig';
const { Header, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh', background: '#000000' }}>
        <Header style={{ background: '#000000' }}>
          <Menu 
            theme="dark" 
            mode="horizontal" 
            defaultSelectedKeys={['home']}
            style={{ background: '#000000' }}
          >
            <Menu.Item key="home">
              <Link to="/" style={{ color: '#ffffff' }}>Home</Link>
            </Menu.Item>
            <Menu.Item key="blogs">
              <Link to="/blogs" style={{ color: '#ffffff' }}>Blogs</Link>
            </Menu.Item>
            <Menu.Item key="exchange">
              <Link to="/cultural-exchange" style={{ color: '#ffffff' }}>Cultural Exchange</Link>
            </Menu.Item>
            <Menu.Item key="login" style={{ marginLeft: 'auto' }}>
              <Link to="/login" style={{ color: '#ffffff' }}>Sign In</Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link to="/signup" style={{ color: '#ffffff' }}>Sign Up</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '24px', color: '#ffffff' }}>
          <RouterConfig />
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
