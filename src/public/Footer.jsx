import axios from "axios";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate()
  const [details, setDetails] = useState({})
  const api_base = "https://my-portfolio-32s5.onrender.com"

  // ========= Details ==========
  const fetch_details = async () => {
    try {
      const response = await axios.get(`${api_base}/details`)
      setDetails(response.data[0])
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetch_details()
  },[])
  return (
    <footer className="relative overflow-hidden w-[95%] sm:w-[92%] max-w-6xl mx-auto
  bg-white/[0.04] border border-white/10 text-white
  rounded-3xl mt-4">

      {/* Background Glow */}
      <div className="absolute -top-24 left-10 w-60 h-60
  bg-[#c809c8]/10 blur-[100px] rounded-full"></div>

      <div className="absolute -bottom-24 right-10 w-60 h-60
  bg-[#04b3a8]/10 blur-[100px] rounded-full"></div>

      <div className="relative w-[90%] mx-auto py-10 sm:py-12
  flex flex-col md:flex-row justify-between gap-10">

        {/* Logo & Description */}
        <div className="flex-1">

          <a
            href="#home"
            className="text-2xl sm:text-3xl font-bold
        bg-gradient-to-r from-[#c809c8] to-[#04b3a8]
        bg-clip-text text-transparent"
          >
            Vivek Anand
          </a>

          <p className="mt-3 text-gray-400 text-sm leading-6 max-w-sm">
            Full Stack Developer building modern, responsive and
            scalable web experiences for businesses and startups.
          </p>

          <a
            href="#contact"
            className="inline-block mt-5 text-sm font-semibold
        text-[#c809c8] hover:text-[#04b3a8]
        transition-colors duration-300"
          >
            Let's work together →
          </a>

        </div>

        {/* Quick Links */}
        <div className="flex-1">

          <h3 className="text-lg font-semibold mb-4">
            Explore
          </h3>

          <div className="flex flex-wrap md:flex-col gap-x-6 gap-y-2
      text-sm text-gray-400">

            <a href="#home" className="hover:text-[#c809c8] transition-colors">
              Home
            </a>

            <a href="#about" className="hover:text-[#c809c8] transition-colors">
              About
            </a>

            <a href="#skills" className="hover:text-[#c809c8] transition-colors">
              Skills
            </a>

            <a href="#services" className="hover:text-[#c809c8] transition-colors">
              Services
            </a>

            <a href="#projects" className="hover:text-[#c809c8] transition-colors">
              Projects
            </a>

            <a href="#contact" className="hover:text-[#c809c8] transition-colors">
              Contact
            </a>

            <button
              onClick={() => navigate("/adminhome")}
              className="text-left text-gray-600 hover:text-gray-400
          transition-colors duration-300"
            >
              Admin
            </button>

          </div>
        </div>

        {/* Social */}
        <div className="flex-1">

          <h3 className="text-lg font-semibold mb-4">
            Connect
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            Find me online.
          </p>

          <div className="flex gap-3">

            <a
              href={details.socialLinks?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl
          border border-white/10
          flex justify-center items-center
          text-gray-400
          hover:bg-[#c809c8]
          hover:border-[#c809c8]
          hover:text-white
          hover:-translate-y-1
          transition-all duration-300"
            >
              <FaGithub />
            </a>

            <a
              href={details.socialLinks?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl
          border border-white/10
          flex justify-center items-center
          text-gray-400
          hover:bg-[#04b3a8]
          hover:border-[#04b3a8]
          hover:text-white
          hover:-translate-y-1
          transition-all duration-300"
            >
              <FaLinkedin />
            </a>

            <a
              href={details.socialLinks?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl
          border border-white/10
          flex justify-center items-center
          text-gray-400
          hover:bg-[#c809c8]
          hover:border-[#c809c8]
          hover:text-white
          hover:-translate-y-1
          transition-all duration-300"
            >
              <FaInstagram />
            </a>

          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-white/10 py-5 px-6
  flex flex-col sm:flex-row justify-between items-center gap-4">

        <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
          © {new Date().getFullYear()} Vivek Anand. All rights reserved.
        </p>

        <p className="text-xs text-gray-600">
          Built with React & ❤️
        </p>

        <a
          href="#home"
          className="w-10 h-10 rounded-full
      bg-gradient-to-r from-[#c809c8] to-[#8b2be2]
      text-white flex justify-center items-center
      shadow-[0_0_20px_rgba(200,9,200,0.2)]
      hover:scale-110
      transition-transform duration-300"
        >
          <FaArrowUp />
        </a>

      </div>
    </footer>
  );
}