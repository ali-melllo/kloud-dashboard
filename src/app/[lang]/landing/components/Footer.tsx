import { Button } from "@/registry/new-york/ui/button";

export default function Footer(){
    return (
        <div className="h-[20em] w-full mt-64 md:mt-48 mb-20 md:mb-0 flex flex-col gap-y-5 md:gap-y-0 md:flex-row justify-center items-center">
        <div className="w-full md:w-4/12 h-full flex pr-3 flex-col">
            <h1 className="text-2xl font-bold">Kloud</h1>
            <p className="mt-5">Subscribe to our developer newsletter</p>
            <p className="text-gray-500 w-10/12">Get tips, technical guides, and best practices. Twice a month. Right in your inbox.</p>
        </div>
        <div className="w-full md:w-8/12 text-gray-400 flex h-full text-center md:text-left text-xs md:text-base">
            <div className="w-3/12 flex flex-col gap-y-3 h-full">
                <p className="">Product</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">Features</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">Enterprise</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">Copilot</p>
            </div>
            <div className="w-3/12 flex flex-col gap-y-3 h-full">
                <p className="">Platform</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">Dev Api</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">Partners</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">Education</p>
            </div>
            <div className="w-3/12 flex flex-col gap-y-3 h-full">
                <p className="">Support</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">Docs</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">Contact Github</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">Premium </p>
            </div>
            <div className="w-3/12 flex flex-col gap-y-3 h-full">
                <p className="">Company</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">About</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">Blog</p>
                <p className=" hover:underline hover:text-blue-500 decoration-blue-500 cursor-pointer">careers</p>
            </div>
        </div>
    </div>
    )
}