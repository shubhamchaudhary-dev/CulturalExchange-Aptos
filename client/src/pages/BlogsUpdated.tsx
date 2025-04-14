import { Card, List, Typography } from 'antd';

const { Title, Text } = Typography;

const blogData = [
  {
    title: 'Cultural Exchange Best Practices',
    content: 'Learn how to create meaningful cultural exchanges'
  },
  {
    title: 'DAO Governance Overview',
    content: 'Understanding our community decision-making process'
  }
];

export default function BlogsPage() {
  return (
    <div style={{ padding: '24px', color: '#000000' }}>
      <Title level={2} style={{ color: '#000000' }}>Community Blogs</Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={blogData}
        renderItem={(item) => (
          <List.Item>
            <Card 
              className="white-box"
              style={{ 
                background: '#ffffff', 
                borderColor: '#dddddd'
              }}
            >
              <Card.Meta
                title={<Text strong style={{ color: '#000000', fontSize: '16px' }}>{item.title}</Text>}
                description={<Text style={{ color: '#000000' }}>{item.content}</Text>}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
