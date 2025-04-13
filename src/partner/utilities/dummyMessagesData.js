import { getAuthUser } from "../../client/utils/cookies/AuthCookiesManager";
const user = getAuthUser() || {};

export const mockConversations = [
    {
        id: 1,
        conversationId: 'MC-CVN-A001A',
        type: 'PRIVATE',  //This can be PRIVATE or GROUP
        members: [
            { userId: '', name: 'Mary', image: '', gender: 'FEMALE' },
            { userId: '', name: 'Chris', image: '', gender: 'MALE'}
        ],
        messages: [
            {
                id: 1,
                messageId: 'MC-MSG-A009A',
                sender: 'Mary',
                content: "Hello, I'm interested in renting Uniport Garden Apartments. Is it still available? If so, could you share details about the monthly rent and any additional fees?",
                createdAt: '2:35 PM',
                replyFor: {},
                readBy: ['Chris']
            },
            {
                id: 2,
                messageId: 'MSG-A010A',
                sender: user?.username,
                content: "Hi, thank you for your interest! Yes, the property is still available. The monthly rent is UGX 500,200, with a UGX 300,000 deposit required.",
                createdAt: '2:40 PM',
                replyFor: 'MSQ-A009A',
                readBy: [],
            },
        ],
    },
];
