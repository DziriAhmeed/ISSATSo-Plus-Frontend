import Image from "next/image";

export default function NewsHeader() {
    const date = new Date();
    return (
        <div className="flex bg-[#516DFF] w-full px-4 pt-4 rounded-2xl justify-between mt-1 ">
            <div className="flex flex-col content-start justify-start  gap-4 ">
                <h1 className="text-white text-2xl font-semibold">Integration Day Coming Soon </h1>
                <p className="text-white text-sm">Always stay updated in your student portal</p>
                <button className="bg-[#FECC2B] text-white rounded p-1 w-20">View all</button>
                <p className="text-white text-sm">{date.toDateString()}</p>
            </div>
            <Image src="/images/eventimage.png"width="250" height="257" alt="" />
        </div>     
    )
}
