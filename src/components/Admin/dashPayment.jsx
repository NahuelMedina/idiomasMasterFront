
import { useEffect, useState } from "react";
import { GrMoney } from "react-icons/gr";

export default function DashPayment({data}){

    const[activeProduct, setActiveProducts] = useState([]);
    const[InactiveProduct, setInactiveProducts] = useState([]);

    useEffect(() => {

        const active = data.filter((element) =>  element.status === "Approved")
        setActiveProducts(active)

        const inactive = active.reduce((acc, element) => {
            if (element.Amount !== undefined) {
                return acc + element.Amount;
            } else {
                return acc;
            }
        }, 0);

        setInactiveProducts(inactive)


    }, [data])

    return(
        <div className="bg-blue-200 h-[90%] w-[90%] rounded-[10px] bg-gradient-to-r from-pink-500 to-purple-500 flex flex-col">
          <div className="w-full h-[30%]  flex flex-row items-center pl-[50px]">
          <GrMoney className="text-white text-[40px] mr-[20px]" />
            <h1 className="text-white text-[40px]">{`Payments`}</h1>
          </div>
         <div className="w-full h-[65%] flex flex-row">
            <div className="h-full w-[50%]  border-r-[1px] border-white">
                <div className="w-full h-[20%]  flex items-center justify-center flex-col">
                    <h1 className="text-white text-[20px]">Total Payments</h1>
                </div>
                <div className="w-full h-[70%]  flex items-center justify-center flex-col">
                    <h1 className="text-white text-[90px]">{`$ ${InactiveProduct}`}</h1>
                </div>
            </div>
            <div className="h-full w-[50%]  ">
            <div className="w-full h-[20%]  flex items-center justify-center">
                    <h1 className="text-white text-[20px]">Active Payments</h1>
                </div>
                <div className="w-full h-[70%]  flex items-center justify-center flex-col">
                    <h1 className="text-white text-[100px]">{`${activeProduct.length}`}</h1>
                </div>
            </div>

         </div>
        
        </div>
    )
}