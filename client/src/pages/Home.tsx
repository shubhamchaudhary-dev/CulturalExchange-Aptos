import { Button, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export default function HomePage() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Welcome to Cultural Exchange DAO</Title>
      <Card>
        <Button type="primary" size="large">
          <Link to="/cultural-exchange">View Experiences</Link>
        </Button>
      </Card>
    </div>
  );
}
