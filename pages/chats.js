import React, {useContext, useEffect, useState} from "react";

import {Context} from "../context";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ChatEngine = dynamic(()=> import("react-chat-engine").then(module=>module.ChatEngine));
const MessageFormSocial = dynamic(()=> import("react-chat-engine").then(module=>module.MessageFormSocial));

export default function Chats() {
  const {username, secret} = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(()=> {
    if(typeof document !== null){
      setShowChat(true);
    }
  })

  useEffect(()=> {
    if(username?.length === 0 || secret?.length === 0) router.push('/')
  },[username, secret])
  if(!showChat) return <div />

  return <div className="background">
          <div className="shadow">
            <ChatEngine height="calc(100vh - 200px)" projectID="3d350a91-4e20-4dc6-8012-5eb2fbe25e9e" userName={username} userSecret={secret} renderNewMessageForm={()=> <MessageFormSocial />}/>
          </div>
    </div>;
}