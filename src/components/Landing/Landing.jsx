import { useSelector, useDispatch } from "react-redux";
import { SearchBar } from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { landing_string } from "../Utils/landing_string";
import Landing_card from "../Landing_card/Landing_card";
import { card_landing_data } from "../Utils/landing_cards";
import Landing_reviews from "../Landing_reviews/Landing_reviews";
import card_landing_reviews from "../Utils/landing_reviews";
import { postThirdPartyUser, setUserdata } from "../../redux/action/actions"; // Importa la acción adecuada
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { getGoogleUser } from "../Admin/userData";
import { useTypewriter } from "react-simple-typewriter";

export const Landing = () => {
  const [num, setNum] = useState(1);
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const [userData, setUserDataLocally] = useLocalStorage("userData", {
    email: "",
    password: "",
  });

  const [typeEffect] = useTypewriter({
    words: [landing_string[num].word],
    loop: {},
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated && user && user.email) {
          const response = await getGoogleUser({
            email: user.email,
            name: user.given_name,
            lastname: user.family_name,
            image: user.picture,
          });

          if (response && response.data) {
            const updatedUserData = {
              ...userData,
              ...response.data,
              isAuthenticated: true,
            };

            setUserDataLocally(updatedUserData);
            dispatch(setUserdata(updatedUserData));
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated, user, setUserDataLocally, dispatch]);
  useEffect(() => {
    if (typeEffect.length === 0 && num === 4) {
      setNum(0);
    }
    if (typeEffect.length === 0 && num <= 3) {
      setNum(num + 1);
    }
  }, [typeEffect]);

  // useEffect(() => {
  //   function set_landing() {
  //     if (num === 4) {
  //       setNum(0);
  //     }
  //     if (typeEffect.length === 0 && num === 0) {
  //       setNum(num + 1);
  //     }
  //   }
  //   set_landing();
  // }, [num]);
  return (
    <div className="w-full h-[150px] bg-black text-white">
      <div className="flex justify-end items-end w-full h-full bg-[#1E68AD]">
        <div className="mr-5 mb-3">
          <SearchBar></SearchBar>
        </div>
      </div>

      <div className="flex  col justify-end items-center w-full h-[600px] relative bg-white">
        <div className=" flex w-full h-full absolute  bg-gradient-to-r from-black via-white/10 to-white/0 ">
          <div className="h-full w-full items-start pl-[30px] justify-center flex flex-col">
            <p className="text-[40px] text-white font-semibold border-b-4 border-white">{`${landing_string[num].title}`}</p>
            <p className={`${landing_string[num].color} `}>
              <div className="h-[200px]">
                <span className={landing_string[num].color}>{typeEffect}</span>
              </div>
            </p>
          </div>
        </div>

        <div className="flex w-full h-full  ">
          <img
            src={`img/Rail_0${num}.png`}
            className="object-cover "
            alt="Imagen"
          />
        </div>
      </div>
      <div
        id="landing_descripton"
        className="w-full h-[420px] relative flex items-center justify-evenly bg-white"
      >
        <div
          id="main_landing_card"
          className=" flex justify-between items-center h-full w-full   "
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
      </div>
      {/* <marquee direction="left" behavior="alternate" scrollamount="5" className="text-black">
        <div className="w-full h-[50px] bg-white text-black">
        Texto en movimiento...
        </div>
        
        
        </marquee> */}
      <div className="flex flex-row items-center justify-evenly w-full h-[600px] relative bg-[#ff5555]">
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
