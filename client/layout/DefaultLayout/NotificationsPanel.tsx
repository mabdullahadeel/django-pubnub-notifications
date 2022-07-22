import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  Text,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext } from "react";
import { NotificationsContext } from "../../context/NotificationsContext";

interface NotificationsPanelProps {}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();
  const {
    messages,
    resetUnreadCount,
    unreadCount,
    markAllAsRead,
    markOneMessageAsRead,
  } = useContext(NotificationsContext);

  return (
    <>
      <Button
        ref={btnRef}
        onClick={() => {
          onOpen();
          resetUnreadCount();
        }}
      >
        Notifications
        <Badge ml={1} colorScheme="red">
          {unreadCount}
        </Badge>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Latest Notifications</DrawerHeader>

          <DrawerBody>
            {messages.map((msg) => (
              <Link
                key={`${msg.message[0].id}-${msg.timetoken}`}
                href={`/p/${msg.message[0].pid}`}
              >
                <VStack
                  mb={3}
                  alignItems="flex-start"
                  bg="gray.800"
                  border="1px solid"
                  borderColor="red.900"
                  p={4}
                  borderRadius={5}
                  _hover={{
                    cursor: "pointer",
                    opacity: 0.95,
                  }}
                >
                  <Text fontSize="large" fontWeight="bold">
                    {msg.message[0].message}
                  </Text>
                  <Text>{msg.message[0].peek}</Text>
                </VStack>
              </Link>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <HStack>
              <Button colorScheme="red" onClick={() => markAllAsRead()}>
                Mark All As Read
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
