import { useGSAP } from "@gsap/react"
import gsap from "gsap/gsap-core"
import { rightImg, watchImg } from "../Utils"
import VideoCarousel from "./VideoCarousel"
import {ScrollTrigger} from "gsap/all"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)


const HighLight = () => {
    const containerRef = useRef()
    useGSAP(()=>{

        gsap.to("#title" , {
            opacity:1, 
            y : 0,
            scrollTrigger : {
                trigger : containerRef.current,
                toggleActions : "play pause restart reset"
            }
        })
        gsap.to(".link" , {
            opacity:1, 
            y : 0,
            duration : 1,
            stagger : .25,
            scrollTrigger : {
                trigger : containerRef.current,
                toggleActions : "play pause restart reset"
            }
        })
    },{scope : containerRef.current})
    return (
        <section id="highlight"
        className="w-screen overflow-hidden h-full common-padding bg-zinc"
        >

            <div className="screen-max-width">
                <div className="mp-12 w-full md:flex items-end justify-between mb-10" ref={containerRef}>
                    <h1 id="title" className="section-heading">
                        Get the Highlight
                    </h1>
                    <div className="flex fex-wrap items-end gap-5">
                        <p className="link"> watch the film
                            <img src={watchImg} alt="watch" className="ml-2"/>
                        </p>
                        <p className="link"> watch the event
                            <img src={rightImg} alt="right" className="ml-2"/>
                        </p>
                    </div>
                </div>

                <VideoCarousel/>
            </div>
            
        </section>
    )
}

export default HighLight
