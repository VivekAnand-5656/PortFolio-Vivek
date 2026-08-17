import React, { useState } from 'react'
import axios from "axios"
import { FaGithub } from "react-icons/fa"
import { IoLogoVercel } from "react-icons/io5"
import { IoClose } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'

const AddProject = () => {
    const navigate = useNavigate()
    const api_base = "https://my-portfolio-32s5.onrender.com"

    const [formdata, setFormdata] = useState({
        title: "",
        details: "",
        gitlink: "",
        livelink: "",
        createdAt: ""
    })

    const [techInput, setTechInput] = useState("")
    const [techstacks, setTechstacks] = useState([])

    const handle_change = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const add_tech = () => {
        if (techInput.trim() === "") return
        setTechstacks([...techstacks, techInput.trim()])
        setTechInput("")
    }

    const remove_tech = (index) => {
        setTechstacks(techstacks.filter((_, i) => i !== index))
    }

    const handle_key_down = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            add_tech()
        }
    }

    const handle_submit = async (e) => {
        e.preventDefault()
        try {
            const payload = { ...formdata, techstacks }
            const response = await axios.post(`${api_base}/admin/addproject`, payload)
            alert("Project Added")
            setFormdata({ title: "", details: "", gitlink: "", livelink: "", createdAt: "" })
            setTechstacks([])
        } catch (error) {
            alert("Something went wrong")
            console.log(error.response?.data?.detail || "Something went wrong")
        }
    }

    return (
        <section className='w-[95%] sm:w-[85%] max-w-2xl mx-auto my-8'>
            <button className=' p-2 rounded cursor-pointer  text-white ' onClick={()=>navigate("/adminhome")} >🔙</button>
            <form
                onSubmit={handle_submit}
                className='bg-[#f8fefe] rounded-3xl p-5 sm:p-6 flex flex-col gap-3 border border-[#024d4d]/20'
            >
                <h3 className='text-xl sm:text-2xl font-bold text-[#024d4d] mb-1'>Add New Project</h3>

                <input
                    type='text' name='title' value={formdata.title} onChange={handle_change}
                    placeholder='Project Title'
                    className='w-full border-b-2 border-gray-300 focus:border-[#04665a] px-2 py-2 outline-none bg-transparent transition-colors duration-300'
                />

                <textarea
                    name='details' value={formdata.details} onChange={handle_change}
                    placeholder='Project Details'
                    rows={3}
                    className='w-full border-b-2 border-gray-300 focus:border-[#04665a] px-2 py-2 outline-none resize-none bg-transparent transition-colors duration-300'
                />

                {/* Techstacks tag input */}
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-[#04665a] transition-colors duration-300'>
                        <input
                            type='text'
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyDown={handle_key_down}
                            placeholder='Type a tech and press Enter'
                            className='flex-1 px-2 py-2 outline-none bg-transparent'
                        />
                        <button
                            type='button'
                            onClick={add_tech}
                            className='text-sm font-semibold text-[#04665a] hover:text-[#024d4d] transition-colors duration-300 px-2'
                        >
                            Add
                        </button>
                    </div>

                    {techstacks.length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                            {techstacks.map((tech, index) => (
                                <span
                                    key={index}
                                    className='flex items-center gap-1 bg-[#d1ca0b] text-black text-[0.75rem] px-2 py-1 rounded-full'
                                >
                                    {tech}
                                    <IoClose
                                        onClick={() => remove_tech(index)}
                                        className='cursor-pointer hover:text-[#024d4d] transition-colors duration-300'
                                    />
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className='flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-[#04665a] transition-colors duration-300'>
                    <FaGithub className='text-gray-500' />
                    <input
                        type='text' name='gitlink' value={formdata.gitlink} onChange={handle_change}
                        placeholder='GitHub Link'
                        className='flex-1 px-2 py-2 outline-none bg-transparent'
                    />
                </div>

                <div className='flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-[#04665a] transition-colors duration-300'>
                    <IoLogoVercel className='text-gray-500' />
                    <input
                        type='text' name='livelink' value={formdata.livelink} onChange={handle_change}
                        placeholder='Live Demo Link'
                        className='flex-1 px-2 py-2 outline-none bg-transparent'
                    />
                </div>

                <input
                    type='date' name='createdAt' value={formdata.createdAt} onChange={handle_change}
                    className='w-full border-b-2 border-gray-300 focus:border-[#04665a] px-2 py-2 outline-none bg-transparent transition-colors duration-300'
                />

                <button
                    type='submit'
                    className='self-start bg-[#04665a] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#024d4d] hover:pr-8 transition-all duration-300'>
                    Save Project
                </button>
            </form>
        </section>
    )
}

export default AddProject