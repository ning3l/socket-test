import React, { useContext, useState, useEffect, useCallback } from "react";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

const contacts = [
  {
    username: "ONE",
    id: "1",
  },
  {
    username: "TWO",
    id: "2",
  },
  {
    username: "THREE",
    id: "3",
  },
];

export function ConversationsProvider({ id, children }) {
  // simulate loading a convo history for curr user:
  const [conversations, setConversations] = useState([
    {
      recipient: "1",
      messages: ["helloo ONE"],
    },
    {
      recipient: "2",
      messages: ["heya TWO", "sup TWO"],
    },
    {
      recipient: "3",
      messages: ["hi THREE", "hi hi THREE", "hi hi hi THREE"],
    },
  ]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const socket = useSocket();

  // gets called from server AND client
  const addMessageToConversation = useCallback(
    ({ recipient, text, sender }) => {
      // either you have a convo with that receiver already or not
      // for now, just assume you have prev convos !
      let oldConvo = conversations.find((el) => el.recipient === recipient);
      if (oldConvo) {
        oldConvo.messages.push(text);
      }
      // use this instead later:
      // setConversations((prev) => {
      //   const newMessage = { sender, text };
      //   return [...prev]
      //     .filter((el) => el.recipient === recipient)[0]
      //     .messages.push(newMessage);
      // });
    }
  );

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);
    // remove old eventListeners so new ones aren't constantly added on top
    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function sendMessage(recipient, text) {
    socket.emit("send-message", { recipient, text });
    addMessageToConversation({ recipient, text, sender: id });
  }

  const value = {
    conversations,
    selectedConversation: conversations[selectedConversationIndex],
    sendMessage,
    contacts,
    setSelectedConversationIndex,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
