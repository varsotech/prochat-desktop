import React, {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {useOAuth} from "../OAuth/OAuth";
import {
    Message,
    Message_Type,
    MessageSchema
} from "../../../../prochat-server/client/homeserver/v1/homeserver_pb";
import {create, fromBinary, toBinary} from "@bufbuild/protobuf";

type WebSocketContextValue = {
    request: (type: Message_Type, payload: Uint8Array, callback: (payload: Message) => void) => () => void;
    send: (type: Message_Type, payload: Uint8Array) => void;
    subscribe: (event: Message_Type, callback: (payload: Message) => void) => () => void;
    isOpen: boolean;
};

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export function HomeserverProvider({ children }: { children: ReactNode }){
    const {homeserverAddress, tokenResponse} = useOAuth();
    const wsRef = useRef<WebSocket | null>(null);
    const subscribers = useRef(new Map<Message_Type, Set<(payload: Message) => void>>());
    const [isOpen, setIsOpen] = useState(false);

    const send = (type: Message_Type, payload: Uint8Array) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            const data = toBinary(MessageSchema, create(MessageSchema, {
                type,
                payload
            }));
            wsRef.current.send(data);
        }
    };

    const subscribe = (event: Message_Type, callback: (payload: Message) => void) => {
        if (!subscribers.current.has(event)) {
            subscribers.current.set(event, new Set());
        }

        console.log("subscribed to homeserver websocket event ", event);
        subscribers.current.get(event)?.add(callback);

        // Return unsubscribe function
        return () => {
            console.log("unsubscribed to homeserver websocket event ", event);
            subscribers.current.get(event)?.delete(callback);
        };
    };

    const connect = (url: string): void => {
        const ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("connected to homeserver websocket, sending handshake");
            wsRef.current.send("Bearer " + tokenResponse.accessToken);
            setIsOpen(true);
        };
        ws.onclose = () => console.log("[WS] disconnected");
        ws.onerror = (err) => console.error("[WS] error", err);

        ws.onmessage = (event) => {
            try {
                const message = fromBinary(MessageSchema, new Uint8Array(event.data));
                if (subscribers.current.has(message.type)) {
                    for (const sub of subscribers.current.get(message.type)) {
                        sub(message);
                    }
                }
            } catch (e) {
                console.error("[WS] Failed to parse message", e);
            }
        };
    };

    const request = (event: Message_Type, payload: Uint8Array, callback: (payload: Message) => void) => {
        const cleanup = subscribe(event, callback);
        send(event, payload);
        return cleanup;
    };

    useEffect(() => {
        console.log(tokenResponse?.accessToken);
        if (homeserverAddress != "" && tokenResponse?.accessToken != null && wsRef.current == null) {
            console.log("connecting to homeserver websocket", homeserverAddress);
            connect(homeserverAddress + "/api/v1/homeserver/ws");
        }
    }, [homeserverAddress, tokenResponse]);

    useEffect(() => {
        return () => {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current?.close();
            }
        };
    }, [wsRef]);

    return (
        <WebSocketContext.Provider value={{ request, send, subscribe, isOpen }}>
            {children}
        </WebSocketContext.Provider>
    );
}

export const useHomeserver = () => {
    const ctx = useContext(WebSocketContext);
    if (!ctx) throw new Error("useHomeserver must be used inside HomeserverProvider");
    return ctx;
};

