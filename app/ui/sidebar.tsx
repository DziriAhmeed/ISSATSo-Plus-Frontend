import { auth } from "@/auth";
import { JwtPlayload } from "../dashboard/layout";
import { jwtDecode } from "jwt-decode";
import StudentSideBar from "./student-sidebar";
import TeacherSideBar from "./teacher-sidebar";
import AdminSideBar from "./admin-sidebar";

export default async function Sidebar() {
  const session = await auth();
  const accessToken = session?.accessToken as string;
  const decodedToken: JwtPlayload = jwtDecode(accessToken);
  const role = decodedToken.role;
  switch (role) {
    case "student":
      return <StudentSideBar />;
    case "teacher":
      return <TeacherSideBar />;
    case "admin":
      return <AdminSideBar />;
    default:
      return <div>Invalid role</div>;
  }
}
