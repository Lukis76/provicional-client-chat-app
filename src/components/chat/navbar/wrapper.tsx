// import { FC, useEffect, useState } from "react";
import { ConversationList } from "./list";
import { useQuery } from "@apollo/client";
import { operations } from "graphQL/operations";
import {
  // ConversationCreatedSubscriptionData,
  ConversationData,
  // ConversationFE,
} from "types";
// import { useSubsConversationDelete, useAddAndRemoveUser } from "hook";

export const ConversationWrapper = () => {
  // const [conversations, setConversations] = useState<
  //   Array<ConversationFE> | undefined
  // >(undefined);

  //-------------------------------------------
  const {
    data,
    loading: conversationsLoading,
    // subscribeToMore,
  } = useQuery<ConversationData, null>(
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
  //subscription add user and remove user
  // useAddAndRemoveUser();
  //---------------------
  // Subscription Deleted Conversation
  // useSubsConversationDelete();
  //--------------------------
  // useEffect(() => {
  //   subscribeToMore({
  //     document: operations.conversation.Subscriptions.created,
  //     updateQuery: (
  //       prev,
  //       { subscriptionData }: ConversationCreatedSubscriptionData
  //     ) => {
  //       if (!subscriptionData.data) return prev;
  //       const newConversation = subscriptionData.data.conversationCreated;
  //       return Object.assign({}, prev, {
  //         conversations: [newConversation, ...prev.conversations],
  //       });
  //     },
  //   });
  // }, []);
  // console.log("🚀 ~ file: wrapper.tsx:15 ~ data", data?.conversations);
  //----------------------------------------------------------------
  return (
    <div className=" bg-zinc-800 w-full max-w-xs  min-w-[16rem]">
      {/* <ConversationList
        conversations={data?.conversations}
        conversationsLoading={conversationsLoading}
      /> */}
    </div>
  );
};
