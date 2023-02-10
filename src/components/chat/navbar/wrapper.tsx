// import { FC, useEffect, useState } from "react";
import { ConversationList } from "./list";
import { useQuery } from "@apollo/client";
import { operations } from "@GraphQL/index";
import {
  ConversationCreatedSubscriptionData,
  // ConversationCreatedSubscriptionData,
  ConversationData,
  ConversationFE,
  // ConversationFE,
} from "@types";
import { useSubsConversationDelete, useAddAndRemoveUser } from "@hooks/index";
import css from '@styles/chat/navbar/wrapper.module.css'
import { useEffect, useState } from 'react';
import { useNavigation, useParams, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';

export const Wrapper = () => {
  const [conversations, setConversations] = useState<
    Array<ConversationFE> | undefined
  >(undefined);

  //-------------------------------------------
  const {
    data,
    loading: conversationsLoading,
    subscribeToMore,
  } = useQuery<ConversationData >(
    operations.conversation.Queries.conversations
    // {
    //   // onCompleted(data) {
    //   //   const orderConversations = [...data.conversations].sort(
    //   //     (a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf()
    //   //   );
    //   //   setConversations(orderConversations);
    //   // },
    // }
  );
  //---------------------------------------------------------------------------------
  // subscription add user and remove user
  useAddAndRemoveUser();
  // ---------------------
  // Subscription Deleted Conversation
  useSubsConversationDelete();
  // --------------------------
  useEffect(() => {
    subscribeToMore({
      document: operations.conversation.Subscriptions.created,
      updateQuery: (
        prev,
        { subscriptionData }: ConversationCreatedSubscriptionData
      ) => {
        if (!subscriptionData.data) return prev;
        const newConversation = subscriptionData.data.conversationCreated;
        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev?.conversations],
        });
      },
    });
  }, []);
  console.log("🚀 ~ file: wrapper.tsx:15 ~ data", data?.conversations);

  // const location = useLocation()
  // const query = new URLSearchParams(location.search);
  // console.log("🚀 ~ file: wrapper.tsx:63 ~ Wrapper ~ a", query)

const navigate = useNavigate()


  let userId = useParams()
  console.log("🚀 ~ file: wrapper.tsx:66 ~ Wrapper ~ userId", userId)
  //----------------------------------------------------------------
  return (
    <div className={`${css.left_navbar}`}>
      {/* <h1>{userId}</h1> */}
      lucas
      <ConversationList
        conversations={data?.conversations}
        conversationsLoading={conversationsLoading}
      />
      <button onClick={() => {
        navigate('/chat/hj547577342')
      }} >
        navegacion

        {/* <Link to={'/chat?userId=hj547577342'} ></Link> */}
      </button>
      {/* <Navigate to={'/chat?userId=76348736hjn'} /> */}
    </div>
  );
};
