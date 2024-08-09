import { Button, Input, Layout, List } from 'antd';
import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

interface Message {
    sender: 'user' | 'receiver';
    content: string;
}

const ChatWindow = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { sender: 'user', content: inputValue.trim() }]);
            setInputValue('');
            // Simulate a response from receiver
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'receiver', content: 'This is a response from the receiver.' },
                ]);
            }, 1000);
        }
    };

    return (
        <Layout className="h-screen bg-gray-100">
            <Header className="bg-blue-600 text-white text-center text-2xl">
                Customer Support Chat
            </Header>
            <Content className="p-4">
                <div className="bg-white shadow-lg rounded-lg overflow-y-auto p-4 h-96">
                    <List
                        dataSource={messages}
                        renderItem={(message) => (
                            <List.Item className="border-b-0">
                                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`${
                                            message.sender === 'user'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-black'
                                        } p-2 rounded-lg max-w-xs`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
            <Footer className="p-4 bg-gray-100">
                <div className="flex">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onPressEnter={handleSend}
                        placeholder="Type your message..."
                        className="flex-grow"
                    />
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSend}
                        className="ml-2"
                    >
                        Send
                    </Button>
                </div>
            </Footer>
        </Layout>
    );
};

export default ChatWindow;
