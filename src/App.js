import { useState, useEffect, useRef } from "react";
import Dashboard from "./components/Dashboard";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";

function App() {
  // set currently logged in user here
  const [id, setId] = useState("4");

  return (
    <SocketProvider id={id}>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </SocketProvider>
  );
}

export default App;
