import { BrowserRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import NewRouterConfig from './NewRouterConfig';
const { Header, Content } = Layout;

function FinalApp() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="blogs">
              <Link to="/blogs">Blogs</Link>
            </Menu.Item>
            <Menu.Item key="exchange">
              <Link to="/cultural-exchange">Cultural Exchange</Link>
            </Menu.Item>
            <Menu.Item key="login" style={{ marginLeft: 'auto' }}>
              <Link to="/login">Sign In</Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link to="/signup">Sign Up</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '24px' }}>
          <NewRouterConfig />
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default FinalApp;
