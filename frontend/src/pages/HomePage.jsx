import React from 'react';
import SearchBar from "@/components/SearchBar.jsx";
import {useNavigate} from "react-router-dom";


function HomePage() {
    const navigate = useNavigate()
    function handelOnSubmit(search){
        navigate(`/search/${search.searchQuery}`)
    }
    return (
            <div className={'flex flex-col gap-12'}>
                <div className={'md:px-36 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'}>
                    <h1 className={'text-5xl font-bold tracking-tight text-orange-500'}>
                        Tuck into a takeaway today
                    </h1>
                    <span className={'text-xl'}>
                        Food is just a click away!
                    </span>
                    <SearchBar placeholder={'Search by City or Town'} onSubmit={handelOnSubmit}/>
                </div>
            </div>

    );
}

export default HomePage;