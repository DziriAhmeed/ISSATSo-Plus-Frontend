"use client";
import { usePathname } from "next/navigation";
import Avatar from "./avatar";

export default function PageHeader({
  username,
  role,
}: {
  username: string;
  role: string;
}) {
  const pathname = usePathname();
  return (
    <div className=" flex pt-4 justify-between w-full items-center ">
      <div className="capitalize">
        {pathname.split("/")[pathname.split("/").length - 1]}
      </div>
      <div className="flex items-center">
        <Avatar />
        <div className="flex-col mr-4 ">
          <div className=" text-xs ml-2 text-[#516DFF] font-semibold ">
            Mr. {username}
          </div>
          <div className="text-xs ml-2 font-sans font-medium">{role}</div>
        </div>
      </div>
    </div>
  );
}
