import { gql } from './gql';

export const getUserById = (id) => {
  const UserFindOne = `query ($query: String,) {
  UserFindOne(query: $query) {
    _id
    login
    nick
    avatar{url}
    chats{ 
    title
      _id
      lastModified
        lastMessage {
        _id
        createdAt
        text
        media{
          url
        }
      }
      members{
        _id
        login
        nick
        avatar{url}
      }
      
    }
    
  }
}`;
  return gql(UserFindOne, { "query": `[{ "_id": "${id}" }]` });
};
export const getUserByLogin = (login) => {

  const UserFindOne = `query ($query: String){
  UserFindOne(query: $query) {
    _id
    login
   }
}`;
  return gql(UserFindOne, { "query": `[{ "login": "${login}" }]` });
};
export const registrationUser = (login, password, nick) => {
  const UserUpsert = `mutation ($login:String, $password: String, $nick: String){
  UserUpsert(user: {login:$login, password: $password, nick: $nick}){
    _id
    login
    nick
      }
}`;
  return gql(UserUpsert, { "login": login, "password": password, "nick": nick });
};
export const loginUser = (login, password) => {
  const Login = `query ($login: String, $password: String) {
  login(login: $login, password: $password) 
}`;
  return gql(Login, { "login": login, "password": password });
};
export const createChat = (members, title) => {
  const ChatUpsert = `mutation($chat: ChatInput){
    ChatUpsert(chat:$chat)  {
    title
      _id
      avatar{
        url
      }
      owner{
        login
        nick
      }
      members{_id
        login
        nick
        avatar
        {
          url
        }}
    }
  }`;
  return gql(ChatUpsert, {
    "chat": {
      "title": title, "members": members
    }
  });

};
export const createMessageAndImg = (props) => {
  const { arrImgId, value, chatId } = props;
  const q = `mutation($message: MessageInput){
  MessageUpsert(message: $message){
   _id
    text
    createdAt
    chat{
      _id
    }

    media{
      type
      url
    }

    owner{
      _id
    login
    }
  }
}
`;
  return gql(q, {
    "message": {
      "chat": { "_id": chatId }, "media": arrImgId, "text": value
    }
  })

    ;
};
export const getMessagesByChatId = (chatId, skip, limit) => {
  const MessageFind = `query ($query: String) {
  MessageFind(query: $query) {
    _id
    createdAt
    owner{
      _id
      login
      nick
      avatar{url}
    }
    text
    media{url}
  }
}`;
  return gql(MessageFind, { "query": `[{ "chat._id": "${chatId}" }, {  "skip": [${skip}],  "limit": [${limit}]}]` });
};
export const getCountMessagesByChatId = (chatId) => {
  const MessageCount = `query count ($query: String){
  MessageCount(query:$query)
}`;
  return gql(MessageCount, { "query": `[{ "chat._id": "${chatId}" }]` });
};
export const chatDelete = (chatId, membersId,) => {
  const q = `mutation deleteChat ($chat: ChatInput){
  ChatUpsert(chat:$chat){
    _id
  }
}`;
  return gql(q, {
    "chat": {
      "_id": chatId, "members": membersId
    }
  });
};
