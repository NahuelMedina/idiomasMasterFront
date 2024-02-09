import { useSelector } from "react-redux";
import { SearchBar } from "../SearchBar/SearchBar";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import { landing_string } from "../Utils/landing_string";
import Landing_card from "../Landing_card/Landing_card";
import { card_landing_data } from "../Utils/landing_cards";
import Landing_reviews from "../Landing_reviews/Landing_reviews";
import card_landing_reviews from "../Utils/landing_reviews";

export const Landing = () => {
 
  const search = useSelector((state) => state.coursesName);
  const [num, setNum] = useState(0);

  console.log(card_landing_reviews)

  useEffect(() => {
    function set_landing() {
      if (num < 4) {
        setNum(num + 1);
      } else if (num === 4) {
        setNum(0);
      }
    }

    setTimeout(set_landing, 5000);
  }, [num]);


  return (
    <div className=" w-screen h-screen bg-black text-white">
             <div className="flex justify-end items-center w-screen h-[80px] bg-[#1E68AD]">
      
            <SearchBar></SearchBar>


           
          </div>
     
      <div className="flex flex-row justify-end items-center w-screen h-[600px] relative bg-white">
        <div className=" flex w-full h-full absolute left-0 z-20 bg-gradient-to-r from-black via-white/10 to-white/0">
          <div className="h-full w-[950px] items-center justify-center flex flex-col">
            <p className="text-[40px] text-white border-b-4 border-white">{`${landing_string[num].title}`}</p>
            <p className={`${landing_string[num].color} `}>
              {" "}
              {`${landing_string[num].word}`}
            </p>
          </div>
        </div>

        <div className="flex w-full h-full  absolute z-0">
          <img
            src={`img/Rail_0${num}.png`}
            class="object-cover h-full w-full"
            alt="Imagen"
          />
        </div>
      </div>
      <div
        id="landing_descripton"
        className="w-full h-[420px] relative flex items-center justify-evenly bg-white"
      >
        {card_landing_data.map((element, index) => (
          <Landing_card
            key={index}
            img={element.img}
            title={element.title}
            description={element.description}
          />
        ))}
      </div>
      <div className="flex flex-row items-center justify-evenly w-screen h-[600px] relative bg-[#ff5555]">
      {card_landing_reviews.map((element, index) => (
        <Landing_reviews
        img={element.img}
        key={index}
        review={element.review}
        name={element.name}
        location={element.location}
        />
        ))}
      </div>

    </div>
  );
};
