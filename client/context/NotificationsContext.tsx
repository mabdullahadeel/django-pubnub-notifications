import React, { createContext, useEffect, useState } from "react";
import { usePubNub } from "pubnub-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { MessageEvent } from "pubnub";

type NotificationMessage = {
  id: string;
  message: string;
  peek: string;
  pid: string;
};

interface NotificationPayload extends MessageEvent {
  message: NotificationMessage[];
}

interface NotificationState {
  messages: NotificationPayload[];
  unreadCount: number;
  resetUnreadCount: () => void;
  markAllAsRead: () => void;
  markOneMessageAsRead: (id: NotificationPayload) => void;
}

export const NotificationsContext = createContext<NotificationState>({
  messages: [],
  unreadCount: 0,
  resetUnreadCount: () => {},
  markAllAsRead: () => {},
  markOneMessageAsRead: () => {},
});

const GET_NOTIFICATIONS = "getNotifications";

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [messages, setMessages] = useState<NotificationPayload[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const pubnub = usePubNub();
  const { isAuthenticated, user } = useAuth();

  const {} = useQuery(
    [GET_NOTIFICATIONS],
    () =>
      pubnub.fetchMessages({
        channels: [user!.user.pn_uuid_key],
        count: 10, // fetch last 10 messages
      }),
    {
      onSuccess: (m) => {
        if (user) {
          const prevMessages = m.channels[user.user.pn_uuid_key];
          setMessages((m) => [...m, ...((prevMessages as any) || [])]);
        }
      },
      staleTime: Infinity,
    }
  );

  const handleMessage = (event: MessageEvent) => {
    if (event.message[0].peek && event.message[0].message) {
      setMessages((prev) => [event, ...prev]);
      setUnreadCount((prev) => prev + 1);
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
      });

      return () => {
        console.log("unmounting from the notification");
        if (pubnub.getSubscribedChannels().includes(user.user.pn_uuid_key)) {
          pubnub.unsubscribe({
            channels: [user.user.pn_uuid_key],
          });
        }
      };
    }
  }, [isAuthenticated, user, pubnub]);

  const resetUnreadCount = () => setUnreadCount(0);

  const markAllAsRead = async () => {
    try {
      await pubnub.deleteMessages({
        channel: user!.user.pn_uuid_key,
      });
      resetUnreadCount();
      setMessages([]);
    } catch (e) {
      console.error(e);
    }
  };

  const markOneMessageAsRead = async (msg: NotificationPayload) => {
    try {
      await pubnub.deleteMessages({
        channel: user!.user.pn_uuid_key,
        start: msg.timetoken,
        end: msg.timetoken,
      });
      resetUnreadCount();
      setMessages(
        messages.filter((m) => m.message[0].id !== msg.message[0].id)
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        messages,
        unreadCount,
        resetUnreadCount,
        markAllAsRead,
        markOneMessageAsRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
