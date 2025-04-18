import React, { useState, useEffect, useRef } from 'react';
import { Message02Icon, Search01Icon, MoreHorizontalCircle01Icon, SentIcon } from 'hugeicons-react';
import { Avatar } from 'primereact/avatar';
import PartnerHeader from '../../components/partner/header/PartnerHeader';
import { getAuthUser } from '../../utilities/cookies/AuthCookiesManager';
import { mockConversations } from '../../utilities/constants/dummyMessagesData';

const user = getAuthUser() || {};

const processedConversations = mockConversations.map((conversation) => {
    const lastMessage = conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1] : null;
    const otherMember = conversation.members?.find((member) => member.name !== user?.username)?.name || 'Unknown';

    const unreadCount = conversation.messages.filter(
        (message) => !message.readBy.includes(user?.username) && message.sender !== user?.username
    ).length;

    return {
        id: conversation.id,
        conversationId: conversation.conversationId,
        type: conversation.type,
        name: otherMember,
        lastMessage: lastMessage ? lastMessage.content : '',
        time: lastMessage ? lastMessage.createdAt : '',
        unread: lastMessage ? (lastMessage.readBy.length < 1 ? unreadCount : 0) : 0,
        messages: conversation.messages.map((message) => ({
            ...message,
            time: message.createdAt, 
            isSender: message.sender === user?.username,
        })),
    };
});

const Messages = () => {
    const [conversations, setConversations] = useState(processedConversations);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedConversation?.messages]);

    useEffect(() => {
        document.title = `${user?.username}'s - Messages`;

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setSelectedConversation(null);
                setMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    const handleSelectConversation = (conversation) => {
        const updatedMessages = conversation.messages.map((message) => ({
            ...message,
            readBy: message.readBy.includes(user?.username)
                ? message.readBy
                : [...message.readBy, user?.username],
        }));

        const updatedConversation = {
            ...conversation,
            messages: updatedMessages,
            unread: 0,
        };

        setSelectedConversation(updatedConversation);

        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === conversation.id ? updatedConversation : conv
            )
        );
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return;

        const newMsg = {
            id: selectedConversation.messages.length + 1,
            messageId: `MSG-A${Date.now()}`,
            sender: user?.username,
            content: newMessage,
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            replyFor: {},
            readBy: [],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSender: true,
        };

        const updatedConversation = {
            ...selectedConversation,
            messages: [...selectedConversation.messages, newMsg],
            lastMessage: newMessage,
            time: newMsg.createdAt,
        };

        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === selectedConversation.id ? updatedConversation : conv
            )
        );

        setSelectedConversation(updatedConversation);
        setNewMessage('');
    };

    const handleExportChat = () => {
        console.log('Exporting chat for:', selectedConversation?.name);
        setMenuOpen(false);
    };

    return (
        <div className="h-screen">
            {/* Header */}
            <section className="sticky top-0 z-50">
                <PartnerHeader bottomBorder />
            </section>

            {/* Messages Title */}
            <section className="px-[8vw] pt-[2vw] pb-[1vw] flex justify-between">
                <h1 className="font-bold text-xl">Messages</h1>
            </section>

            {/* No Messages Placeholder */}
            <section
                className={`${
                    conversations?.length > 0 || loadingMessages ? 'hidden' : 'flex'
                } px-[8vw] h-56 items-center justify-center`}
            >
                <article>
                    <section className="flex items-center justify-center pb-3">
                        <Message02Icon
                            size={62}
                            className="text-center bg-blue-100 p-4 rounded-full text-primary"
                        />
                    </section>
                    <p className="font-semibold text-center text-lg">You don't have any messages yet</p>
                    <p className="text-sm text-center text-gray-500">
                        Connect with tenants as soon as they reach out
                    </p>
                </article>
            </section>

            {/* Messages Section */}
            <section
                className={`${
                    conversations.length < 1 || loadingMessages ? 'hidden' : 'block'
                } px-[8vw] border-t h-[calc(100vh-140px)] overflow-hidden`}
            >
                <section className="grid grid-cols-3 h-full">
                    {/* Conversations List */}
                    <section className="col-span-1 pr-8 pb-8 border-r h-full overflow-y-auto">
                        <article className="flex items-center border rounded-lg my-4">
                            <Search01Icon
                                size={38}
                                className="p-2 text-gray-500"
                                onClick={() => console.log("Trigger search event here")}
                            />
                            <input
                                type="search"
                                name=""
                                placeholder="Search message"
                                id=""
                                className="flex-1 px-2 py-2 rounded-r-lg focus:outline-none"
                            />
                        </article>
                        {conversations.map((conversation) => {
                            
                            const unreadCount = conversation.messages.filter(
                                (message) => !message.readBy.includes(user?.username) && message.sender !== user?.username
                            ).length;

                            return (
                                <article
                                    key={conversation.id}
                                    className={`flex items-center gap-2 px-3 rounded-lg cursor-pointer ${
                                        selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleSelectConversation(conversation)}
                                >
                                    <div className="py-2">
                                        <Avatar
                                            size="large"
                                            image={
                                                conversation.members?.find(
                                                    (member) => member.name === conversation.name
                                                )?.gender === 'FEMALE'
                                                    ? '/images/female-avator.avif'
                                                    : conversation.members?.find(
                                                          (member) => member.name === conversation.name
                                                      )?.gender === 'MALE'
                                                    ? '/images/male-avator.avif'
                                                    : '/images/all-avator.avif'
                                            }
                                            shape="circle"
                                            className={`text-primary ${
                                                conversation.unread > 0 ? 'bg-blue-100' : ''
                                            }`}
                                        />
                                    </div>
                                    <section className="flex-1 border-b w-[80%] py-2">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-sm flex-1">
                                                {conversation.name}
                                            </p>
                                            <p className="text-xs text-gray-500">{conversation?.messages[conversation?.messages?.length - 1]?.createdAt}</p>
                                        </div>
                                        <div className="flex justify-between items-center pb-2">
                                            <p className="text-xs text-gray-500 truncate">
                                                {conversation.messages[conversation?.messages?.length - 1]?.content}
                                            </p>
                                            {conversation.unread > 0 && (
                                                <span className="bg-primary text-white text-xs rounded-full px-2 py-1">
                                                    {conversation.unread}
                                                </span>
                                            )}
                                        </div>
                                    </section>
                                </article>
                            )
                        })}
                    </section>

                    {/* Chat Window */}
                    <section className="col-span-2 h-full flex flex-col">
                        {selectedConversation ? (
                            <>
                                {/* Chat Header */}
                                <div className="flex justify-between items-center p-4 border-b">
                                    <div className="flex items-center gap-2">
                                        <Avatar size="large" shape="circle" className="text-primary" />
                                        <p className="font-semibold">{selectedConversation.name}</p>
                                    </div>
                                    <div className="relative">
                                        <MoreHorizontalCircle01Icon
                                            className="cursor-pointer"
                                            onClick={() => setMenuOpen(!menuOpen)}
                                        />
                                        {menuOpen && (
                                            <div
                                                ref={menuRef}
                                                className="absolute top-8 right-0 bg-white shadow-lg rounded border py-1 flex flex-col gap-2 z-50"
                                            >
                                                <span
                                                    className="whitespace-nowrap cursor-pointer hover:bg-gray-200 px-4 py-2 text-sm"
                                                    onClick={handleExportChat}
                                                >
                                                    Export chat
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="flex-1 p-4 h-[90vh] overflow-y-auto">
                                    {selectedConversation.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${ message.sender == user?.username ? 'justify-end' : 'justify-start' } mb-4`}
                                        >
                                            <div
                                                className={`max-w-[70%] p-3 rounded-lg ${ message.sender == user?.username ? 
                                                    'bg-blue-100 text-black' : 'bg-gray-100 text-black' 
                                                }`}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                                <p className="text-xs text-gray-500 mt-1 text-right">
                                                    {message?.createdAt}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Message Input */}
                                <div className="p-4">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="Write a message"
                                            className="flex-1 p-2 border rounded-lg focus:outline-none"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') handleSendMessage();
                                            }}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="py-2 px-3 bg-primary text-white rounded-lg"
                                        >
                                            <SentIcon size={20} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-gray-500">Select a conversation to start chatting</p>
                            </div>
                        )}
                    </section>
                </section>
            </section>
        </div>
    );
};

export default Messages;