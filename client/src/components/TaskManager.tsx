import { useEffect, useState } from 'react';
import { Button, Input, List, Card, Spin } from 'antd';
import { showCustomMessage } from './CustomMessage';
import { showNewMessage } from './NewMessage';
import { PlusOutlined } from '@ant-design/icons';
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network, AccountAddress } from '@aptos-labs/ts-sdk';

interface Task {
  address: AccountAddress;
  completed: boolean;
  content: string;
  task_id: string;
}

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(aptosConfig);

const MODULE_ADDRESS = '0xb1ed820472bba0a70dbbf0ba32fa32b253f5eff6698f06ce68a05ee279043a6';

const TaskManager = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountHasList, setAccountHasList] = useState(false);

  const fetchTasks = async () => {
    if (!account) return;

    try {
      const todoListResource = await aptos.getAccountResource({
        accountAddress: account.address,
        resourceType: `${MODULE_ADDRESS}::todolist::TodoList`,
      });

      const tableHandle = (todoListResource as any).data.tasks.handle;
      const taskCounter = (todoListResource as any).data.task_counter;

      const tasks: Task[] = [];
      for (let i = 1; i <= taskCounter; i++) {
        const tableItem = {
          key_type: "u64",
          value_type: `${MODULE_ADDRESS}::todolist::Task`,
          key: `${i}`,
        };
        const task = await aptos.getTableItem<Task>({ handle: tableHandle, data: tableItem });
        tasks.push(task);
      }

      setTasks(tasks);
      setAccountHasList(true);
    } catch (err: any) {
      setAccountHasList(false);
      console.warn("No task list found. Prompting to create one.");
    }
  };

  const createTaskList = async () => {
    if (!account) return;
  
    try {
      await aptos.getAccountResource({
        accountAddress: account.address,
        resourceType: `${MODULE_ADDRESS}::todolist::TodoList`,
      });
      setAccountHasList(true);
    } catch (e) {
      setLoading(true);
      try {
        const tx: InputTransactionData = {
          data: {
            function: `${MODULE_ADDRESS}::todolist::creating_a_list`,
            functionArguments: [],
          },
        };
        const response = await signAndSubmitTransaction(tx);
        await aptos.waitForTransaction({ transactionHash: response.hash });
        showNewMessage("Task list created!");
        setAccountHasList(true);
      } catch (error: any) {
        console.error("Failed to create list:", error);
        showNewMessage("Failed to create task list"); 
      } finally {
        setLoading(false);
      }
    }
  };

  const addTask = async () => {
    if (!newTask.trim() || !account) return;

    setLoading(true);
    try {
      const tx: InputTransactionData = {
        data: {
          function: `${MODULE_ADDRESS}::todolist::creating_a_task`,
          functionArguments: [newTask],
        },
      };

      const latestId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].task_id) + 1 : 1;
      const newTaskToPush: Task = {
        address: account.address,
        completed: false,
        content: newTask,
        task_id: `${latestId}`,
      };

      const response = await signAndSubmitTransaction(tx);
      await aptos.waitForTransaction({ transactionHash: response.hash });

      setTasks([...tasks, newTaskToPush]);
      setNewTask('');
      showNewMessage("Cultural experience shared successfully!");
    } catch (error: any) {
      console.error("Add task error:", error);
      showNewMessage("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [account?.address]);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ 
        color: '#000',
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '24px',
        fontFamily: 'Arial, sans-serif'
      }}>
        Cultural Exchange
      </h1>
      <div style={{
        background: '#fff',
        padding: '24px',
        borderRadius: '8px'
      }}>
      {!accountHasList ? (
        <Button
          type="primary"
          onClick={createTaskList}
          disabled={!account}
          loading={loading}
        >
          Start Cultural Exchange
        </Button>
      ) : (
        <>
          <div style={{ marginBottom: '16px', display: 'flex' }}>
            <Input
              placeholder="Share a cultural tradition or experience"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onPressEnter={addTask}
              disabled={!account}
              style={{ 
                color: '#000000 !important',
                backgroundColor: '#fff',
                borderColor: '#d9d9d9'
              }}
              className="custom-placeholder"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addTask}
              loading={loading}
              style={{ 
                marginLeft: '8px',
                color: '#000'
              }}
            >
              Share
            </Button>
          </div>

          <Spin spinning={loading}>
            <List
              bordered
              dataSource={tasks}
              style={{ color: '#000', fontFamily: 'Arial, sans-serif' }}
              renderItem={(item) => (
                <List.Item style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>
                  <span className="task-text">{item.content}</span>
                  <a
                    href={`https://explorer.aptoslabs.com/account/${item.address.toString()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#000' }}
                  >
                    View Culture Contributor
                  </a>
                </List.Item>
              )}
            />
          </Spin>
        </>
      )}
      </div>
    </div>
  );
};

export default TaskManager;
