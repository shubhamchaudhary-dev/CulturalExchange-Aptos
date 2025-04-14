import { AptosClient } from 'aptos';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Button, Card, List, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Text } = Typography;

const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const client = new AptosClient(NODE_URL);

interface LearningExperience {
  experience_id: string;
  address: string;
  content: string;
  completed: boolean;
}

export default function CulturalExchangePage() {
  const { account } = useWallet();
  const [experiences, setExperiences] = useState<LearningExperience[]>([]);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const moduleAddress = "0xb1ed820472bba0a70dbbf0ba32fa32b253f5eff6698f06ce68a05ee279043a6";

  const fetchList = async () => {
    if (!account?.address) return;
    try {
      const todoListResource = await client.getAccountResource(
        account.address.toString(),
        `${moduleAddress}::todolist::TodoList`
      );
      // ... rest of implementation
    } catch (e: any) {
      console.log("Error:", e);
    }
  };

  useEffect(() => {
    fetchList();
  }, [account?.address]);

  return (
    <div style={{ padding: '24px' }}>
      <WalletSelector />
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={experiences}
        renderItem={(experience) => (
          <List.Item>
            <Card
              hoverable
              style={{ borderRadius: '8px' }}
              actions={[
                experience.completed && (
                  <Space>
                    <Text type="success" strong>
                      ✓ Verified
                    </Text>
                  </Space>
                )
              ]}
            >
              <Card.Meta
                title={<Text strong>{experience.content}</Text>}
                description={`Created by: ${experience.address.slice(0, 6)}...${experience.address.slice(-4)}`}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
