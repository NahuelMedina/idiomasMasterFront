import { useState } from "react";
import AdminProductsAll from "./adminProductsAll";
import AdminAddProduct from "./adminAddProduct";
import AdminSettingProduct from "./adminSettingProduct";

export default function AdminProducts() {
  const [options, setOptions] = useState({
    main: true,
    add: false,
    setting: false,
  });

  const handleClick = (element) => {
    const updatedOptions = {
      main: false,
      add: false,
      setting: false,
      [element]: true,
    };
    setOptions(updatedOptions);
  };

  return (
    <div className="h-full w-full bg-[#f1f1f1] flex items-center justify-center">
      <div className="h-[85%] w-[85%] flex flex-col">
        <div className="w-full h-[8%] flex items-center pl-[40px] justify-between">
          <div className="h-full w-[20%]">
            <h1 className="text-gray-800 text-[30px]">Products</h1>
          </div>
          <div className="bg-green-200 w-[500px] h-full flex flex-row">
            <div
              className={`h-full w-[33%] flex items-center justify-center cursor-pointer group ${
                options.main ? "bg-[#151139]" : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={() => handleClick("main")}
            >
              <h1
                className={`text-gray-800 text-[18px] cursor-pointer ${
                  options.main ? "text-white" : "text-black"
                }`}
              >
                Your Products
              </h1>
            </div>

            <div
              className={`h-full w-[33%] flex items-center justify-center cursor-pointer group ${
                options.add ? "bg-[#151139]" : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={() => handleClick("add")}
            >
              <h1
                className={`text-gray-800 text-[18px] cursor-pointer ${
                  options.add ? "text-white" : "text-black"
                }`}
              >
                Add Product
              </h1>
            </div>
            <div
              className={`h-full w-[34%] flex items-center justify-center cursor-pointer group ${
                options.setting ? "bg-[#151139]" : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={() => handleClick("setting")}
            >
              <h1
                className={`text-gray-800 text-[18px] cursor-pointer ${
                  options.setting ? "text-white" : "text-black"
                }`}
              >
                Settings Product
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[90%] bg-green-200">
          {options.main ? <AdminProductsAll /> : null}
          {options.add ? <AdminAddProduct /> : null}
          {options.setting ? <AdminSettingProduct /> : null}
        </div>
      </div>
    </div>
  );
}
