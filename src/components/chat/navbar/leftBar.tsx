import { useContext, useState } from 'react'
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
////////////////////////////////////////
export const LeftBar = () => {
  //-----------------------------------------------------------
  const [edit, setEdit] = useState<ConversationFE | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  //--------------------------------------------
  const { logOut } = useContext(authUserContext)
  //---------------------------------------------
  const { conversations } = useGetConversations()
  //---------------------------------------------
  // subscription add user and remove user
  useAddAndRemoveUser()
  // ---------------------------------
  // Subscription Deleted Conversation
  useSubsConversationDelete()
  //-------------------------

  return (
    <section className={`${css.conversation_container}`}>
      {/* ------------------------------------------------ */}

      {isOpen && (
        <ConversationModal
          conversations={conversations || []}
          close={setIsOpen}
          editingConversation={edit}
        />
      )}
      {/* ------------------------------------------------ */}
      <button
        className={css.btn_Add}
        onClick={() => setIsOpen((state) => !state)}
      >
        <span/><span/>
        {/* <SvgAdd size={72} /> */}
      </button>
      {/* ------------------------------------------------ */}
      <div className={`${css.list_container}`}>
        {!conversations ? (
          <SkeletonConversationList cont={14} />
        ) : (
          conversations?.map((c) => (
            <Room
              key={c.id}
              conversation={c}
              setEditingConversation={setEdit}
              setIsOpen={setIsOpen}
            />
          ))
        )}
      </div>
      {/* ------------------------------------------------- */}
      {/* // TODO: cambiar por desplegable de tres puntitos o umagen avatar mas optionas puntitos */}
      <div className={`${css.logOut}`}>
        <button
          className=''
          onClick={() => {
            logOut()
            navigate('/login')
          }}
        >
          <span/>
          <span/>
          <span/>
        </button>
      </div>
      {/* ------------------------------------------------- */}
    </section>
  )
}
