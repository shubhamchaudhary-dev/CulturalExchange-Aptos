import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Button,
  Spin,
  List,
  Input,
  Card,
  Typography,
  Space,
  Divider,
  Tabs
} from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TabPane } = Tabs;

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
export const aptos = new Aptos(aptosConfig);
export const moduleAddress = "0xb1ed820472bba0a70dbbf0ba32fa32b253f5eff6698f06ce68a05ee279043a6";

type LearningExperience = {
  address: any;
  completed: boolean;
  content: string;
  experience_id: string;
};

type CulturalArticle = {
  title: string;
  culture: string;
  excerpt: string;
  link: string;
};

function formatAddress(address: any): string {
  if (!address) return 'No address available';
  const addrStr = address.toString ? address.toString() : String(address);
  return `${addrStr.slice(0, 6)}...${addrStr.slice(-5)}`;
}

function App() {
  const [experiences, setExperiences] = useState<LearningExperience[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const { account, signAndSubmitTransaction } = useWallet();
  const [accountHasList, setAccountHasList] = useState<boolean>(false);
  const [transactionInProgress, setTransactionInProgress] = useState<boolean>(false);

  const [articles, setArticles] = useState<CulturalArticle[]>([
    {
      title: "The Art of Japanese Ikebana",
      culture: "Japan",
      excerpt: "Ikebana, the Japanese art of flower arrangement, goes beyond simple floral decoration...",
      link: "https://en.wikipedia.org/wiki/Ikebana"
    },
    {
      title: "Day of the Dead: A Celebration of Life",
      culture: "Mexico",
      excerpt: "Día de los Muertos is a colorful Mexican holiday that honors loved ones who've passed away...",
      link: "https://en.wikipedia.org/wiki/Day_of_the_Dead"
    }
  ]);

  const onWriteTask = (event: React.ChangeEvent<HTMLInputElement>) => setNewTask(event.target.value);

  const fetchList = async () => {
    if (!account) return;
    try {
      const resource = await aptos.getAccountResource({
        accountAddress: account.address,
        resourceType: `${moduleAddress}::todolist::TodoList`
      });
      setAccountHasList(true);
      const tableHandle = (resource as any).data.tasks.handle;
      const taskCounter = (resource as any).data.task_counter;
      const experiences: LearningExperience[] = [];
      for (let i = 1; i <= taskCounter; i++) {
        const experience = await aptos.getTableItem<LearningExperience>({
          handle: tableHandle,
          data: {
            key_type: "u64",
            value_type: `${moduleAddress}::todolist::Task`,
            key: `${i}`
          }
        });
        experiences.push(experience);
      }
      setExperiences(experiences);
    } catch {
      setAccountHasList(false);
    }
  };

  const addNewList = async () => {
    if (!account) return;
    setTransactionInProgress(true);
    try {
      await aptos.getAccountResource({
        accountAddress: account.address,
        resourceType: `${moduleAddress}::todolist::TodoList`
      });
      setAccountHasList(true);
    } catch (error: any) {
      if (error?.error_code === "account_resource_not_found") {
        const transaction: InputTransactionData = {
          data: {
            function: `${moduleAddress}::todolist::creating_a_list`,
            functionArguments: []
          }
        };
        try {
          const response = await signAndSubmitTransaction(transaction);
          await aptos.waitForTransaction({ transactionHash: response.hash });
          setAccountHasList(true);
        } catch (e) {
          setAccountHasList(false);
        }
      }
    } finally {
      setTransactionInProgress(false);
    }
  };

  const onExperienceShared = async () => {
    if (!account) return;
    setTransactionInProgress(true);
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::todolist::creating_a_task`,
        functionArguments: [newTask]
      }
    };

    const latestId = experiences.length > 0 ? parseInt(experiences[experiences.length - 1].experience_id) + 1 : 1;
    const newExperienceToPush = {
      address: account.address,
      completed: false,
      content: newTask,
      experience_id: latestId.toString()
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      setExperiences([...experiences, newExperienceToPush]);
      setNewTask("");
    } catch (error) {
      console.log("error", error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [account?.address]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: "0 24px", position: "sticky", top: 0, zIndex: 1 }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Space size="large">
              <Title level={3} style={{ margin: 0, color: "#1890ff" }}>Cultural Exchange DAO</Title>
              <Text type="secondary">Learn • Share • Earn</Text>
            </Space>
          </Col>
          <Col><WalletSelector /></Col>
        </Row>
      </Header>
      <Content style={{ padding: "24px 50px" }}>
        <Spin spinning={transactionInProgress} size="large">
          {!accountHasList ? (
            <Row justify="center" style={{ margin: '40px 0' }}>
              <Col span={12}>
                <Card style={{ textAlign: 'center', borderRadius: '12px' }}>
                  <Title level={4}>Join Our Global Learning Community</Title>
                  <Text type="secondary">Share your culture and earn rewards</Text>
                  <Button onClick={addNewList} type="primary" size="large" style={{ marginTop: '20px' }}>
                    Get Started
                  </Button>
                </Card>
              </Col>
            </Row>
          ) : (
            <Tabs defaultActiveKey="1" type="line">
              <TabPane tab="Experiences" key="1">
                <Row justify="center">
                  <Col span={12}>
                    <Card>
                      <Input.Group compact>
                        <Input
                          value={newTask}
                          onChange={onWriteTask}
                          placeholder="Share cultural knowledge (e.g., Japanese tea ceremony)"
                          style={{ width: "calc(100% - 100px)" }}
                        />
                        <Button onClick={onExperienceShared} type="primary">Share</Button>
                      </Input.Group>
                    </Card>
                    <Divider orientation="left"><Text strong>Cultural Experiences</Text></Divider>
                    <List
                      grid={{ gutter: 16, column: 1 }}
                      dataSource={experiences}
                      renderItem={(experience: LearningExperience) => (
                        <List.Item>
                          <Card hoverable actions={[experience.completed && <Text type="success">✓ Verified by Community</Text>]}> 
                            <Card.Meta
                              title={<Text strong>{experience.content}</Text>}
                              description={
                                <Space direction="vertical">
                                  <Text type="secondary">
                                    Shared by: <a href={`https://explorer.aptoslabs.com/account/${experience.address}/`} target="_blank" rel="noopener noreferrer">{formatAddress(experience.address)}</a>
                                  </Text>
                                </Space>
                              }
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Cultural Insights" key="2">
                <Row gutter={[16, 24]}>
                  {articles.map((article, index) => (
                    <Col span={12} key={index}>
                      <Card
                        title={<Text strong>{article.title}</Text>}
                        extra={<Text type="secondary">{article.culture}</Text>}
                        hoverable
                      >
                        <Text>{article.excerpt}</Text>
                        <br />
                        <a href={article.link} target="_blank" rel="noopener noreferrer">Read more →</a>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </TabPane>
            </Tabs>
          )}
        </Spin>
      </Content>
    </Layout>
  );
}

export default App;