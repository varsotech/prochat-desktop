import React, {createContext, ReactNode, useContext, useEffect, useRef} from "react";

type WebSocketContextValue = {
    connect: (url: string) => void;
    send: (data: any) => void;
    subscribe: (event: string, callback: (payload: any) => void) => () => void;
};

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export function HomeserverProvider({ children }: { children: ReactNode }){
    const wsRef = useRef<WebSocket | null>(null);
    const subscribers = useRef(new Map<string, Set<(payload: any) => void>>());

    const send = (data: any) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(data));
        }
    };

    const subscribe = (event: string, callback: (payload: any) => void) => {
        if (!subscribers.current.has(event)) {
            subscribers.current.set(event, new Set());
        }
        subscribers.current.get(event)?.add(callback);

        // Return unsubscribe function
        return () => {
            subscribers.current.get(event)?.delete(callback);
        };
    };

    const connect = (url: string): void => {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => console.log("[WS] connected");
        ws.onclose = () => console.log("[WS] disconnected");
        ws.onerror = (err) => console.error("[WS] error", err);

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                const { type, payload } = message;
                if (subscribers.current.has(type)) {
                    for (const cb of subscribers.current.get(type)) {
                        cb(payload);
                    }
                }
            } catch (e) {
                console.error("[WS] Failed to parse message", e);
            }
        };
    }

    useEffect(() => {
        return () => {
            wsRef.current?.close();
        };
    }, [wsRef]);

    return (
        <WebSocketContext.Provider value={{ send, subscribe, connect }}>
            {children}
        </WebSocketContext.Provider>
    );
}

export const useHomeserver = () => {
    const ctx = useContext(WebSocketContext);
    if (!ctx) throw new Error("useHomeserver must be used inside HomeserverProvider");
    return ctx;
};

