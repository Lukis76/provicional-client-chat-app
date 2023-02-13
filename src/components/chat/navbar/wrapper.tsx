// import { List } from './list'
// import { useQuery } from '@apollo/client'
// import { operations } from '@GraphQL/index'
// import {
//   ConversationCreatedSubscriptionData,
//   ConversationData,
//   ConversationFE,
// } from '@types'
// import { useSubsConversationDelete, useAddAndRemoveUser } from '@hooks/index'
// import css from '@styles/chat/navbar/wrapper.module.css'
// import { useEffect, useState } from 'react'
// import { useGetConversations } from '@hooks/getConversations'

// export const Wrapper = () => {
//   const {conversations, loading} = useGetConversations()
//   //--------------------------------------
//   // subscription add user and remove user
//   useAddAndRemoveUser()
//   // -------------------------------------
//   // Subscription Deleted Conversation
//   useSubsConversationDelete()
//   // ---------------------------------


//   //----------------------------------------------------------------
//   return (
//     <div className={`${css.left_navbar}`}>
//       lucas
//       <List
//         conversations={conversations || []}
//         conversationsLoading={loading}
//       />
//     </div>
//   )
// }
