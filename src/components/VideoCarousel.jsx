import { useGSAP } from "@gsap/react"
import gsap from "gsap/gsap-core"
import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import { pauseImg, playImg, replayImg } from "../Utils"

const VideoCarousel = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video  , setVideo] = useState({
        isEnd : false  , 
        startPlay : false,
        videoID :0 ,
        isLastVideo : false ,
        isPlaying : false
    })
    const [loadedData , setLoadData ] = useState([])
    const {isEnd  , isLastVideo  , startPlay , isPlaying , videoID } = video;


    useGSAP(()=>{
        gsap.to("#slider", {
            transform : `translateX(${-100 * videoID}%)`,
            duration : 2,
            ease : "power2.inOut"
        })
        gsap.to("#video" , {
            scrollTrigger : {
                trigger :"#video",
                toggleActions :"restart none none none",
            },
            onComplete : ()=>{
                setVideo((prev) =>({...prev ,startPlay : true , isPlaying : true }))
            }
        })

    } , [isEnd , videoID])


    useEffect(()=>{
        let currentProgress = 0 ;
        let span = videoSpanRef.current

        if(span[videoID]){
            // animate the progress of the video
            let anim  = gsap.to(span[videoID] , {
                onUpdate :()=>{
                        const progress = Math.ceil(anim.progress() *100)
                        if(progress !== currentProgress ){
                            currentProgress = progress
                            gsap.to(videoDivRef.current[videoID] , {
                                width : window.innerWidth < 1200 ? "10vw"  : "4vw"
                            })
                            
                            gsap.to(span[videoID] , {
                                width : `${currentProgress}%`,
                                backgroundColor : "white"
                            })
                        }
                },
                onComplete : ()=>{
                    if(isPlaying){
                        gsap.to(videoDivRef.current[videoID] , {
                            width : "12px"
                        })

                        gsap.to(span[videoID] , {
                            backgroundColor : "#afafaf"

                        })
                    }
                }
            })

            if (videoID ===0 ){
                anim.restart()
            }
           
            const animUpdate = ()=>{
                anim.progress(
                    //  we are getting every video and divide it on it's time
                    videoRef.current[videoID].currentTime /
                     hightlightsSlides[videoID].videoDuration
                )
            }

            if(isPlaying){
                gsap.ticker.add(animUpdate)
            }else{
                gsap.ticker.remove(animUpdate)
            }
        }
    },[videoID , startPlay ,isPlaying])
    
    
    useEffect(()=>{
        // console.log(videoDivRef.current[videoID]);
        if(loadedData.length > 3){
            if(!isPlaying){
                videoRef.current[videoID].pause()
            } else{
                startPlay && videoRef.current[videoID].play()
            }
        }
    },[startPlay , videoID , isPlaying , loadedData])

    const handleLoadedMetaData = (i , e) =>{
        setLoadData((prev)=>([...prev , e ]))
        // console.log(e , {loadedData});
    }

    
    const handleProcess = (type, i) => {
        switch (type) {
        case "video-end":
            setVideo((pre) => ({ ...pre, isEnd: true, videoID: i + 1 }));
            break;
            
            case "video-last":
            setVideo((pre) => ({ ...pre, isLastVideo: true }));
            break;

        case "video-reset":
            setVideo((pre) => ({ ...pre, videoID: 0, isLastVideo: false }));
            break;

        case "pause":
            setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
            break;

        case "play":
            setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
            break;

        default:
            return video;
        }
    };

    return (
        <>
            <div className="flex items-center">

                {hightlightsSlides.map((slide , rowID) =>{
                    return (
                        <div key={rowID} id="slider" className="sm:pr-20 pr-10">
                            <div className="video-carousel_container">
                                <div className="w-full h-full center-center overflow-hidden rounded-3xl bg-black">
                                    <video 
                                     muted id="video" playsInline={true} preload="auto"
                                     ref={(el)=>videoRef.current[rowID] = el}
                                     className={`${slide.id === 2 && 'translate-x-44' } pointer-events-none `}
                                     
                                     onPlay={()=>setVideo(prev=>({...prev , isPlaying : true}))}
                                     onLoadedMetadata={(e)=>{handleLoadedMetaData(rowID , e)}}
                                     onEnded={() =>
                                        rowID !== 3
                                        ? handleProcess("video-end", rowID)
                                        : handleProcess("video-last")
                                    }
                                    >
                                         <source src={slide.video} type="video/mp4" />
                                    </video>
                                </div>

                                <div className="absolute top-12 left-[5%] z-10">
                                    {slide.textLists.map((text , rowID) =>{
                                        return (
                                            <p key={rowID} className="md:text-2xl text-2xl font-medium">
                                                {text}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>


            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {
                        videoRef.current.map((_,rowId)=>(
                            <span key={rowId} 
                            className="mx-2 w-3 h-3 bg-gray-400 rounded-full relative cursor-pointer"
                            ref={(el)=>videoDivRef.current[rowId] = el}
                            >
                                <span className="absolute h-full w-full rounded-full"
                                ref={(el)=>videoSpanRef.current[rowId] = el}
                                ></span>
                            </span>
                        ))
                    }
                </div>

                <button className="control-btn">
                        <img
                            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                            onClick={
                            isLastVideo
                                ? () => handleProcess("video-reset")
                                : !isPlaying
                                ? () => handleProcess("play")
                                : () => handleProcess("pause")
                            }
                        />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel
