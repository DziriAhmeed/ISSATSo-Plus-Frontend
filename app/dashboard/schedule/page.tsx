import CardEmpty from "@/app/ui/card";
import NewsHeader from "@/app/ui/newsheader";
import Image from "next/image";

export default function Schedule() {
  return (
    <div className="flex flex-col gap-4">
        <NewsHeader/>
        <div className="flex">
        <Image src="/images/schedule.png" alt="Teach" width={1000} height={800} />
        <CardEmpty/>
        </div>
    </div>
  );
}