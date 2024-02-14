import { GrVmMaintenance } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { RiUserSettingsFill } from "react-icons/ri";

export default function AdminNavbar() {
  return (
    <div className="flex h-[100px] w-full justify-between items-center text-white bg-[#2d53d9]">
      <div className="flex h-full w-[320px] items-center justify-between ml-[30px]">
        <GrVmMaintenance className="text-[40px]" />
        <h1 className="text-[25px]">Idiomas Master Admin</h1>
      </div>
      <div className="flex h-full w-[800px]  items-center justify-evenly">
        <div className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <MdDashboard className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out">Overview</h1>
        </div>
        <div className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <FaStore className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out">Products</h1>
        </div>
        <div className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <FaUsers className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out">Users</h1>
        </div>
        <div className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <MdNotificationsActive className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out">
            Notifications
          </h1>
        </div>
        <div className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <IoMdSettings className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out">Settings</h1>
        </div>
      </div>
      <div className="flex h-full w-[200px] border-2 border-red-200 items-center justify-between mr-[20px]">
        <h1 className="text-[25px] transition-colors duration-300 ease-in-out">User12345</h1>
        <RiUserSettingsFill className="text-[40px] transition-colors duration-300 ease-in-out" />
      </div>
    </div>
  );
}
