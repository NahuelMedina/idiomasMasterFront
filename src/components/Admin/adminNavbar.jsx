import { GrVmMaintenance } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { RiUserSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState } from "react";
import AdminOptions from "./adminOptions";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";



export default function AdminNavbar() {
  const [userData] = useLocalStorage("userData", {});
  const [options, setOptions] = useState(false)
  

  console.log(userData)

  const handleOptions = () => {

    if(!options){
      setOptions(true)
    } else {
      setOptions(false)
    }
  }

  return (
    <div className="flex h-[80px] w-full justify-between items-center text-white bg-[#2d53d9] relative " >
      <div className="flex h-full w-[320px] items-center justify-between ml-[30px]">
        <GrVmMaintenance className="text-[40px]" />
        <h1 className="text-[25px]">Idiomas Master Admin</h1>
      </div>
      <div className="flex h-full w-[800px]  items-center justify-evenly">
        <Link to ="/admindashboard" className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <MdDashboard className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out cursor-pointer">Overview</h1>
        </Link>
        <Link to="/admindashboard/products" className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <FaStore className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out cursor-pointer">Products</h1>
        </Link>
        <Link to="/admindashboard/users" className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <FaUsers className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out cursor-pointer">Users</h1>
        </Link>
        <Link to="/admindashboard/notifications"  className="relative flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <MdNotificationsActive className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out cursor-pointer">
            Notifications
          </h1>

        </Link>
        <Link to="/admindashboard/settings" className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <IoMdSettings className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out cursor-pointer">Settings</h1>
        </Link>
      </div>
      <div className="flex h-full w-[270px] items-center justify-between mr-[20px] cursor-pointer" onClick={handleOptions}>
        <h1 className="text-[20px] transition-colors duration-300 ease-in-out">{userData && userData.email ? `${userData.email}` : null}</h1>
        <RiUserSettingsFill className="text-[40px] transition-colors duration-300 ease-in-out " />
      </div>
      {options?
    (<AdminOptions/>):null  
    }
    </div>
  );
}
