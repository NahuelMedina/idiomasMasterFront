import React from "react";

export const SearchBar = ()=>{
    return (
        <div className="divSearch">
            <input id='search' type='text' className="searchBar" ></input>
            <button type='submit' >🔍</button>
        </div>
    )
}