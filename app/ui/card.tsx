import { auth } from "@/auth";
import { JwtPlayload } from "../dashboard/layout";
import { jwtDecode } from "jwt-decode";
import TeacherProfileCard from "./profilecards/teacherprofilecard";
import StudentProfileCard from "./profilecards/studentprofilecard";


export default async function CardEmpty() {
  const session = await auth();
  const accessToken = session?.accessToken as string;
  const decodedToken: JwtPlayload = jwtDecode(accessToken);
  const role = decodedToken.role;
  switch (role) {
    case "student":
      return <StudentProfileCard/> ;
    case "teacher":
      return <TeacherProfileCard/> ;
    default:
      return <div>Invalid role</div>;
  }
}