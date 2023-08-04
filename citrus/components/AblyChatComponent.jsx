"use client"
import React, { useEffect, useState } from 'react';
import { useChannel } from "@/effects/AblyReactEffect";
import styles from './AblyChatComponent.module.css';
import { useSession } from 'next-auth/react'

export default function AblyChatComponent(channelID) {
  const { data: session } = useSession()
  let inputBox = null;
  let messageEnd = null;

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel(channelID.channelID, (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  }, session.user.name);

  function sendChatMessage(messageText) {
    channel.publish({ name: "chat-message", data: messageText });
    fetch('/api/messages/groups/' + channelID.channelID + '/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: messageText,
        })
      }).then((response) => {
        if (response.ok) {
        }
      }
    )
  setMessageText("");
  inputBox.focus();
}

const handleFormSubmission = (event) => {
  event.preventDefault();
  sendChatMessage(messageText);
}

const handleKeyPress = (event) => {
  if (event.code !== "Enter" || messageTextIsEmpty) {
    return;
  }
  sendChatMessage(messageText);
  event.preventDefault();
}

const messages = receivedMessages.map((message, index) => {
  const author = message.connectionId === ably.connection.id ? "me" : "other";
  return <span key={index} className={styles.message} data-author={author}>{message.data}</span>;
});

useEffect(() => {
  if (messageEnd !== null) {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  }
});

return (
  <div className={styles.chatHolder}>
    <div className={styles.chatText}>
      {messages}
      <div ref={(element) => { messageEnd = element; }}></div>
    </div>
    <form onSubmit={handleFormSubmission} className={styles.form}>
      <textarea
        ref={(element) => { inputBox = element; }}
        value={messageText}
        placeholder="Type a message..."
        onChange={e => setMessageText(e.target.value)}
        onKeyDown={handleKeyPress}
        className={styles.textarea}
      ></textarea>
      <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>Send</button>
    </form>
  </div>
)
}