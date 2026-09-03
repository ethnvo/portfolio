import { motion } from "framer-motion";
import {
  BiLogoGithub,
  BiLogoInstagram, //legacy stub
  BiLogoLinkedin,
  BiLogoTiktok, //legacy stub
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
              hover:shadow-brand/40
              hover:scale-105
              hover:rotate-2
              transition-all
              duration-500
            "
          />
        </div>

        {/* Text block */}
        <div className="flex flex-1 flex-col items-center gap-4 md:items-start md:pl-12">
          <h1
            className="
            font-display
            text-5xl
            md:text-6xl
            lg:text-7xl
            font-semibold
            tracking-tight
            text-ink
          "
          >
            Ethan Vo
          </h1>

          <h2
            className="
            text-lg
            md:text-xl
            lg:text-2xl
            font-medium
            text-brand
          "
          >
            Fullstack &amp; Mobile Engineer
          </h2>

          <p className="text-sm text-ink-soft font-light max-w-2xl leading-relaxed">
            Hi! I’m Ethan Vo, a fourth-year Software Engineering major at UC
            Irvine.
            <br />
            <br />I thrive under pressure, whether I'm leading teams, competing
            in hackathons, or building startups. Always trying to reach the next
            level as an engineer, a leader, and a founder who turns ideas into
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
                hover:text-brand
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
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/Ethan Vo Resume F.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                px-6
                py-3
                rounded-full
                bg-brand
                text-white
                text-base
                font-semibold
                lowercase
                tracking-wide
                hover:bg-white
                hover:text-brand
                hover:scale-[1.04]
                transition-all
                duration-300
              "
            >
              explore my cv
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ekvo@uci.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                px-6
                py-3
                rounded-full
                border
                border-brand/50
                text-brand
                text-base
                font-semibold
                lowercase
                tracking-wide
                hover:bg-brand
                hover:border-brand
                hover:text-white
                transition-colors
                duration-300
              "
            >
              contact me
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
