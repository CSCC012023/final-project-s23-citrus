"use client"
import Ably from "ably/promises";
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'

const ably = new Ably.Realtime.Promise({ authUrl: '/api/messages/ably?clientId=' + 3 });  

export function useChannel(channelName, callbackOnMessage) {  
    const channel = ably.channels.get(channelName);

    const onMount = () => {
        channel.subscribe(msg => { callbackOnMessage(msg); });
    }

    const onUnmount = () => {
        channel.unsubscribe();
    }

    const useEffectHook = () => {
        onMount();
        return () => { onUnmount(); };
    };

    useEffect(useEffectHook);

    return [channel, ably];
}