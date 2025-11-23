import { motion } from "framer-motion";
import {
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTiktok,
} from "react-icons/bi";

const About = () => {
  return (
    <div
      id="about"
      className="
        w-full
        bg-transparent
        px-4            /* small horizontal padding on mobile */
        py-32           /* vertical padding top/bottom */
        flex
        flex-col
        items-center    /* center everything on mobile */
        text-center     /* center text on mobile */
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="
          w-full
          
          flex-col
          items-center
          gap-8

          /* At md and above, switch to a row and cap at a wider container */
          md:flex-row
          md:items-start
          md:text-left
          md:max-w-6xl     /* now the flex container can grow up to 6xl on desktop */
          md:px-8          /* add some horizontal padding on larger screens */
        "
      >
        {/* Image wrapper */}
        <div className="flex justify-center md:justify-start">
          <img
            src="headshot.png"
            alt="Profile Picture of Ethan Vo"
            className="
              w-48
              h-48
              md:w-[360px]        /* larger on md+ */
              md:h-[360px]
              rounded-full  /* keep as a circle */
              object-cover
              hover:shadow-2xl
              hover:shadow-pink-500
              hover:scale-105
              hover:rotate-2
              transition-all
              duration-500
            "
          />
        </div>

        {/* Text block */}
        <div className="flex flex-col items-center gap-4 md:items-start md:pl-12">
          <span
            className="
            px-2
            py-1
            text-white
            bg-zinc-800
            rounded-full
            text-xs
            md:text-sm
          "
          >
            Open to Work
          </span>

          <h1
            className="
            text-4xl
            md:text-5xl
            lg:text-6xl
            font-semibold
            bg-gradient-to-b
            from-blue-500
            via-pink-300
            to-orange-200
            text-transparent
            bg-clip-text
          "
          >
            Ethan Vo
          </h1>

          <h2
            className="
            text-lg
            md:text-xl
            lg:text-2xl
            font-light
            bg-gradient-to-b
            from-blue-500
            via-pink-300
            to-orange-200
            text-transparent
            bg-clip-text
          "
          >
            Fullstack Engineer
          </h2>

          <p className="text-sm text-white font-light max-w-md">
            Hi! I’m Ethan Vo, a third-year Business Information Management and
            Software Engineering major at UC Irvine.
            <br />
            <br />I thrive in high-pressure positions, whether it be leading
            project teams, competing in hackathons or directing my own startups.
            I'm always looking to level up my skills not only as a Software
            Developer, but also as a leader and a founder who turns ideas into
            impact.
          </p>

          <div className="flex gap-6 py-4">
            <a
              href="https://github.com/ethnvo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoGithub
                className="
                text-2xl
                md:text-3xl
                text-white
                cursor-pointer
                transition-all
                duration-300
                ease-in-out
                hover:scale-125
                hover:rotate-6
                hover:text-[#02040A]
              "
              />
            </a>

            <a
              href="https://www.linkedin.com/in/ethnvo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoLinkedin
                className="
                text-2xl
                md:text-3xl
                text-white
                cursor-pointer
                transition-all
                duration-300
                ease-in-out
                hover:scale-125
                hover:rotate-6
                hover:text-[#0A66C2]
              "
              />
            </a>

            <a
              href="https://www.instagram.com/ethyvo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoInstagram
                className="
                text-2xl
                md:text-3xl
                text-white
                cursor-pointer
                transition-all
                duration-300
                ease-in-out
                hover:scale-125
                hover:rotate-6
                hover:text-[#e1306c]
              "
              />
            </a>

            <a
              href="https://www.tiktok.com/@lockinethan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoTiktok
                className="
                text-2xl
                md:text-3xl
                text-white
                cursor-pointer
                transition-all
                duration-300
                ease-in-out
                hover:scale-125
                hover:rotate-6
                hover:text-black
              "
              />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/Resume_Ethan_Vo_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
              inline-block
              bg-gradient-to-t
              to-rose-500
              via-purple-400
              from-rose-500
              bg-[length:400%_400%]
              bg-[position:0%_10%]
              hover:bg-[position:50%_100%]
              p-[2px]
              rounded-lg
              transition-[background-position]
              duration-500
              ease-in-out
            "
            >
              <div
                className="
                backdrop-blur-md
                text-white
                drop-shadow-md
                px-6
                py-3
                rounded-lg
                text-base
                font-medium
              "
              >
                Explore my CV
              </div>
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ekvo@uci.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-6
                py-3
                border
                border-pink-300
                text-pink-300
                rounded-lg
                hover:bg-pink-600
                hover:border-transparent
                hover:text-white
                transition-all
                text-base
                font-medium
              "
            >
              Contact Me
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
