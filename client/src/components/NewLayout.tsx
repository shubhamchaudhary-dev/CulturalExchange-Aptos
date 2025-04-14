import { Layout } from 'antd';
const { Content } = Layout;

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <Content style={{ padding: '24px' }}>
      {children}
    </Content>
  );
}
