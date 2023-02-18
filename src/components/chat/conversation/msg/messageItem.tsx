import type { FC } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { MsgFE } from '@types'
import css from '@styles/chat/conversation/msg/msgItem.module.css'

type MessageItemType = {
  msg: MsgFE
  sendByMe: boolean
}

export const MessageItem: FC<MessageItemType> = ({ msg, sendByMe }) => {
  return (
    <>
      <div aria-selected={sendByMe} className={`${css.msg}`}>
        <span>
          {sendByMe ? 'Tu' : msg?.sender?.username}
          <span>{' - '}</span>
          <ReactTimeAgo
            date={Number(new Date(msg.createdAt))}
            timeStyle={'twitter'}
          />
        </span>
        <span>{msg?.body}</span>
      </div>
      <span className={`${css.triangulo}`}></span>
    </>
  )
}
