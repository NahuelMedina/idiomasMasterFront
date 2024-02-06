import React from "react";
import "../../Styles/styles.css"
import { SearchBar } from "../SearchBar/SearchBar";


export const Landing = ()=>{

    return (
        <div className="landing"  >


            <div className="conteinerLanding">
                <div className="fraseLanding">
                <p className="pTop">Es divertido hacer</p>
                <p className="pBottom">LO IMPOSIBLE</p>
                <SearchBar></SearchBar>
            </div>

            <div>
                <img  className="imgLanding" src="src\assets\fotos\ingelsperson.jpg"></img>
            </div>
            </div>
           
        </div>
    )
}

