"use client";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("../components/Chatbot"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1></h1>
      <Chatbot />
    </div>
  );
}
