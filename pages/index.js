import React, {useContext} from "react";

// import {Console} from '@sebastiano1995/sebs-library'
// import  {Button} from "@sebastiano1995/sebs-library/packages/react/Button/dist/button.es";
import {Context} from '../context';
import axios from 'axios';
import {formatDate} from '@sebastiano1995/utils-js'
import { useRouter } from "next/router";

const putApi = 'https://api.chatengine.io/users';

export default function Auth() {
  const router = useRouter();
  const ctx = useContext(Context);
  const {setUsername, username, secret, setSecret} = ctx;
  const handleSubmit = (e) => {
    e.preventDefault();

    if(username.length ===0 || secret.length === 0) return

    axios.put(putApi, {username, secret}, {headers: {"Private-key": process.env.NEXT_PUBLIC_CHAT_API}}).then(res=> router.push('/chats') );
  }
  return <div className="background">

    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-title">NextJS Chat {formatDate(new Date())}</div>
        <div className="input-container">
          <input placeholder="Email" className="text-input" onChange={e=> setUsername(e.target.value)}/>
        </div>
        <div className="input-container">
          <input placeholder="Password" type="password" className="text-input" onChange={e=> setSecret(e.target.value)}/>
        </div>
    {/* <Button >Login / Set Up</Button> */}

      </form>
    </div>
  </div>;
}