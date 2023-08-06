import classNames from 'classnames';
import style from './Messages.module.css';
import { Time } from '../Time/Time';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { URLWithoutGQL } from '../../constants';

export const Messages = ({ messages, userId, fetchData, messagesCount }) => {
  return (<InfiniteScroll
    dataLength={messages.length}
    next={fetchData}
    hasMore={messages.length !== messagesCount}
    loader={''}
    style={{ backgroundColor: '#081421',  }}


  >
    {messages.map((message) => (<div
      key={message._id}
      className={classNames(style.messageWrapper, message.owner?._id !== userId ? style.messageWrapperGuest : style.messageWrapperUser)}
    >
      <div className={style.messageBody}>
        <div className={message.owner?._id !== userId ? style.messageGuest : style.messageUser}>
          {message.text}</div>
        <div className={style.imgWrapper}>
          {message?.media?.[0]?.url && (
            message?.media.map(({ url }) =>
              <img
                key={url}
                className={style.messageImg}
                src={`${URLWithoutGQL}/${url}`}
                alt="alarm"
              />
            ))}
        </div>

        <Time time={message.createdAt} />
      </div>
    </div>))}
  </InfiniteScroll>);
};
