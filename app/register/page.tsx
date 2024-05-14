import Image from "next/image";
import RegisterForm from "../ui/register/register-form";

export default function RegisterPage() {
  return (
    <div className="bg-[url('/images/MainBg.png')] h-screen bg-cover bg-no-repeat flex flex-col md:flex-row items-center justify-center h-screen p-10">
        <div className="w-1/2 flex flex-column justify-center">
            <h1 className="text-6xl font-bold text-white">Welcome to ISSATSO+</h1>
        </div>
    <main className="flex items-center justify-center md:h-screen" >
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <RegisterForm />
      </div>
    </main></div>
  );
}