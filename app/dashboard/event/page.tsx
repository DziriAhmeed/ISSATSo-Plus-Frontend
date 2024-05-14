import Image from "next/image";

export default function Teach() {
  return (
    <div className="flex gap-4 ">
      <Image
        src="/images/eventdiscrip.png"
        alt="Teach"
        width={250}
        height={400}
      />
      <Image
        src="/images/eventtable.png"
        alt="Teach"
        width={800}
        height={880}
      />
    </div>
  );
}
