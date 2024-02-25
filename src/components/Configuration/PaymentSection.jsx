import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { userPayments } from "../Admin/userData";
import PaymentCard from "./paymentCard";
import { useTranslation } from "react-i18next";

const PaymentSection = () => {
  const [userData] = useLocalStorage("userData", {});
  const [userPayment, setUserPayment] = useState([]);
  const { t , i18n} = useTranslation()

  useEffect(() => {
    const fecthPayment = async () => {
      const response = await userPayments(userData._id);

      if (response.data) {
        setUserPayment(response.data);
      }
    };

    fecthPayment();
  }, [userData._id]);


  return (
    <div className=" flex-rows w-full h-full  grid grid-cols-1 gap-[10px] grid-rows-auto overflow-hidden items-center justify-center p-[10px] overflow-y-scroll">
      {userPayment &&
        userPayment.map((c, index) => (
          <div key={index} className="flex item-center justify-center">
            <PaymentCard
            id = {c._id}
            amount = {c.Amount}
            date = {c.date}
            course = {c.course_payment}
            status={c.status}
            />
          </div>
        ))}
    </div>
  );
};

export default PaymentSection;
