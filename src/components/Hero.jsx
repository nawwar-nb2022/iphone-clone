import {heroVideo ,smallHeroVideo} from "../Utils/index"

import {ScrollTrigger } from "gsap/all"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"


import { useEffect, useState } from "react"



const Hero = () => {
    gsap.registerPlugin(ScrollTrigger)

    useGSAP(()=>{
        gsap.to("#hero" , {
            opacity : 1,
            delay : 1.5 ,
        })

        gsap.to("#cta" , {
            y: -50,
            opacity : 1,
            delay: 1.5,

        })

    },[])

    const [videoSrc , setSrc ] = useState(
        window.innerWidth < 760 ? smallHeroVideo : heroVideo
    )

    const handleVideoSrcSet = ()=>{
        if(window.innerWidth < 760){
            setSrc(smallHeroVideo)
        }else {
            setSrc(heroVideo)
        }
    }


    useEffect(()=>{
        window.addEventListener("resize" , handleVideoSrcSet)
        
        return ()=>{
            window.removeEventListener("resize" , handleVideoSrcSet)
        }

    },[])

    return (
        <section className="w-full nav-height bg-black relative">
            
                <div className="h-5/6 w-full flex-center flex-col" >
                    <p className="hero-title"  id="hero">
                        iphone 15 pro
                    </p>

                    <div className="md:w-10/12 w-9/12">
                        <video loop muted autoPlay controls={false} playsInline={true}
                        key={videoSrc}
                        className="pointer-events-none">
                            <source src={videoSrc} type="video/mp4"/>
                        </video>
                    </div>
                </div>

                <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
                    <a href="#highlight" className="btn">Buy</a>
                    <p className="font-normal text-xl">from : 199 per month or 999</p>
                </div>

        </section>
    )
}

export default Hero
