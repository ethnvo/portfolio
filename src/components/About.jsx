import React from 'react'
import {motion} from 'framer-motion'
import { BiLogoGithub, BiLogoInstagram, BiLogoLinkedin } from 'react-icons/bi'
const About = () => {
  return (
    <div className='mx-auto max-w-6xl w-full min-h-screen p-4 md:p-8 lg:p-28 flex items-center justify-center' id='about'>
        <motion.div
            initial = {{opacity:0, y:50}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.8, delay:0.2}}
            className='flex flex-col-reverse items-center justify-center md:flex md:flex-row gap-8 md:gap-16 lg:gap-24'
            >
                <motion.div
                 initial = {{opacity:0, x:50}}
                 whileInView={{opacity:1, y:0}}
                 viewport={{once:true}}
                 transition={{duration:0.8, delay:0.4}}
                 className = 'flex flex-col items-center md:items-start justify-center gap-3'
                >
                    <span className='px-2 py-1 text-white bg-zinc-800 rounded-full text-xs md:text-s'> 
                        Open to Work
                    </span>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl font-semibold text-center md:text-left bg-gradient-to-b to-pink-300 via-pink-400 from-rose-500 text-transparent bg-clip-text'>
                        Ethan Vo
                    </h1>

                    <h3 className='text-xl md:text-2xl lg:text-3xl font-light text-center md:text-left bg-gradient-to-b to-pink-600 via-pink-400 from-rose-400 text-transparent bg-clip-text'>
                        Fullstack Engineer
                    </h3>
                    <p className='text-sm text-slate-400  text-center md:text-left text-pretty'> 
                    I’m Ethan Vo, a second-year Double Major in Business Information Management and Software Engineering at UC Irvine, passionate about building impactful technology that bridges business and engineering. I’m driven, competitive, and thrive in high-pressure environments, whether it’s leading development teams or competing in hackathons to win. Currently, I’m focused on sharpening my technical skills as a software engineer, with the long-term goal of transitioning into product management to lead teams in building innovative, user-driven solutions.
                    </p>
                    <div className='flex  gap-5 mt-3'>
                        <a href="https://github.com/ethnvo/"
                                target="_blank"
                                rel="noopener noreferrer">
                        <BiLogoGithub className="text-2xl md:text-3xl text-white cursor-pointer hover:scale-110 hover:text-rose-800 hover:rotate-12 transition-all duration-300 ease-in-out "></BiLogoGithub>
                        </a>
                        <a href="https://www.linkedin.com/in/ethnvo/"
                            target="_blank"
                            rel="noopener noreferrer">
                        <BiLogoLinkedin className="text-2xl md:text-3xl text-white cursor-pointer hover:scale-110 hover:text-rose-800 hover:rotate-12 transition-all duration-300 ease-in-out "></BiLogoLinkedin>

                        </a>

                        <a href="https://www.instagram.com/ethyvo/"
                            target="_blank"
                            rel="noopener noreferrer"> 
                        <BiLogoInstagram className="text-2xl md:text-3xl text-white cursor-pointer hover:scale-110 hover:text-rose-800 hover:rotate-12 transition-all duration-300 ease-in-out "></BiLogoInstagram>
                        </a>
                    </div>
                </motion.div>

                <img 
                    src='profileimg2.jpg' 
                    className='w-[300px] md:w-[400px] rounded-full hover:shadow-2xl hover:shadow-pink-500 hover:scale-105 hover:rotate-2 transition-all duration-500' 
                    alt='Profile Picture of Ethan Vo' 
                />
        </motion.div>
    </div>
  )
}

export default About