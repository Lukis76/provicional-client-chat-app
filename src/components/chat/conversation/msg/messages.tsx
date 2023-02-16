import { SkeletonMsgsList } from '@components/chat/skeleton'
import { FC } from 'react'
import { MessageItem } from './messageItem'
import css from '@styles/chat/conversation/msg/msgs.module.css'
import { useMsg } from '@hooks/msg'

export const Messages: FC = () => {
  const { data, loading, userId } = useMsg()
  console.log('🚀 ~ file: messages.tsx:9 ~ data', data)

  return (
    <div className={`${css.content_msg}`}>
      {loading && <SkeletonMsgsList />}
      {data && (
        // TODO: revisar el tema del escrol de la convesacion
        <>
          {data.map((msg) => (
            <MessageItem
              key={msg.id}
              msg={msg}
              sendByMe={msg?.sender?.id === userId}
            />
          ))}
        </>
      )}
    </div>
  )
}
