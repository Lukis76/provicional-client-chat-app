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
  const [editingConversation, setEditingConversation] =
    useState<ConversationFE | null>(null)
  //--------------------------------------------
  const { logOut } = useContext(authUserContext)
  //------------------------------------------------------
  const { conversations, loading } = useGetConversations()
  //------------------------------------------------------
  // subscription add user and remove user
  useAddAndRemoveUser()
  // -------------------------------------
  // Subscription Deleted Conversation
  useSubsConversationDelete()
  //------------------------------------------------------------------
  return (
    <section className={`${css.conversation_container}`}>

      {isOpen && (
        <ConversationModal
          conversations={conversations}
          close={setIsOpen}
          editingConversation={editingConversation}
        />
      )}


      <button
        className={css.btn_Add}
        onClick={() => setIsOpen((state) => !state)}
      >
        <SvgAdd size={72} />
      </button>

      <div className='flex flex-col justify-start items-center w-full h-full gap-2  overflow-hidden ove'>
        {loading ? (
          <SkeletonConversationList cont={14} />
        ) : (
          conversations?.map((c) => (
            <Room
              key={c.id}
              conversation={c}
              setEditingConversation={setEditingConversation}
              setIsOpen={setIsOpen}
            />
          ))
        )}
      </div>
      <div className='absolute bottom-2 left-0 right-0 w-full px-2'>
        <button
          className='bg-zinc-700 text-zinc-400 hover:bg-zinc-900 w-full px-4 py-1  rounded-lg'
          onClick={async () => {
            await logOut()
            navigate('/login')
          }}
        >
          Logout
        </button>
      </div>
      {/* </div> */}
    </section>
  )
}
