import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function AboutCard() {
  return (
    <div className="h-[450px] bg-white">
      <div className="h-[100%] w-[95%] bg-white rounded-[10px] overflow-hidden border-[1px] border-gray-300 shadow-sm shadow-black/10 ">
        <div className="w-full h-[40%] bg-sky-600 relative">
          <div className="w-[210px] h-[210px] bg-white rounded-[200px] absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-[10px] border-sky-600"></div>
          <div className="w-[56px] h-[170px] grid grid-rows-3  absolute top-[10px] right-[5px] ">
            <div className="w-full h-full flex items-center justify-center ">
            <SiGithub className="text-[40px] text-gray-100 hover:cursor-pointer hover:text-yellow-400" />
            </div>
            <div className="w-full h-full flex items-center justify-center ">
            <FaLinkedin className="text-[40px] text-gray-100 hover:cursor-pointer hover:text-yellow-400" />
            </div>
            <div className="w-full h-full flex items-center justify-center ">
            <MdEmail  className="text-[40px] text-gray-100 hover:cursor-pointer hover:text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="w-full h-[60%] relative">
          <div className="w-full h-[25%]  mt-[70px] flex items-center justify-center">
            <h1 className="text-[40px] text-gray-700"> Nombre</h1>
          </div>
          <div className="w-full h-[20%] flex items-center justify-center">
            <h1 className="text-[25px] text-gray-500">Full Stack Developer</h1>
          </div>
          <div className="w-full h-[20%]  flex items-center justify-center">
            <h1 className="text-[25px] text-gray-500">Buenos, Aires</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
