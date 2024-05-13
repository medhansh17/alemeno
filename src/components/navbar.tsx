import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { selectUser, setUser } from "../state/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useLocation } from "react-router-dom";

const NavLink: React.FC<{ text: string; to: string }> = ({ text, to }) => {
  return (
    <ReactLink to={to}>
      <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        {text}
      </Link>
    </ReactLink>
  );
};

export default function Navbar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = selectUser();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  if (location.pathname === "/login") {
    return null; // Do not display navbar when path is /login
  }
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box className="font-bold">Alemeno</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink text={"Courses"} to={"/"} />
              <NavLink text={"Dashboard"} to={"/dashboard"} />
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              {user ? (
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
              ) : (
                <Button
                  as={"a"}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"blue.400"}
                  href={"/login"}
                  _hover={{
                    bg: "pink.300",
                  }}
                >
                  Sign In
                </Button>
              )}
              <MenuList>
                <MenuItem
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  My Courses
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setUser(null));
                    navigate("/");
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink text={"Courses"} to={"/"} />
              <NavLink text={"Dashboard"} to={"/dashboard"} />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
