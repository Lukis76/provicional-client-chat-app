import { useQuery } from '@apollo/client'
import { operations } from '@GraphQL/index'
import type { FC } from 'react'
import { ConversationData } from '@types'
import { Header } from './msg/header'
import { Input } from './msg/input'
import { Messages } from './msg/messages'
import { useParams } from 'react-router-dom'
import css from '@styles/chat/conversation/feedWrapper.module.css'
//----------------------------------------------------------------
export const FeedWrapper: FC = () => {
  const { conversationId } = useParams()
  //----------------------------------------------------
  const { data } = useQuery<ConversationData | null>(
    operations.conversation.Queries.conversations
  )
  //-------------------------------------------------------
  const conversation = data?.conversations.find(
    (conversation) => conversation.id === conversationId
  )
  //-------------------------------------------------------
  return (
    <div className={`${css.msg_wrapper}`}>
      {conversationId && typeof conversationId === 'string' && conversation ? (
        <>
          <Header conversation={conversation} />
          <Messages />
          <Input />
        </>
      ) : (
        <span className={`${css.select}`}>seleciona una conversacion</span>
      )}
    </div>
  )
}
