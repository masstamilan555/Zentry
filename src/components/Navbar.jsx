import { useEffect, useRef, useState } from "react"
import Button from "./Button"
import { TiLocationArrow } from "react-icons/ti"
import { useWindowScroll } from "react-use"
import gsap from "gsap"

const navItems = ['Nexus','Valut','Prologue','About','Contact']

const Navbar = () => {
    const navbarRef = useRef(null)
    const audioElementRef =useRef(null)
    const {y:currentScrollY}=useWindowScroll()

    const [lastScrollY,setLastScrollY]=useState(0)
    const [isNavVisible ,setIsNavVisible] =useState(true)
    const [isAudioplaying,setIsAudioplaying] =useState(false)
    const [isIndicatorActive,setIsIndicatorActive] =useState(false)
    const toggleAudioIndicator =()=>{
        setIsAudioplaying((prev)=>!prev)
        setIsIndicatorActive((prev)=>!prev)

    }

    useEffect(()=>{
        if(currentScrollY ===0){
            setIsNavVisible(true)
            navbarRef.current.classList.remove('floating-nav')
        }else if(currentScrollY >lastScrollY){
            setIsNavVisible(false)
            navbarRef.current.classList.add('floating-nav')
        }else if(currentScrollY < lastScrollY){
            setIsNavVisible(true)
            navbarRef.current.classList.add('floating-nav')
        }
        setLastScrollY(currentScrollY)
    },[currentScrollY,lastScrollY])

    useEffect(()=>{
        gsap.to(navbarRef.current,{
            y:isNavVisible ?0:-100,
            opacity:isNavVisible?1:0,
            duration:0.2
        })
    })

    useEffect(()=>{
        if(isAudioplaying){
            audioElementRef.current.play()
        }else{
            audioElementRef.current.pause()
        }
    },[isAudioplaying])

    return (
        <div ref={navbarRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7 ">
                        <img className="w-10" src="/img/logo.png" alt="logo" />
                        <Button
                            id="product-button"
                            title="Products"
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>
                    <div className="flex h-full items-center ">
                        <div className="hidden md:block">
                            {navItems.map((item)=>(
                                <a className="nav-hover-btn" key={item} href={`#${item.toLowerCase()}`}>{item}</a>
                            ))}
                        </div>
                        <button className="ml-10 flex items-center space-x-0.5 " onClick={toggleAudioIndicator}>
                            <audio src="/audio/loop.mp3" ref={audioElementRef} className="hidden" loop />
                            {[1,2,3,4].map((bar)=>(
                                <div key={bar} className={`indicator-line bg-green-600 ${isIndicatorActive?'active':''}`} style={{animationDelay:`${bar *0.1}s`}}></div>
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
