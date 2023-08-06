import { logDOM } from '@testing-library/react';

export const chatsReducer = (state = {}, action) => {
  if (action.type === 'ADD_CHATS') {

    const newState = { ...state };
    action.chats.forEach(chat => {
      newState[chat._id] = chat;
    });

    return newState;
  }

  if (action.type === 'ADD_CHAT') {

    return { ...state, [action.chat._id]: action.chat };
  }

  if (action.type === 'ADD_MESSAGES') {
    const { chatId, messages } = action;
    const chat = state[chatId];
    if (chat) {
      const chatMessages = chat.messages || [];
      const updatedChat = { ...chat, messages: [...chatMessages, ...messages] };
      return { ...state, [chatId]: updatedChat };
    }
    return state;
  }

  if (action.type === 'ADD_MESSAGE') {
    const { chatId, message } = action;
    const chat = state[chatId];

    const chatMessages = chat.messages || [];

    const chatMessageId = [];

    for (const chatMessage of chatMessages) {
      chatMessageId.push(chatMessage._id);
    }
    if(!chatMessageId.includes(message._id)) {
      const updatedMessages = [...chatMessages, message];
      const updatedChat = { ...chat, messages: updatedMessages };
      return { ...state, [chatId]: updatedChat };
    }



  }

  if (action.type === 'DELETE_CHAT') {
    const { chatId, idOwnerAccount } = action;
    const updatedState = { ...state };
    const chat = updatedState[chatId];

    if (chat) {
      chat.members = chat.members.filter(member => member !== idOwnerAccount);
      delete updatedState[chatId];
    }

    return updatedState;
  }

  if (action.type === 'EXIT') {
    return {};
  }
  return state;
};

export const addChats = (chats) => ({ type: 'ADD_CHATS', chats });
export const addChat = (chat) => ({ type: 'ADD_CHAT', chat });
export const addMessages = (messages, chatId) => ({ type: 'ADD_MESSAGES', messages, chatId });
export const addMessage = (message, chatId) => ({ type: 'ADD_MESSAGE', message, chatId });
export const deleteChatReducer = ({ chatId, idOwnerAccount }) => ({ type: 'DELETE_CHAT', chatId, idOwnerAccount });
export const exitChatReducer = () => ({ type: 'EXIT', });

