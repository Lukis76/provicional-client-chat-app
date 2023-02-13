import { useQuery } from '@apollo/client'
import { operations } from '@GraphQL/index'
import {
  ConversationCreatedSubscriptionData,
  ConversationData,
  ConversationFE,
} from '@types'
import { useEffect, useState } from 'react'

export const useGetConversations = () => {
  const [conversations, setConversations] = useState<Array<ConversationFE>>([])

  //-------------------------------------------
  const { loading, subscribeToMore } = useQuery<ConversationData>(
    operations.conversation.Queries.conversations,
    {
      onCompleted(data) {
        const orderConversations = [...data.conversations].sort(
          (a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf()
        )
        setConversations(orderConversations)
      },
    }
  )

  useEffect(() => {
    subscribeToMore({
      document: operations.conversation.Subscriptions.created,
      updateQuery: (
        prev,
        { subscriptionData }: ConversationCreatedSubscriptionData
      ) => {
        if (!subscriptionData.data) return prev
        const newConversation = subscriptionData.data.conversationCreated
        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev?.conversations],
        })
      },
    })
  }, [])

  return {
    conversations,
    loading,
  }
}
