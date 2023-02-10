import { useMutation } from "@apollo/client";
import { operations } from "@GraphQL/index";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";
import { ConversationFE, SearchUser, TypeState } from "@types";

export const useUpdateConversation = (
  participants: Array<SearchUser>,
  setState: Dispatch<SetStateAction<TypeState>>,
  close: Dispatch<SetStateAction<boolean>>
) => {
  const [updateParticipants] = useMutation<
    { updateParticipants: boolean },
    { conversationId: string; participantIds: Array<string> }
  >(operations.conversation.Mutations.updateParticipants);

  const onUpdateConversation = async (conversation: ConversationFE) => {
    const participantIds = participants.map((p) => p.id);
    try {
      const { data, errors } = await updateParticipants({
        variables: {
          conversationId: conversation.id,
          participantIds,
        },
      });

      if (!data?.updateParticipants || errors) {
        throw new Error("Failed updating participants");
      }

      setState((prev) => ({
        ...prev,
        participants: [],
        username: "",
      }));

      close((state) => !state);
    } catch (err) {
      console.error("On Updated Conversation to participants Error", err);
      toast.error("Failed to updated Participants");
    }
  };

  return { onUpdateConversation };
};
