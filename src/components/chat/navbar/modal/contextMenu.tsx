import { useOnDeletedConversation } from "hook";
import { FC } from "react";
import { TypeContextMenu } from "types";

export const ContextMenu: FC<TypeContextMenu> = ({
  close,
  conversationId,
  setEditingConversation,
  conversation,
  setIsOpen,
}) => {
  const { onConversationDeleted } = useOnDeletedConversation();

  return (
    <>
      <div
        className="fixed z-10 top-0 left-0 bg-zinc-900 h-screen w-screen opacity-60 cursor-default"
        onClick={() => {
          setEditingConversation(null);
          close(false);
        }}
      />
      <div className="absolute top-1/2 left-1/3 rounded-md bg-zinc-800 flex flex-col justify-center items-center z-20 w-full max-w-[8rem] border-white border-[1px] border-opacity-80">
        <button
          className="text-center px-6 py-1 hover:bg-zinc-700 w-full rounded-t-md"
          onClick={(e) => {
            e.stopPropagation();
            setEditingConversation(conversation);
            setIsOpen(true);
            close(false);
          }}
        >
          Edit
        </button>
        <button
          className="text-center px-6 py-1 hover:bg-zinc-700 w-full rounded-b-md"
          onClick={async (e) => {
            e.stopPropagation();
            await onConversationDeleted(conversationId);
            close(false);
          }}
        >
          Deleted
        </button>
      </div>
    </>
  );
};
