import React from 'react';
import {Link} from "react-router-dom";


function Footer() {
    return (
        <div className={'bg-orange-500 py-6'}>
            <div className={'container mx-auto flex flex-col md:flex-row justify-between items-center'}>
                <Link to={'/'} className={'text-3xl font-bold text-white'}>
                    MernEats
                </Link>
                <span className={'text-white font-bold tracking-tight flex gap-2'}>
                    <span>Privacy Policy</span>
                    <span>Terms and Conditions</span>
                </span>
            </div>

        </div>

    );
}

export default Footer;