import toast from "react-hot-toast";
import { User } from "../state/user/userSlice";

export async function handleLogin(
  email: string,
  password: string
): Promise<User | string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/users");
      const users = await response.json();
      const user = users.find(
        (user: any) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      if (user) {
        resolve(user);
      } else {
        reject("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } catch (error) {
      reject("Error logging in");
    }
  });
}

export async function handleSignUp(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<User | string> {
  return new Promise(async (resolve, reject) => {
    try {
      const userResponse = await fetch("http://localhost:8000/users");
      const userData = await userResponse.json();
      const exisingUser = userData.find(
        (user: User) => user.email.toLowerCase() === email.toLowerCase()
      );

      const data = {
        id: userData.length + 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        enrolledCourses: [],
      };

      if (exisingUser) {
        toast.error("User already exists");
      } else {
        const response = await fetch("http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const user = await response.json();
        resolve(user);
      }
    } catch (error) {
      console.log("Error signing up", error);
      reject("Error signing up");
    }
  });
}
