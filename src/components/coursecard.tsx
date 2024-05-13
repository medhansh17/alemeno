import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Course } from "../state/courses/courseSlice";
import { selectUser } from "../state/user/userSlice";
import { enrollStudent } from "../utils/courseApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";

export const CourseCard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id, name, description, instructor } = course;
  const user = selectUser();
  const userId = user?.id;
  const email = user?.email;

  const handleEnroll = async () => {
    if (!user || !email || !userId) {
      navigate("/login");
      return;
    }
    try {
      const updatedCourse = await enrollStudent(id, parseInt(userId), email);
      return updatedCourse;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Card maxW="300px">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Link to={`/course?id=${id}`}>
            <Heading size="md">{name}</Heading>
          </Link>
          <Text>{description}</Text>
          <Text color="blue.600" fontSize="2xl">
            {instructor}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="7">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              navigate(`/course?id=${id}`);
            }}
          >
            Know More
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              if (!user || !email || !userId) {
                toast.error("Please login to enroll");
                navigate("/login");
                return;
              } else {
                console.log("Enrolling user", email, "in course", id);
                toast.promise(
                  handleEnroll(),
                  {
                    loading: "Enrolling...",
                    success: (updatedCourse) => {
                      dispatch({
                        type: "courses/updateCourse",
                        payload: updatedCourse,
                      });
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
            }}
          >
            Enroll
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
