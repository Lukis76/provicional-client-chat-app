import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import { ConversationFE, User } from '@types'
import ReactTimeAgo from 'react-time-ago'
import { useViewConversation } from '@hooks/index'
import { ContextMenu } from '@components/chat/navbar/modal/contextMenu'
import { authUserContext } from '@context/index'
import { useParams } from 'react-router-dom'
import css from '@styles/chat/navbar/room.module.css'
import { formatUsersName } from '@components/utils/formatUserName'

interface ConversationItemProps {
  conversation: ConversationFE
  setEditingConversation: Dispatch<SetStateAction<ConversationFE | null>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const DEFAUT_IMG =
  'https://thumbs.dreamstime.com/b/conceptual-hand-writing-showing-breakout-session-business-photo-showcasing-workshop-discussion-presentation-specific-topic-125699196.jpg'

export const Room: FC<ConversationItemProps> = ({
  conversation,
  setEditingConversation,
  setIsOpen,
}) => {
  //--------------------------------------------------------------------
  const { user } = useContext(authUserContext)
  const { conversationId } = useParams()
  const [contextMenu, setContextMenu] = useState<boolean>(false)
  const customImg = ''
  const { onViewConversation } = useViewConversation()
  //-------------------------------------------------------------------
  const getUserParticipant = (conversation: ConversationFE) => {
    return Boolean(
      conversation.participants.find((p) => p.user.id === user?.id)
        ?.hasSeenLatestMsg
    )
  }
  //-----------------------------------------------------------------
  const handleClick = (e: React.MouseEvent) => {
    if (e.type === 'click') {
      onViewConversation(
        conversation.id,
        getUserParticipant(conversation),
        user
      )
    } else if (e.type === 'contextmenu') {
      e.preventDefault()
      setContextMenu(true)
    }
  }
  //--------------------------------------------------------------
  return (
    <div
      aria-checked={conversation.id === conversationId ? 'true' : 'false'}
      // ${ conversation.id === conversationId && 'bg-zinc-600'}
      className={`${css.room} relative flex flex-row justify-between items-center w-full pr-4 pl-2 py-2 bg-zinc-700 hover:bg-zinc-600  text-zinc-300 rounded-lg ease duration-75 cursor-pointer gap-4`}
      onClick={(e) => {
        // router.push({ query: { conversationId: conversation.id } });
        handleClick(e)
      }}
      onContextMenu={handleClick}
    >
      {/* --------------------------------------------------------------- */}
      {contextMenu && (
        <ContextMenu
          close={setContextMenu}
          conversationId={conversation.id}
          setEditingConversation={setEditingConversation}
          conversation={conversation}
          setIsOpen={setIsOpen}
        />
      )}
      {/* --------------------------------------------------------------- */}

      <div className={`${css.info}`}>
        <div className={`${css.avatar}`}>
          <img src={customImg || DEFAUT_IMG} alt={'img room'} />
        </div>
        <div className={`${css.expand}`}>
          <div>
            <p className='text-sm truncate'>
              {formatUsersName(conversation.participants, user?.id)}
            </p>
            -
            <span className='text-xs'>
              <ReactTimeAgo
                date={Number(new Date(conversation.updatedAt))}
                timeStyle={'twitter'}
              />
            </span>
          </div>
          <div className=''>
            <span className=''>{conversation?.latestMsg?.body}</span>

            {/*  campanita parpadiante de que no esta leido */}
            {getUserParticipant(conversation) === false && (
              <span className='flex self-end w-4 h-4 rounded-full animate-pulse opacity-0 bg-green-500' />
            )}
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------- */}

      {/* --------------------------------------------------------------- */}
    </div>
  )
}
