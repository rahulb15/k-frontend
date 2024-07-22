/* eslint-disable */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import claudeService from "src/services/claude.service";
import { motion } from "framer-motion";
const ChatBotArea = () => {
    const [chatbotOpen, setChatbotOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState("");

    const chatbotHandler = () => {
        setChatbotOpen(!chatbotOpen);
    };

    const sendChatbotMessage = async (message) => {
        const response = await claudeService.chat({
            message,
        });
        console.log(response, "response");
        // {
        //     data: {
        //       status: 'created',
        //       message: 'Created',
        //       description:
        //         'The request has succeeded and a new resource has been created as a result.',
        //       data: {
        //         id: 'msg_01LkNx1zZiSvNdukYH2SkV44',
        //         type: 'message',
        //         role: 'assistant',
        //         model: 'claude-3-opus-20240229',
        //         stop_sequence: null,
        //         usage: { input_tokens: 463, output_tokens: 46 },
        //         content: [
        //           {
        //             type: 'text',
        //             text:
        //               'Hello! Welcome to our NFT marketplace platform. I\'m Claude, your AI assistant. I\'m here to help you navigate the platform and answer any questions you may have.\n' +
        //               '\n' +
        //               'How can I assist you today?'
        //           }
        //         ],
        //         stop_reason: 'end_turn'
        //       }

        if (response?.data?.status === "created") {
            setChats([...chats, response.data.data.content[0].text]);
            setMessage("");
        }
    };

    const initChatbot = async () => {
        const response = await claudeService.clauderequest({
            message: "Hello",
        });
        console.log(response, "response");
        if (response?.data?.status === "created") {
            setChats([...chats, response.data.data.content[0].text]);
        }
    };

    useEffect(() => {
        if (chatbotOpen) {
            initChatbot();
        } else {
            setChats([]);
        }
    }, [chatbotOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        sendChatbotMessage(message);
    };

    return (
        <>
            <div className="chatbot__icon">
                {/* <button onClick={chatbotHandler}>
                    <Image
                        src="/chatbot/chat-bot.png"
                        alt="Chatbot"
                        width={80}
                        height={80}
                    />
                </button> */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={chatbotHandler}
                >
                    <Image
                        src="/chatbot/bot.png"
                        alt="Chatbot"
                        width={80}
                        height={80}
                    />
                </motion.button>
                


            </div>
            {chatbotOpen && (
                <div className="chatbot__overlay">
                    <div className="chatbot__wrapper">
                        <div className="chatbot__header">
                            <h3>Chatbot</h3>
                            <button
                                onClick={chatbotHandler}
                                className="chatbot__close"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="chatbot__body">
                            {/* <div className="chatbot__body--message">
                                <p>
                                    Hello! I am a chatbot. How can I help you
                                    today?
                                </p>
                            </div> */}
                            {chats.map((chat, index) => (
                                <div
                                    key={index}
                                    className="chatbot__body--message"
                                >
                                    <p>{chat}</p>
                                </div>
                            ))}

                            <div className="chatbot__body--input">
                                <input
                                    type="text"
                                    placeholder="Type your message here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBotArea;
