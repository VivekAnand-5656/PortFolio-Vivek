import React, { useEffect, useState } from 'react'
import axios from "axios"
import { motion, useScroll } from 'framer-motion';
import { Typewriter } from "react-simple-typewriter"

import { GrProjects } from "react-icons/gr";
import { IoMdCodeDownload } from "react-icons/io";
import { FaGithub, FaInstagramSquare, FaInstagram, FaLinkedin, FaPhoneAlt, FaGraduationCap, FaCertificate } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import { MdEmail } from 'react-icons/md';


import vivek from '../assets/vivek.png'
import aboutimg from '../assets/about.png'
import projectimg from '../assets/project.png'
import frontend from '../assets/frontend.png'
import fullstack from '../assets/fullstack.png'
import backend from '../assets/backend.png'
import laptop from '../assets/laptop.png'
import FeedBack from './FeedBack';

const Home = () => {
    const [projects, setProjects] = useState([])
    const [details, setDetails] = useState({})
    const designation = ["Python Developer", "Full Stack Developer", "Backend Developer", "React Developer"]

    // ------------------------
    const api_base = "https://my-portfolio-32s5.onrender.com"

    // ======== Projects =========
    const fetch_projects = async () => {
        try {
            const response = await axios.get(`${api_base}/projects`)
            setProjects(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    // ========= Details ==========
    const fetch_details = async () => {
        try {
            const response = await axios.get(`${api_base}/details`)
            setDetails(response.data[0])
        } catch (error) {
            console.log(error);
        }
    }

    // ========= Send Inquiry ================
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        phone: "",
        msg: ""
    })
    const handle_change = (e) => {
        setFormdata({
            ...formdata, [e.target.name]: e.target.value
        })
    }

    const handle_inquiry = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${api_base}/sendemail`, formdata)
            alert("Inquiry Send")
            setFormdata({
                name: "",
                email: "",
                phone: "",
                msg: ""
            })
        } catch (error) {
            alert("Something went wrong");
            console.log(error.response?.data?.detail || "Something went wrong");

        }
    }

    useEffect(() => {
        fetch_projects()
        fetch_details()
    }, [])

    // ============================ Motion ==================
    const { scrollYProgress } = useScroll();

    return (
        <>
            <motion.div
                style={{ scaleX: scrollYProgress, }}
                className="fixed top-0 left-0 w-full h-2 bg-[#fb06ff] origin-left z-50" />

            <div
                className='w-full h-auto flex flex-col gap-3'>

                {/* ======= Hero Section ======= */}
                <motion.section
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    id="home"
                    className="w-[95vw] sm:w-[92vw] lg:w-[85vw] min-h-[75vh] lg:h-[85vh] mx-auto mt-2 rounded-3xl relative overflow-hidden flex justify-center items-center py-12 lg:py-0 border border-white/10 bg-white/[0.02]"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-32 -left-20 w-72 h-72 bg-[#c809c8]/15 blur-[120px] rounded-full"></div>

                    <div className="absolute -bottom-32 right-0 w-72 h-72 bg-[#04b3a8]/10 blur-[120px] rounded-full"></div>

                    <div className="w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-5 sm:px-8 z-10">

                        {/* Left Side */}
                        <div
                            className="w-full lg:w-[55%] flex flex-col gap-4 text-center lg:text-left items-center lg:items-start"
                        >

                            {/* Intro */}
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-[#c809c8]"></span>

                                <span className="text-[#c809c8] font-mono tracking-[4px] text-xs sm:text-sm uppercase">
                                    Hey, I'm
                                </span>
                            </div>

                            {/* Name */}
                            <h1
                                className="bg-gradient-to-r from-[#c809c8] via-purple-500 to-[#04b3a8] bg-clip-text text-transparent text-[2.7rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[0.95] uppercase font-bold font-mono"
                            >
                                Vivek Anand
                            </h1>

                            {/* Role */}
                            <h2
                                className="text-white text-base sm:text-xl font-semibold
        border-l-2 border-[#04b3a8] pl-3"
                            >
                                {/* Full Stack Developer */}
                                <span >
                                    <Typewriter
                                        words={designation}
                                        loop={0}
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={80}
                                        deleteSpeed={50}
                                        delaySpeed={1500}
                                    />
                                </span>
                                <span className="text-gray-500 mx-2">·</span>
                                <span className="text-[#c809c8]">
                                    Python & React
                                </span>
                            </h2>

                            {/* Description */}
                            <p
                                className="text-gray-400 max-w-xl text-sm sm:text-base
        leading-7"
                            >
                                I build modern, responsive and scalable web applications
                                that help businesses turn ideas into real digital products.
                            </p>

                            {/* Small Highlights */}
                            <div className="flex flex-wrap justify-center lg:justify-start
      gap-2 mt-1">

                                <span className="px-3 py-1 rounded-full text-xs
        border border-white/10 bg-white/[0.04] text-gray-300">
                                    React
                                </span>

                                <span className="px-3 py-1 rounded-full text-xs
        border border-white/10 bg-white/[0.04] text-gray-300">
                                    FastAPI
                                </span>

                                <span className="px-3 py-1 rounded-full text-xs
        border border-white/10 bg-white/[0.04] text-gray-300">
                                    MongoDB
                                </span>

                                <span className="px-3 py-1 rounded-full text-xs
        border border-white/10 bg-white/[0.04] text-gray-300">
                                    REST APIs
                                </span>

                            </div>

                            {/* CTA + Social */}
                            <div
                                className="flex flex-wrap justify-center lg:justify-start
        items-center gap-3 sm:gap-4 mt-3"
                            >

                                <a
                                    href="#contact"
                                    className="flex items-center gap-2
          bg-gradient-to-r from-[#c809c8] to-[#8b2be2]
          text-white font-semibold text-sm
          px-6 py-3 rounded-full
          shadow-[0_0_25px_rgba(200,9,200,0.25)]
          hover:scale-105
          hover:shadow-[0_0_35px_rgba(200,9,200,0.4)]
          transition-all duration-300"
                                >
                                    Let's Work Together →
                                </a>

                                <a
                                    href="#projects"
                                    className="px-6 py-3 rounded-full
          border border-white/20 text-gray-300
          text-sm font-semibold
          hover:border-[#04b3a8]
          hover:text-[#04b3a8]
          transition-all duration-300"
                                >
                                    View Projects
                                </a>

                                {/* Social */}
                                <div className="flex gap-2 text-white text-[1.1rem]">

                                    <a
                                        href={details.socialLinks?.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 flex items-center justify-center
            rounded-full border border-white/20
            hover:bg-[#c809c8]
            hover:border-[#c809c8]
            hover:-translate-y-1
            transition-all duration-300"
                                    >
                                        <FaGithub />
                                    </a>

                                    <a
                                        href={details.socialLinks?.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 flex items-center justify-center
            rounded-full border border-white/20
            hover:bg-[#04b3a8]
            hover:border-[#04b3a8]
            hover:-translate-y-1
            transition-all duration-300"
                                    >
                                        <FaLinkedin />
                                    </a>

                                    <a
                                        href={details.socialLinks?.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 flex items-center justify-center
            rounded-full border border-white/20
            hover:bg-[#c809c8]
            hover:border-[#c809c8]
            hover:-translate-y-1
            transition-all duration-300"
                                    >
                                        <FaInstagramSquare />
                                    </a>

                                </div>
                            </div>

                            {/* Availability */}
                            <div className="flex items-center gap-2 mt-2">
                                <span
                                    className="w-2 h-2 rounded-full bg-[#04b3a8]
          shadow-[0_0_10px_#04b3a8]"
                                ></span>

                                <span className="text-xs text-gray-500">
                                    Available for freelance projects
                                </span>
                            </div>

                        </div>

                        {/* Right Side */}
                        <div
                            className="w-full sm:w-[70%] lg:w-[42%]
      h-[280px] sm:h-[350px] lg:h-[420px]
      flex justify-center items-center relative"
                        >

                            {/* Outer Glow */}
                            <div
                                className="absolute w-64 h-64 sm:w-80 sm:h-80
        rounded-full bg-[#c809c8]/10 blur-[60px]"
                            ></div>

                            {/* Neon Circle */}
                            <div
                                className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border-4 border-[#c809c8] rotate-x-70 shadow-[0_0_40px_0_#c809c8] -bottom-10 sm:-bottom-5 right-[10%] sm:right-[12%]"
                            ></div>

                            {/* Laptop */}
                            <motion.img
                                whileHover={{ scale: 1.1 }}
                                src={laptop}
                                alt="Vivek Anand - Full Stack Developer"
                                className="relative z-10 w-72 sm:w-96 lg:w-[430px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
                            />

                        </div>

                    </div>
                </motion.section>
                {/* =========== Projects ======== */}
                <section
                    id="projects"
                    className="relative overflow-hidden w-[95%] sm:w-[92%] max-w-6xl mx-auto border-t border-white/10 rounded-3xl py-10 sm:py-12 px-5 sm:px-7 mb-3"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-24 right-10 w-60 h-60 bg-[#c809c8]/10 blur-[100px] rounded-full"></div>

                    <div className="absolute -bottom-24 left-10 w-60 h-60 bg-[#04b3a8]/10 blur-[100px] rounded-full"></div>

                    <div className="relative">

                        {/* Heading */}
                        <div className="max-w-6xl mx-auto mb-8">

                            <span className="text-xs sm:text-sm uppercase tracking-[5px] text-[#c809c8] font-semibold">
                                -- Selected Work
                            </span>

                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-2">

                                <div>
                                    <h2 className="text-2xl sm:text-4xl font-bold text-white">
                                        Projects I've{" "}
                                        <span
                                            className="bg-gradient-to-r from-[#c809c8] to-[#04b3a8] bg-clip-text text-transparent"
                                        >
                                            Built
                                        </span>
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-2 max-w-xl">
                                        A selection of real projects showcasing my approach to
                                        design, development and problem solving.
                                    </p>
                                </div>

                                <span className="text-xs text-gray-500 border border-white/10 rounded-full px-3 py-1 w-fit">
                                    {projects?.length || 0} Projects
                                </span>

                            </div>
                        </div>

                        {/* Projects */}
                        <div className="max-w-6xl mx-auto w-full flex flex-wrap justify-center lg:justify-start items-start gap-6">

                            {projects?.map((project, index) => (

                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }}

                                    key={index}
                                    className="group w-full sm:w-[300px] lg:w-[31%]  p-3 rounded-2xl  bg-white/[0.04] border border-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(200,9,200,0.06)] hover:border-[#c809c8]/50 hover:shadow-[0_0_30px_rgba(200,9,200,0.18)] hover:-translate-y-2 transition-all duration-300"
                                >

                                    {/* Image */}
                                    <a
                                        href={project.livelink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="relative overflow-hidden rounded-xl">

                                            <img
                                                className="w-full h-44 object-cover
                group-hover:scale-105
                transition-transform duration-500"
                                                src={projectimg}
                                                alt={project.title}
                                            />

                                            {/* Overlay */}
                                            <div
                                                className="absolute inset-0 bg-black/0
                group-hover:bg-black/20
                transition-colors duration-300"
                                            ></div>

                                        </div>
                                    </a>

                                    {/* Content */}
                                    <div className="px-1">

                                        <div className="flex items-center justify-between gap-2 mt-4">

                                            <h3 className="text-white text-lg font-semibold
              line-clamp-1">
                                                {project.title}
                                            </h3>

                                            <span className="text-xs text-gray-600 font-mono">
                                                0{index + 1}
                                            </span>

                                        </div>

                                        <p className="mt-2 mb-4 text-[0.8rem] text-gray-400
            leading-5 line-clamp-3">
                                            {project.details}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-5">

                                            {project.techstacks?.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="text-[0.7rem] px-2.5 py-1 rounded-full
                  bg-[#c809c8]/10
                  border border-[#c809c8]/25
                  text-[#f08af0]"
                                                >
                                                    {skill}
                                                </span>
                                            ))}

                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">

                                            <a
                                                href={project.gitlink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex justify-center items-center
                py-2 gap-1.5 rounded-full
                border border-white/15
                text-xs sm:text-sm text-gray-300
                hover:bg-[#c809c8]
                hover:border-[#c809c8]
                hover:text-white
                transition-all duration-300"
                                            >
                                                <FaGithub />
                                                Source
                                            </a>

                                            <a
                                                href={project.livelink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex justify-center items-center
                py-2 gap-1.5 rounded-full
                bg-[#04b3a8]/10
                border border-[#04b3a8]/30
                text-xs sm:text-sm text-[#04b3a8]
                hover:bg-[#04b3a8]
                hover:text-white
                transition-all duration-300"
                                            >
                                                Live
                                                <IoLogoVercel />
                                            </a>

                                        </div>

                                    </div>
                                </motion.div>

                            ))}

                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-9 pt-5 border-t border-white/10
    flex flex-col sm:flex-row sm:items-center
    sm:justify-between gap-3">

                            <p className="text-xs sm:text-sm text-gray-500">
                                Like what you see? I can build something similar for your business.
                            </p>

                            <a
                                href="#contact"
                                className="text-sm font-semibold text-[#c809c8]
        hover:text-[#04b3a8]
        transition-colors duration-300"
                            >
                                Start a Project →
                            </a>

                        </div>

                    </div>
                </section>

                {/* ========= About Section ======== */}
                <section
                    id="about"
                    className="relative overflow-hidden w-[95%] sm:w-[92%] max-w-6xl mx-auto
  rounded-3xl border border-white/10
  bg-white/[0.04] backdrop-blur-sm
  text-white px-5 sm:px-8 py-10 sm:py-12"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-20 -left-20 w-56 h-56 bg-[#c809c8]/20 blur-[100px] rounded-full"></div>
                    <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-[#04b3a8]/15 blur-[100px] rounded-full"></div>

                    <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

                        {/* Content */}
                        <div className="w-full lg:w-[58%] flex flex-col gap-4
    text-center lg:text-left items-center lg:items-start">

                            <span className="text-xs sm:text-sm uppercase tracking-[5px]
      font-semibold text-[#c809c8]">
                                -- About Me
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                                I don't just build websites.
                                <br />
                                I build{" "}
                                <span className="bg-gradient-to-r from-[#c809c8] to-[#04b3a8]
        bg-clip-text text-transparent">
                                    digital experiences.
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base text-gray-300 leading-7 max-w-xl">
                                {details.about}
                            </p>

                            <p className="text-sm text-gray-400 max-w-xl">
                                From a clean landing page to a complete full-stack application,
                                I focus on building products that look professional, feel fast,
                                and actually solve business problems.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-3">

                                <div className="px-5 py-3 rounded-2xl border border-white/10
        bg-white/[0.05] hover:border-[#c809c8]/50 transition-all duration-300">
                                    <p className="text-xl font-bold text-[#c809c8]">
                                        {projects?.length}+
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Projects Built
                                    </p>
                                </div>

                                <div className="px-5 py-3 rounded-2xl border border-white/10
        bg-white/[0.05] hover:border-[#04b3a8]/50 transition-all duration-300">
                                    <p className="text-xl font-bold text-[#04b3a8]">
                                        Full Stack
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Development
                                    </p>
                                </div>

                                <div className="px-5 py-3 rounded-2xl border border-white/10
        bg-white/[0.05] hover:border-[#c809c8]/50 transition-all duration-300">
                                    <p className="text-xl font-bold text-white">
                                        Fast
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Responsive UI
                                    </p>
                                </div>

                            </div>

                            {/* CTA */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-3">

                                <a
                                    href="#contact"
                                    className="px-6 py-2.5 rounded-full
          bg-gradient-to-r from-[#c809c8] to-[#8b2be2]
          text-white text-sm font-semibold
          shadow-[0_0_20px_rgba(200,9,200,0.25)]
          hover:scale-105 transition-all duration-300"
                                >
                                    Let's Work Together →
                                </a>

                                <a
                                    href="#projects"
                                    className="px-6 py-2.5 rounded-full
          border border-white/20 text-sm font-semibold text-gray-300
          hover:border-[#c809c8] hover:text-white
          transition-all duration-300"
                                >
                                    View My Work
                                </a>

                            </div>
                        </div>

                        {/* Image */}
                        <div className="w-full lg:w-[42%] flex justify-center items-center relative">

                            {/* Glow */}
                            <div className="absolute w-52 h-52 sm:w-64 sm:h-64
      bg-[#c809c8]/20 blur-[70px] rounded-full"></div>

                            {/* Circle */}
                            <div className="absolute w-52 h-52 sm:w-64 sm:h-64
      rounded-full border border-[#c809c8]/50
      shadow-[0_0_40px_0_rgba(200,9,200,0.35)]
      animate-pulse"></div>

                            <div className="absolute w-44 h-44 sm:w-56 sm:h-56
      rounded-full border border-[#04b3a8]/30"></div>

                            <img
                                src={aboutimg}
                                alt="Vivek - Full Stack Developer"
                                className="relative z-10 w-[55%] sm:w-[50%] object-contain
        drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)]
        hover:scale-105 transition-transform duration-500"
                            />

                            {/* Floating Badge */}
                            <div className="absolute z-20 bottom-2 right-[8%]
      px-4 py-2 rounded-xl
      bg-black/60 backdrop-blur-md
      border border-white/10 shadow-lg">
                                <p className="text-xs text-gray-400">
                                    Available for
                                </p>
                                <p className="text-sm font-semibold text-[#04b3a8]">
                                    Freelance Work
                                </p>
                            </div>

                        </div>

                    </div>
                </section>

                {/* ============ Skills ============ */}
                <section
                    id="skills"
                    className="relative overflow-hidden w-[95%] sm:w-[92%] max-w-6xl mx-auto
  rounded-3xl p-6 sm:p-8 mb-2
  border border-white/10
  bg-white/[0.04] backdrop-blur-sm text-white"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-24 right-10 w-60 h-60
  bg-[#c809c8]/15 blur-[100px] rounded-full"></div>

                    <div className="absolute -bottom-24 left-10 w-60 h-60
  bg-[#04b3a8]/10 blur-[100px] rounded-full"></div>

                    <div className="relative">
                        <span className="text-xs sm:text-sm uppercase tracking-[5px]
    text-[#c809c8] font-semibold">
                            -- Skills
                        </span>

                        <div className="flex flex-col sm:flex-row sm:items-end
    sm:justify-between gap-3 mb-7">

                            <div>
                                <h2 className="text-2xl sm:text-4xl font-bold mt-2">
                                    My{" "}
                                    <span className="bg-gradient-to-r from-[#c809c8] to-[#04b3a8]
          bg-clip-text text-transparent">
                                        Tech Stack
                                    </span>
                                </h2>

                                <p className="text-sm text-gray-400 mt-2 max-w-xl">
                                    Technologies I use to design, develop and deploy modern
                                    full-stack web applications.
                                </p>
                            </div>

                            <span className="text-xs text-gray-500 border border-white/10
      rounded-full px-3 py-1 w-fit">
                                Always learning • Always building
                            </span>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-3">
                            {details.skills?.map((skill, index) => (
                                <div
                                    key={index}
                                    className="group px-4 py-2.5 rounded-xl
          bg-white/[0.05]
          border border-white/10
          text-sm sm:text-[0.95rem] font-medium text-gray-300
          hover:border-[#c809c8]/60
          hover:bg-[#c809c8]/10
          hover:text-white
          hover:-translate-y-1
          hover:shadow-[0_0_20px_rgba(200,9,200,0.15)]
          transition-all duration-300 cursor-default"
                                >
                                    <span className="text-[#c809c8] mr-1.5">+</span>
                                    {skill}
                                </div>
                            ))}
                        </div>

                        {/* Bottom Highlight */}
                        <div className="mt-8 pt-5 border-t border-white/10
    flex flex-col sm:flex-row sm:items-center
    sm:justify-between gap-3">

                            <p className="text-xs sm:text-sm text-gray-400">
                                From <span className="text-white">UI</span> to{" "}
                                <span className="text-white">API</span> to{" "}
                                <span className="text-white">Deployment</span> — I handle the full stack.
                            </p>

                            <a
                                href="#projects"
                                className="text-sm font-semibold text-[#04b3a8]
        hover:text-[#c809c8] transition-colors duration-300"
                            >
                                Explore my work →
                            </a>

                        </div>
                    </div>
                </section>

                {/* =========== Services ======== */}
                <section
                    id="services"
                    className="relative overflow-hidden w-[95%] sm:w-[92%] max-w-6xl mx-auto
  rounded-3xl p-6 sm:p-8 mb-2
  border border-white/10
  bg-white/[0.04] backdrop-blur-sm text-white"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-24 -right-20 w-64 h-64
  bg-[#c809c8]/15 blur-[100px] rounded-full"></div>

                    <div className="absolute -bottom-24 -left-20 w-64 h-64
  bg-[#04b3a8]/10 blur-[100px] rounded-full"></div>

                    <div className="relative">

                        {/* Heading */}
                        <span className="text-xs sm:text-sm uppercase tracking-[5px]
    text-[#c809c8] font-semibold">
                            -- Services
                        </span>

                        <h2 className="text-2xl sm:text-4xl font-bold mt-2">
                            What I Can{" "}
                            <span className="bg-gradient-to-r from-[#c809c8] to-[#04b3a8]
      bg-clip-text text-transparent">
                                Build For You
                            </span>
                        </h2>

                        <p className="text-sm text-gray-400 mt-2 mb-8 max-w-2xl">
                            From landing pages to complete full-stack applications,
                            I build fast, responsive and scalable digital solutions.
                        </p>

                        {/* Services */}
                        <div className="w-full flex flex-wrap gap-4">
                            {details.services?.length === 0 ? (
                                <p className="text-gray-400">
                                    No Services Provided
                                </p>
                            ) : (
                                details.services?.map((service, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        key={index}
                                        className="group flex-1 min-w-full sm:min-w-[220px]
            p-5 rounded-2xl
            bg-white/[0.04]
            border border-white/10
            hover:border-[#c809c8]/60
            hover:bg-[#c809c8]/[0.06]
            hover:-translate-y-2
            hover:shadow-[0_0_25px_rgba(200,9,200,0.15)]
            transition-all duration-300"
                                    >

                                        {/* Number */}
                                        <div className="flex justify-between items-center mb-5">
                                            <span className="text-xs font-mono text-[#c809c8]">
                                                0{index + 1}
                                            </span>

                                            <span className="text-xl text-gray-600
              group-hover:text-[#04b3a8]
              transition-colors duration-300">
                                                ↗
                                            </span>
                                        </div>

                                        {/* Service Title */}
                                        <h3 className="text-lg sm:text-xl font-bold
            text-white group-hover:text-[#c809c8]
            transition-colors duration-300">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-400 mt-2 leading-6">
                                            {service.description}
                                        </p>

                                        {/* Bottom Line */}
                                        <div className="mt-5 w-10 h-[2px]
            bg-gradient-to-r from-[#c809c8] to-[#04b3a8]
            group-hover:w-full
            transition-all duration-500">
                                        </div>

                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* CTA */}
                        <div className="mt-8 pt-5 border-t border-white/10
    flex flex-col sm:flex-row sm:items-center
    sm:justify-between gap-4">

                            <p className="text-sm text-gray-400">
                                Have a project in mind?
                                <span className="text-white ml-1">
                                    Let's turn your idea into reality.
                                </span>
                            </p>

                            <a
                                href="#contact"
                                className="w-fit px-5 py-2.5 rounded-full
        bg-gradient-to-r from-[#c809c8] to-[#8b2be2]
        text-white text-sm font-semibold
        shadow-[0_0_20px_rgba(200,9,200,0.2)]
        hover:scale-105
        transition-all duration-300"
                            >
                                Start a Project →
                            </a>

                        </div>

                    </div>
                </section>
                {/* ============ Education & Certifications ============ */}
                <section
                    className="relative overflow-hidden w-[95%] sm:w-[92%] max-w-6xl mx-auto
  rounded-3xl p-6 sm:p-8 mb-4
  bg-white/[0.04] border border-white/10
  backdrop-blur-sm text-white"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-24 -left-20 w-64 h-64
  bg-[#c809c8]/10 blur-[100px] rounded-full"></div>

                    <div className="absolute -bottom-24 -right-20 w-64 h-64
  bg-[#04b3a8]/10 blur-[100px] rounded-full"></div>

                    <div className="relative">

                        {/* Heading */}
                        <div className="mb-8">
                            <span className="text-xs sm:text-sm uppercase tracking-[5px]
      text-[#c809c8] font-semibold">
                                -- Background
                            </span>

                            <h2 className="text-2xl sm:text-4xl font-bold mt-2">
                                Education &{" "}
                                <span className="bg-gradient-to-r from-[#c809c8] to-[#04b3a8]
        bg-clip-text text-transparent">
                                    Certifications
                                </span>
                            </h2>

                            <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-2xl">
                                My academic background and the skills I've developed along
                                my journey as a developer.
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                            {/* Education */}
                            <div className="flex-1">

                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <span className="w-9 h-9 flex items-center justify-center
          rounded-xl bg-[#c809c8]/10 border border-[#c809c8]/30">
                                        <FaGraduationCap className="text-[#c809c8]" />
                                    </span>

                                    Education
                                </h3>

                                <div className="flex flex-col gap-6 border-l border-white/10 pl-5">

                                    {details.education?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="relative group"
                                        >
                                            {/* Timeline Dot */}
                                            <span
                                                className="absolute -left-[26px] top-1.5
                w-3 h-3 rounded-full
                bg-[#c809c8]
                shadow-[0_0_12px_#c809c8]
                group-hover:scale-125
                transition-transform duration-300"
                                            ></span>

                                            <div
                                                className="p-4 rounded-2xl
                bg-white/[0.03]
                border border-white/5
                hover:border-[#c809c8]/40
                hover:bg-white/[0.05]
                transition-all duration-300"
                                            >
                                                <div className="flex flex-col sm:flex-row
                sm:items-center sm:justify-between gap-1">

                                                    <h4 className="text-base sm:text-lg font-semibold">
                                                        {item.degree}
                                                    </h4>

                                                    <span className="text-xs text-[#04b3a8] font-mono">
                                                        {item.start_year} - {item.end_year}
                                                    </span>

                                                </div>

                                                <p className="text-[#c809c8] font-medium text-sm mt-1">
                                                    {item.institute}
                                                </p>

                                                <p className="text-gray-500 text-sm mt-2 leading-6">
                                                    {item?.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* Certifications */}
                            <div className="flex-1">

                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <span className="w-9 h-9 flex items-center justify-center
          rounded-xl bg-[#04b3a8]/10 border border-[#04b3a8]/30">
                                        <FaCertificate className="text-[#04b3a8]" />
                                    </span>

                                    Certifications
                                </h3>

                                <div className="flex flex-col gap-3">

                                    {details.certification?.map((certificate, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center justify-between
              gap-4 p-4 rounded-2xl
              bg-white/[0.03]
              border border-white/10
              hover:border-[#04b3a8]/50
              hover:bg-[#04b3a8]/[0.05]
              hover:-translate-y-1
              transition-all duration-300"
                                        >

                                            <div className="min-w-0">
                                                <h4 className="font-semibold text-sm sm:text-base
                text-white group-hover:text-[#04b3a8]
                transition-colors duration-300">
                                                    {certificate.title}
                                                </h4>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    {certificate.organization}
                                                </p>
                                            </div>

                                            <div
                                                className="shrink-0 w-9 h-9 rounded-xl
                flex items-center justify-center
                bg-[#04b3a8]/10
                border border-[#04b3a8]/20
                group-hover:bg-[#04b3a8]
                transition-all duration-300"
                                            >
                                                <FaCertificate
                                                    className="text-[#04b3a8]
                  group-hover:text-white transition-colors duration-300"
                                                />
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>

                        {/* Bottom Line */}
                        <div className="mt-9 pt-5 border-t border-white/10">
                            <p className="text-xs sm:text-sm text-gray-500 text-center">
                                Continuously learning, building and improving.
                            </p>
                        </div>

                    </div>
                </section>

                {/* ========== Contact ======= */}
                <section
                    id="contact"
                    className="relative overflow-hidden w-full py-10 sm:py-14 px-4 sm:px-6 mb-2
  border-t border-white/10 bg-white/[0.02]"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-32 left-10 w-72 h-72
  bg-[#c809c8]/15 blur-[120px] rounded-full"></div>

                    <div className="absolute -bottom-32 right-10 w-72 h-72
  bg-[#04b3a8]/10 blur-[120px] rounded-full"></div>

                    <div className="relative max-w-6xl mx-auto">

                        {/* Heading */}
                        <div className="mb-8 sm:mb-10">
                            <span className="text-xs sm:text-sm uppercase tracking-[5px]
      text-[#c809c8] font-semibold">
                                -- Contact Me
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl
      font-bold text-white mt-2">
                                Let's build something{" "}
                                <span className="bg-gradient-to-r from-[#c809c8] to-[#04b3a8]
        bg-clip-text text-transparent">
                                    amazing.
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-xl">
                                Have an idea, project or business that needs a website?
                                Tell me about it and let's turn your idea into something real.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">

                            {/* Contact Info */}
                            <div
                                className="w-full md:w-[38%] rounded-3xl p-6
        bg-white/[0.04] border border-white/10
        backdrop-blur-sm"
                            >
                                <p className="text-lg font-semibold text-white mb-6">
                                    Get in touch
                                </p>

                                {/* Phone */}
                                <div className="flex items-center gap-4 mb-5
        group hover:translate-x-1 transition-transform duration-300">

                                    <div
                                        className="w-11 h-11 flex items-center justify-center
            rounded-xl bg-[#c809c8]/10 border border-[#c809c8]/30
            text-[#c809c8]"
                                    >
                                        <FaPhoneAlt />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">Phone</p>
                                        <p className="text-sm text-gray-200 font-medium">
                                            {details.contacts?.number}
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-4
        group hover:translate-x-1 transition-transform duration-300">

                                    <div
                                        className="w-11 h-11 flex items-center justify-center
            rounded-xl bg-[#04b3a8]/10 border border-[#04b3a8]/30
            text-[#04b3a8]"
                                    >
                                        <MdEmail />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">Email</p>
                                        <p className="text-sm text-gray-200 font-medium break-all">
                                            {details.contacts?.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="mt-7 p-4 rounded-2xl
        bg-white/[0.04] border border-white/10">

                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#04b3a8]
            shadow-[0_0_10px_#04b3a8]"></span>

                                        <span className="text-sm font-medium text-white">
                                            Available for freelance work
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-2">
                                        Currently open to new projects and collaborations.
                                    </p>
                                </div>

                                {/* Social */}
                                <div className="mt-7 pt-5 border-t border-white/10">
                                    <p className="text-sm font-semibold text-white mb-4">
                                        Follow Me
                                    </p>

                                    <div className="flex gap-3">

                                        <a
                                            href={details.socialLinks?.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center
              rounded-xl border border-white/10 text-gray-400
              hover:border-[#c809c8] hover:text-[#c809c8]
              hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <FaGithub size={18} />
                                        </a>

                                        <a
                                            href={details.socialLinks?.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center
              rounded-xl border border-white/10 text-gray-400
              hover:border-[#04b3a8] hover:text-[#04b3a8]
              hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <FaLinkedin size={18} />
                                        </a>

                                        <a
                                            href={details.socialLinks?.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center
              rounded-xl border border-white/10 text-gray-400
              hover:border-[#c809c8] hover:text-[#c809c8]
              hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <FaInstagram size={18} />
                                        </a>

                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <form
                                onSubmit={handle_inquiry}
                                className="w-full md:w-[62%] rounded-3xl p-6
        bg-white/[0.04] border border-white/10
        backdrop-blur-sm flex flex-col gap-4"
                            >

                                <div className="mb-1">
                                    <h3 className="text-xl font-bold text-white">
                                        Start a Project
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Tell me what you're looking to build.
                                    </p>
                                </div>

                                <input
                                    type="text"
                                    name="name"
                                    value={formdata.name}
                                    onChange={handle_change}
                                    placeholder="Your Name"
                                    className="w-full border border-white/10
          focus:border-[#c809c8] rounded-xl px-4 py-3
          outline-none bg-white/[0.03] text-white
          placeholder:text-gray-600 transition-colors duration-300"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formdata.email}
                                    onChange={handle_change}
                                    placeholder="Your Email"
                                    className="w-full border border-white/10
          focus:border-[#c809c8] rounded-xl px-4 py-3
          outline-none bg-white/[0.03] text-white
          placeholder:text-gray-600 transition-colors duration-300"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formdata.phone}
                                    onChange={handle_change}
                                    placeholder="Mobile Number"
                                    className="w-full border border-white/10
          focus:border-[#04b3a8] rounded-xl px-4 py-3
          outline-none bg-white/[0.03] text-white
          placeholder:text-gray-600 transition-colors duration-300"
                                />

                                <textarea
                                    name="msg"
                                    value={formdata.msg}
                                    onChange={handle_change}
                                    placeholder="Tell me about your project..."
                                    rows="5"
                                    className="w-full border border-white/10
          focus:border-[#c809c8] rounded-xl px-4 py-3
          outline-none resize-none bg-white/[0.03] text-white
          placeholder:text-gray-600 transition-colors duration-300"
                                />

                                <button
                                    type="submit"
                                    className="self-start px-7 py-3 rounded-full
          bg-gradient-to-r from-[#c809c8] to-[#8b2be2]
          text-white text-sm font-semibold
          shadow-[0_0_25px_rgba(200,9,200,0.2)]
          hover:scale-105 hover:shadow-[0_0_30px_rgba(200,9,200,0.35)]
          transition-all duration-300"
                                >
                                    Send Message →
                                </button>

                            </form>
                        </div>

                        {/* Bottom CTA */}
                        <div className="text-center mt-10">
                            <p className="text-xs text-gray-600">
                                Your idea deserves a great digital experience.
                            </p>
                        </div>

                    </div>
                </section>
                {/* ================= FeedBacks ======================= */}
                <section
                    id='feedback'
                    className='w-[95%] sm:w-[92%] max-w-6xl mx-auto rounded-3xl p-5 sm:p-8 mb-3 relative overflow-hidden border border-white/10 bg-white/[0.03] text-white'
                >

                    {/* Glow */}
                    <div className='absolute -top-24 -right-20 w-60 h-60 bg-[#c809c8]/10 blur-[100px] rounded-full'></div>
                    <div className='absolute -bottom-24 -left-20 w-60 h-60 bg-[#04b3a8]/10 blur-[100px] rounded-full'></div>


                    <div className='relative'>

                        {/* Heading */}
                        <div className='mb-7'>
                            <span className='text-xs sm:text-sm uppercase tracking-[5px] text-[#c809c8] font-semibold'>
                                -- Client Feedback
                            </span>

                            <h2 className='text-2xl sm:text-4xl font-bold mt-2'>
                                Tell Me What You
                                <span className='bg-gradient-to-r from-[#c809c8] to-[#04b3a8] bg-clip-text text-transparent'>
                                    {' '}Think
                                </span>
                            </h2>

                            <p className='text-sm text-gray-400 mt-2 max-w-xl'>
                                Your feedback helps me improve my work and deliver better
                                experiences for every client.
                            </p>
                        </div>


                        {/* Form */}
                        <form className='w-full flex flex-col gap-5'>

                            {/* Name + Email */}
                            <div className='w-full flex flex-col sm:flex-row gap-4'>

                                <div className='w-full sm:w-1/2'>
                                    <label className='text-sm text-gray-300 mb-2 block'>
                                        Your Name
                                    </label>

                                    <input
                                        type='text'
                                        name='name'
                                        placeholder='Enter your name'
                                        className='w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-white placeholder:text-gray-600 focus:border-[#c809c8] transition-colors duration-300'
                                    />
                                </div>


                                <div className='w-full sm:w-1/2'>
                                    <label className='text-sm text-gray-300 mb-2 block'>
                                        Email Address
                                    </label>

                                    <input
                                        type='email'
                                        name='email'
                                        placeholder='Enter your email'
                                        className='w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-white placeholder:text-gray-600 focus:border-[#04b3a8] transition-colors duration-300'
                                    />
                                </div>

                            </div>


                            {/* Rating */}
                            <div>
                                <label className='text-sm text-gray-300 mb-3 block'>
                                    How would you rate my portfolio?
                                </label>

                                <div className='flex flex-wrap gap-2'>

                                    <button
                                        type='button'
                                        className='px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:bg-[#c809c8] hover:text-white hover:border-[#c809c8] transition-all duration-300'
                                    >
                                        ⭐ 1
                                    </button>

                                    <button
                                        type='button'
                                        className='px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:bg-[#c809c8] hover:text-white hover:border-[#c809c8] transition-all duration-300'
                                    >
                                        ⭐ 2
                                    </button>

                                    <button
                                        type='button'
                                        className='px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:bg-[#c809c8] hover:text-white hover:border-[#c809c8] transition-all duration-300'
                                    >
                                        ⭐ 3
                                    </button>

                                    <button
                                        type='button'
                                        className='px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:bg-[#c809c8] hover:text-white hover:border-[#c809c8] transition-all duration-300'
                                    >
                                        ⭐ 4
                                    </button>

                                    <button
                                        type='button'
                                        className='px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:bg-[#c809c8] hover:text-white hover:border-[#c809c8] transition-all duration-300'
                                    >
                                        ⭐ 5
                                    </button>

                                </div>
                            </div>


                            {/* Feedback Type */}
                            <div>
                                <label className='text-sm text-gray-300 mb-3 block'>
                                    What would you like to share?
                                </label>

                                <div className='flex flex-wrap gap-2'>

                                    <button
                                        type='button'
                                        className='px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-[#04b3a8] hover:border-[#04b3a8] transition-all duration-300'
                                    >
                                        Portfolio
                                    </button>

                                    <button
                                        type='button'
                                        className='px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-[#04b3a8] hover:border-[#04b3a8] transition-all duration-300'
                                    >
                                        Design
                                    </button>

                                    <button
                                        type='button'
                                        className='px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-[#04b3a8] hover:border-[#04b3a8] transition-all duration-300'
                                    >
                                        Projects
                                    </button>

                                    <button
                                        type='button'
                                        className='px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-[#04b3a8] hover:border-[#04b3a8] transition-all duration-300'
                                    >
                                        Suggestion
                                    </button>

                                </div>
                            </div>


                            {/* Message */}
                            <div>
                                <label className='text-sm text-gray-300 mb-2 block'>
                                    Your Feedback
                                </label>

                                <textarea
                                    name='feedback'
                                    rows='5'
                                    placeholder='Write your feedback here...'
                                    className='w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none resize-none text-white placeholder:text-gray-600 focus:border-[#c809c8] transition-colors duration-300'
                                ></textarea>
                            </div>


                            {/* Submit */}
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>

                                <p className='text-xs text-gray-500'>
                                    Your feedback is highly appreciated.
                                </p>

                                <button
                                    type='submit'
                                    className='w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#c809c8] to-[#8b2be2] text-white font-semibold text-sm shadow-[0_0_20px_rgba(200,9,200,0.2)] hover:scale-105 hover:shadow-[0_0_30px_rgba(200,9,200,0.35)] transition-all duration-300'
                                >
                                    Submit Feedback →
                                </button>

                            </div>

                        </form>

                    </div>

                </section>
                {/* =========== FeedBacks ======== */}
                <FeedBack />
            </div >
        </>
    )

}

export default Home