import { FC, useContext, useEffect, useState } from 'react'
import { ConversationFE } from '@types'
import { ConversationItem } from './item'
// import { SkeletonConversationList } from '../skeleton'
// import { ConversationModal } from './modal/conversationModal'
import { authUserContext } from '@context/index'
import { useNavigate } from 'react-router-dom'
//////////////////////////////////////////////////////////////
interface ConversationListProps {
  conversations: Array<ConversationFE> | undefined
  conversationsLoading: boolean
}
//////////////////////////////////////////////////////////////
export const ConversationList: FC<ConversationListProps> = ({
  conversations,
  conversationsLoading,
}) => {
  //----------------------------------------------------------------
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [editingConversation, setEditingConversation] =
    useState<ConversationFE | null>(null)
  const [order, setOrder] = useState(conversations);
  //--------------------------------------------------------------------------------------------------------
  const { logOut } = useContext(authUserContext)

  //-------------------------------------------------------------------------------
  useEffect(() => {
    if (typeof conversations !== "undefined") {
      setOrder(() =>
        [...conversations].sort(
          (a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf()
        )
      );
    }
  }, [conversations]);

  // console.log("🚀 ~ file: list.tsx:22 ~ order", order);
  //----------------------------------------------------------------------------------------
  return (
    <section className='flex flex-col justify-between items-center h-screen w-full relative'>
      <div className='flex flex-col justify-center items-center w-full h-full '>
        <div className='flex py-3 px-2 w-full'>
          <button
            className='flex justify-center items-center w-full py-2 px-4 rounded-lg text-zinc-200 bg-zinc-900 cursor-pointer font-normal'
            onClick={() => setIsOpen((state) => !state)}
          >
            find or start conversation
          </button>
        </div>
        {/* {isOpen && (
          <ConversationModal
            conversations={conversations}
            close={setIsOpen}
            editingConversation={editingConversation}
          />
        )} */}

        <div className='flex flex-col justify-start items-center w-full h-full gap-2  overflow-hidden ove'>
          {conversationsLoading ? (
            <></>
            // <SkeletonConversationList cont={14} />
          ) 
          : (
            conversations?.map((c) => (
              <ConversationItem
                key={c.id}
                conversation={c}
                setEditingConversation={setEditingConversation}
                setIsOpen={setIsOpen}
              />
            ))
          )
          }
        </div>
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
    </section>
  )
}
