import { auth } from "@/auth";
import { JwtPlayload } from "../dashboard/layout";
import { jwtDecode } from "jwt-decode";
import StudentStack from "./student-stack";
import TeacherStack from "./teacher-stack";
import AdminStack from "./admin-stack";


export default async function Sidebar() {
  const session = await auth();
  const accessToken = session?.accessToken as string;
  const decodedToken: JwtPlayload = jwtDecode(accessToken);
  const role = decodedToken.role;
  switch (role) {
    case "student":
      return <StudentStack/> ;
    case "teacher":
      return <TeacherStack/> ;
    case "admin":
      return <AdminStack/>;
    default:
      return <div>Invalid role</div>;
  }
}
