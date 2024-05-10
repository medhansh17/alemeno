import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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

export const CourseCard = ({ course }: { course: Course }) => {
  const { id, name, description, instructor } = course;

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
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              window.location.href = `/course?id=${id}`;
            }}
          >
            Know More
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
