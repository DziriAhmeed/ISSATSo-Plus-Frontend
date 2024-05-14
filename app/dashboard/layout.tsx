import { ReactNode } from "react";
import PageHeader from "../ui/pageheader";
import { jwtDecode } from "jwt-decode";
import { auth } from "@/auth";
import Sidebar from "../ui/sidebar";
export type JwtPlayload = {
  fullName: string;
  role: string;
  sub: number;
  email: string;
  iat: number;
  exp: number;
};

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  const accessToken = session?.accessToken as string;
  const decodedToken: JwtPlayload = jwtDecode(accessToken);
  return (
    <div>
      <Sidebar />
      <div className=" lg:ml-56 mr-4">
        <PageHeader username={decodedToken.fullName} role={decodedToken.role} />

        {children}
      </div>
    </div>
  );
}
