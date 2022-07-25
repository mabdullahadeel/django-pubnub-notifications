import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { ThemeToggler } from "../../components/ThemeToggler";
import { useAuth } from "../../hooks/useAuth";
import { NotificationsPanel } from "./NotificationsPanel";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const { user, logout } = useAuth();
  return (
    <Flex
      as="nav"
      px={10}
      h="90px"
      gap={10}
      alignItems="center"
      justifyContent={{
        base: "flex-end",
        sm: "space-between",
        md: "flex-end",
        lg: "flex-end",
      }}
      position="sticky"
      top={0}
      zIndex={100}
      bg="gray.800"
    >
      <HStack>
        <NotificationsPanel />
        <Text fontSize="large">{user?.user.username}</Text>
        <Menu>
          <MenuButton
            bg="transparent"
            _hover={{
              bg: "transparent",
            }}
            _active={{
              bg: "transparent",
            }}
            as={Button}
            leftIcon={
              <Avatar
                size="md"
                name={
                  user && user.user.first_name
                    ? `${user?.user.first_name} ${user?.user.last_name}`
                    : user?.user.username || "DJ"
                }
              />
            }
          ></MenuButton>
          <MenuList>
            <MenuItem onClick={() => logout()}>Logout</MenuItem>
            <MenuItem>
              <Flex justifyContent="space-between" w="100%">
                <Box as="span">Switch Theme</Box>
                <ThemeToggler />
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Nav;
