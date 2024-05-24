import React from 'react';
import heroImg from '../assets/hero.png'

function Hero() {
    return (
        <div>
            <img src={heroImg} className={'w-full max-h-[600px] object-cover'} alt={'hero image of burger'}/>
        </div>
    );
}

export default Hero;