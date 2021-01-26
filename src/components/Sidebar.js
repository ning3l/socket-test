import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Sidebar() {
  const { contacts, setSelectedConversationIndex } = useConversations();
  return (
    <div
      style={{ height: "100vh", width: "250px", backgroundColor: "lightblue" }}
    >
      {contacts.map((user) => (
        <div
          style={{ height: "40px", textAlign: "center", cursor: "pointer" }}
          onClick={() => setSelectedConversationIndex(user.id - 1)}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}
