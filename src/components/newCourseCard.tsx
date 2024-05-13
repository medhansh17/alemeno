import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Course } from "../state/courses/courseSlice";
import { selectUser } from "../state/user/userSlice";
import { enrollStudent } from "../utils/courseApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";

export default function PostWithLike({ course }: { course: Course }) {
  const [liked, setLiked] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id, name, description, instructor, likes, enrollmentStatus } = course;
  const user = selectUser();
  const userId = user?.id;
  const email = user?.email;

  const checkUserEnrolled = () => {
    if (!user) {
      return false;
    }
    return user.enrolledCourses.find((course) => course.id === id);
  };

  const checkIfUserHasLiked = () => {
    if (!user) {
      return false;
    }
    return likes.userIds.includes(user.id);
  };

  const handleEnroll = async () => {
    if (!user || !email || !userId) {
      navigate("/login");
      return;
    }
    try {
      const updatedCourse = await enrollStudent(id, parseInt(userId), email);
      dispatch({
        type: "courses/updateCourse",
        payload: updatedCourse,
      });
      setEnrolled(true);
      return updatedCourse;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Img
            src={
              "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            }
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={"Blog Image"}
          />
        </Box>
        <Box p={4}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              React
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {name}
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            {description}
          </Text>
          <Text color="blue.600" fontSize="2xl">
            {instructor}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Link to={`/course?id=${id}`}>
              <Text fontSize={"md"} fontWeight={"semibold"}>
                View more
              </Text>
            </Link>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => {
              if (!user || !email || !userId) {
                toast.error("Please login to like");
                navigate("/login");
                return;
              }
              setLiked(!liked);
            }}
          >
            {liked ? (
              <BsHeartFill fill="red" fontSize={"24px"} />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => {
              if (!user || !email || !userId) {
                toast.error("Please login to enroll");
                navigate("/login");
                return;
              } else {
                if (!enrolled) {
                  console.log("Enrolling user", email, "in course", id);
                  toast.promise(
                    handleEnroll(),
                    {
                      loading: "Enrolling...",
                      success: (updatedCourse) => {
                        return "Enrolled successfully!";
                      },
                      error: (error) => {
                        return error.toString();
                      },
                    },
                    {
                      style: {
                        minWidth: "250px",
                      },
                    }
                  );
                }
              }
            }}
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              {enrolled
                ? "Enrolled"
                : checkUserEnrolled()
                ? "Enrolled"
                : "Enroll"}
            </Text>
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
