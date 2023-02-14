import { FC, useContext, useState } from 'react'
import { ConversationFE } from '@types'
import { Room } from './room'
import { SkeletonConversationList } from '../skeleton'
import { ConversationModal } from './modal/conversationModal'
import { authUserContext } from '@context/index'
import { useNavigate } from 'react-router-dom'
import css from '@styles/chat/navbar/leftBar.module.css'
import {
  useGetConversations,
  useAddAndRemoveUser,
  useSubsConversationDelete,
} from '@hooks/index'
import { SvgAdd } from '@assets/svg/add'
////////////////////////////////////////////////////////////////////////
export const LeftBar: FC = ({}) => {
  //----------------------------------------------------
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [editConversation, setEditConversation] =
    useState<ConversationFE | null>(null)
  //--------------------------------------------
  const { logOut } = useContext(authUserContext)
  //------------------------------------------------------
  const { conversations, loading } = useGetConversations()
  //------------------------------------------------------
  // subscription add user and remove user
  useAddAndRemoveUser()
  // ---------------------------------
  // Subscription Deleted Conversation
  useSubsConversationDelete()
  //-------------------------
  return (
    <section className={`${css.conversation_container}`}>
      {/* ---------------------------------------------------------------------- */}

      {isOpen && (
        <ConversationModal
          conversations={conversations}
          close={setIsOpen}
          editingConversation={editConversation}
        />
      )}
      {/* ---------------------------------------------------------------------- */}
      <button
        className={css.btn_Add}
        onClick={() => setIsOpen((state) => !state)}
      >
        <SvgAdd size={72} />
      </button>
      {/* ---------------------------------------------------------------------- */}
      <div className={`${css.list_container}`}>
        {loading ? (
          <SkeletonConversationList cont={14} />
        ) : (
          conversations?.map((c) => (
            <Room
              key={c.id}
              conversation={c}
              setEditingConversation={setEditConversation}
              setIsOpen={setIsOpen}
            />
          ))
        )}
      </div>
      {/* ---------------------------------------------------------------------- */}
      {/* // TODO: cambiar por desplegable de tres puntitos o umagen avatar mas optionas puntitos */}
      <div className={`${css.logOut}`}>
        <button
          className=''
          onClick={async () => {
            await logOut()
            navigate('/login')
          }}
        >
          Logout
        </button>
      </div>
      {/* ---------------------------------------------------------------------- */}
    </section>
  )
}
