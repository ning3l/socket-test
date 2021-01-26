import React from "react";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";

export default function Dashboard({ id }) {
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Sidebar id={id} />
      <OpenConversation />
    </div>
  );
}
