import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversations();

  console.log("selected msg", selectedConversation);

  // here, you need to pass a recipient id !
  // you could get that from the params
  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(selectedConversation.recipient, text);
    setText("");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "400px" }}>
        {selectedConversation.messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setText(e.target.value)} />
        <button type="submit">send</button>
      </form>
    </div>
  );
}
