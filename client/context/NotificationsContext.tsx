import React, { createContext, useEffect, useState } from "react";
import { usePubNub } from "pubnub-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { MessageEvent } from "pubnub";

type NotificationMessage = {
  id: string;
  message: string;
  peek: string;
};

interface NotificationState {
  messages: NotificationMessage[];
}

export const NotificationsContext = createContext<NotificationState>({
  messages: [],
});

const GET_NOTIFICATIONS = "getNotifications";

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [messages, setMessages] = useState<NotificationMessage[]>([]);
  const pubnub = usePubNub();
  const { isAuthenticated, user } = useAuth();

  const {} = useQuery(
    [GET_NOTIFICATIONS],
    () =>
      pubnub.fetchMessages({
        channels: [user!.user.pn_uuid_key],
        count: 10,
      }),
    {
      onSuccess: (m) => console.log(m),
      staleTime: Infinity,
    }
  );

  const handleMessage = (event: MessageEvent) => {
    const newMessage: NotificationMessage = event.message[0];
    if (newMessage.peek && newMessage.message) {
      setMessages((prev) => [newMessage, ...prev]);
    }
  };

  useEffect(() => {
    if (
      isAuthenticated &&
      user &&
      !pubnub.getSubscribedChannels().includes(user.user.pn_uuid_key)
    ) {
      pubnub.addListener({ message: handleMessage });
      pubnub.subscribe({
        channels: [user.user.pn_uuid_key],
        withPresence: false,
      });
    }
  }, [isAuthenticated, user, pubnub]);

  return (
    <NotificationsContext.Provider value={{ messages }}>
      {children}
    </NotificationsContext.Provider>
  );
};
