import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ThemeToggler } from "../../components/ThemeToggler";
import { useAuth } from "../../hooks/useAuth";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const { user, logout } = useAuth();
  return (
    <Flex as="nav" px={10} h="90px" gap={10} alignItems="center">
      <Box
        _hover={{
          cursor: "pointer",
        }}
      ></Box>
      <Flex flex={1} gap={20}>
        <Link href="/dashboard">
          <Button
            variant="ghost"
            _hover={{
              cursor: "pointer",
            }}
          >
            Dashboard
          </Button>
        </Link>
      </Flex>
      <HStack>
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
            leftIcon={<Avatar size="md" src="https://bit.ly/sage-avatar" />}
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
