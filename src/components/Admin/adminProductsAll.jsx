import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { productData } from "./userData";

export default function AdminProductsAll() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await productData();

      if (response) {
        setData(response.data);
      }
    };

    dataFetch();
  }, []);

  return (
    <div className="w-full h-full flex flex-col border-[#151139] border-[1px]">
      <div className="w-full h-[40px]  flex flex-row">
        <div className="h-full w-[5%] border-[1px] bg-[#151139] border-[#151139] flex items-center justify-center text-white">
          <h1>Num</h1>
        </div>
        <div className="h-full w-[22%] border-[1px] bg-[#151139] border-[#151139] flex items-center justify-center text-white">
          <h1>Product Id</h1>
        </div>
        <div className="h-full w-[10%] border-[1px] bg-[#151139] border-[#151139] flex items-center justify-center text-white">
          <h1>Updated Date</h1>
        </div>
        <div className="h-full w-[16%] border-[1px] bg-[#151139] border-[#151139] flex items-center justify-center text-white">
          <h1>Type</h1>
        </div>
        <div className="h-full w-[10%] border-[1px] bg-[#151139] border-[#151139] flex items-center justify-center text-white">
          <h1>Cost</h1>
        </div>
        <div className="h-full w-[16%] border-[1px] bg-[#151139] border-[#151139] flex items-center justify-center text-white">
          <h1>Status</h1>
        </div>
        <div className="h-full w-[16%] border-[1px] bg-[#151139] border-[#151139] flex items-center justify-center text-white">
          <h1>Start Date</h1>
        </div>
        <div className="h-full w-[16%] border-[1px] bg-[#151139] border-[#151139] flex items-center justify-center text-white">
          <h1>Finish Date</h1>
        </div>
      </div>
      <div className="bg-[#282a54] w-full h-[96%] max-h-[637px] overflow-y-scroll ">
        {data &&
          data.length > 0 &&
          data.map((element, index) => (
            <ProductCard
              key={element._id}
              index={index + 1}
              id={element._id}
              type={element.language}
              cost={element.price}
              status={element.status}
              date={element.start_time}
              finish={element.finish_time}
              updated={element.updatedAt}
            />
          ))}
      </div>
    </div>
  );
}
