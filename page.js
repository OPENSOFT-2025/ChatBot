"use client";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("../components/Chatbot"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Chatbot</h1>
      <Chatbot />
    </div>
  );
}
