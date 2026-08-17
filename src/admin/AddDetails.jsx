import React, { useState } from 'react'
import axios from "axios"
import { IoClose, IoAdd } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'

const AddDetails = () => {
    const navigate = useNavigate()
    const api_base = "https://my-portfolio-32s5.onrender.com"

    const [formdata, setFormdata] = useState({
        about: "",
        contacts: { number: "", email: "" },
        socialLinks: { github: "", linkedin: "", instagram: "" }
    })

    const [skillInput, setSkillInput] = useState("")
    const [skills, setSkills] = useState([])

    const [services, setServices] = useState([{ title: "", description: "" }])
    const [education, setEducation] = useState([{ degree: "", institute: "", start_year: "", end_year: "", grade: "", description: "" }])
    const [certification, setCertification] = useState([{ title: "", organization: "", issue_date: "" }])

    // ------- simple field handlers -------
    const handle_change = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const handle_nested_change = (section, field, value) => {
        setFormdata({ ...formdata, [section]: { ...formdata[section], [field]: value } })
    }

    // ------- skills -------
    const add_skill = () => {
        if (skillInput.trim() === "") return
        setSkills([...skills, skillInput.trim()])
        setSkillInput("")
    }
    const remove_skill = (index) => setSkills(skills.filter((_, i) => i !== index))
    const handle_skill_key = (e) => {
        if (e.key === "Enter") { e.preventDefault(); add_skill() }
    }

    // ------- services -------
    const handle_service_change = (index, field, value) => {
        const updated = [...services]
        updated[index][field] = value
        setServices(updated)
    }
    const add_service = () => setServices([...services, { title: "", description: "" }])
    const remove_service = (index) => setServices(services.filter((_, i) => i !== index))

    // ------- education -------
    const handle_education_change = (index, field, value) => {
        const updated = [...education]
        updated[index][field] = value
        setEducation(updated)
    }
    const add_education = () => setEducation([...education, { degree: "", institute: "", start_year: "", end_year: "", grade: "", description: "" }])
    const remove_education = (index) => setEducation(education.filter((_, i) => i !== index))

    // ------- certification -------
    const handle_cert_change = (index, field, value) => {
        const updated = [...certification]
        updated[index][field] = value
        setCertification(updated)
    }
    const add_cert = () => setCertification([...certification, { title: "", organization: "", issue_date: "" }])
    const remove_cert = (index) => setCertification(certification.filter((_, i) => i !== index))

    // ------- submit -------
    const handle_submit = async (e) => {
        e.preventDefault()
        try {
            const payload = { ...formdata, skills, services, education, certification }
            const response = await axios.post(`${api_base}/admin/adddetails`, payload)
            alert("Details Saved")
            setFormdata({
                about: "",
                contacts: { number: "", email: "" },
                socialLinks: { github: "", linkedin: "", instagram: "" }
            })
        } catch (error) {
            alert("Something went wrong")
            console.log(error.response?.data?.detail || "Something went wrong")
        }
    }

    const inputClass = 'w-full border-b-2 border-gray-300 focus:border-[#04665a] px-2 py-2 outline-none bg-transparent transition-colors duration-300'

    return (
        <section className='w-[95%] sm:w-[85%] max-w-2xl mx-auto my-8 flex flex-col gap-5'>
            <button className=' p-2 rounded cursor-pointer self-start  text-white ' onClick={() => navigate("/adminhome")} >🔙</button>

            <form onSubmit={handle_submit} className='bg-[#f8fefe] rounded-3xl p-5 sm:p-6 flex flex-col gap-6 border border-[#024d4d]/20'>

                <div>
                    <h3 className='text-xl sm:text-2xl font-bold text-[#024d4d] mb-3'>Update Details</h3>

                    <textarea
                        name='about' value={formdata.about} onChange={handle_change}
                        placeholder='About You'
                        rows={3}
                        className={inputClass + ' resize-none'}
                    />
                </div>

                {/* Skills */}
                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-semibold text-[#024d4d]'>Skills</p>
                    <div className='flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-[#04665a] transition-colors duration-300'>
                        <input
                            type='text' value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={handle_skill_key}
                            placeholder='Type a skill and press Enter'
                            className='flex-1 px-2 py-2 outline-none bg-transparent'
                        />
                        <button type='button' onClick={add_skill} className='text-sm font-semibold text-[#04665a] hover:text-[#024d4d] transition-colors duration-300 px-2'>Add</button>
                    </div>
                    {skills.length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                            {skills.map((skill, index) => (
                                <span key={index} className='flex items-center gap-1 bg-[#d1ca0b] text-black text-[0.75rem] px-2 py-1 rounded-full'>
                                    {skill}
                                    <IoClose onClick={() => remove_skill(index)} className='cursor-pointer hover:text-[#024d4d] transition-colors duration-300' />
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contacts */}
                <div className='flex flex-col gap-3'>
                    <p className='text-sm font-semibold text-[#024d4d]'>Contact Info</p>
                    <input
                        type='tel' value={formdata.contacts.number}
                        onChange={(e) => handle_nested_change('contacts', 'number', e.target.value)}
                        placeholder='Phone Number'
                        className={inputClass}
                    />
                    <input
                        type='email' value={formdata.contacts.email}
                        onChange={(e) => handle_nested_change('contacts', 'email', e.target.value)}
                        placeholder='Email'
                        className={inputClass}
                    />
                </div>

                {/* Social Links */}
                <div className='flex flex-col gap-3'>
                    <p className='text-sm font-semibold text-[#024d4d]'>Social Links</p>
                    <input
                        type='text' value={formdata.socialLinks.github}
                        onChange={(e) => handle_nested_change('socialLinks', 'github', e.target.value)}
                        placeholder='GitHub URL'
                        className={inputClass}
                    />
                    <input
                        type='text' value={formdata.socialLinks.linkedin}
                        onChange={(e) => handle_nested_change('socialLinks', 'linkedin', e.target.value)}
                        placeholder='LinkedIn URL'
                        className={inputClass}
                    />
                    <input
                        type='text' value={formdata.socialLinks.instagram}
                        onChange={(e) => handle_nested_change('socialLinks', 'instagram', e.target.value)}
                        placeholder='Instagram URL'
                        className={inputClass}
                    />
                </div>

                {/* Services */}
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm font-semibold text-[#024d4d]'>Services</p>
                        <button type='button' onClick={add_service} className='flex items-center gap-1 text-sm font-semibold text-[#04665a] hover:text-[#024d4d] transition-colors duration-300'>
                            <IoAdd /> Add Service
                        </button>
                    </div>

                    {services.map((service, index) => (
                        <div key={index} className='border-l-4 border-[#d1ca0b] bg-gray-50 rounded-r-2xl p-4 flex flex-col gap-2 relative'>
                            {services.length > 1 && (
                                <IoClose onClick={() => remove_service(index)} className='absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-[#024d4d] transition-colors duration-300' />
                            )}
                            <input
                                type='text' value={service.title}
                                onChange={(e) => handle_service_change(index, 'title', e.target.value)}
                                placeholder='Service Title'
                                className={inputClass + ' bg-transparent'}
                            />
                            <textarea
                                value={service.description}
                                onChange={(e) => handle_service_change(index, 'description', e.target.value)}
                                placeholder='Service Description'
                                rows={2}
                                className={inputClass + ' resize-none'}
                            />
                        </div>
                    ))}
                </div>

                {/* Education */}
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm font-semibold text-[#024d4d]'>Education</p>
                        <button type='button' onClick={add_education} className='flex items-center gap-1 text-sm font-semibold text-[#04665a] hover:text-[#024d4d] transition-colors duration-300'>
                            <IoAdd /> Add Education
                        </button>
                    </div>

                    {education.map((item, index) => (
                        <div key={index} className='border-l-4 border-[#04665a] bg-gray-50 rounded-r-2xl p-4 flex flex-col gap-2 relative'>
                            {education.length > 1 && (
                                <IoClose onClick={() => remove_education(index)} className='absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-[#024d4d] transition-colors duration-300' />
                            )}
                            <input type='text' value={item.degree} onChange={(e) => handle_education_change(index, 'degree', e.target.value)} placeholder='Degree' className={inputClass} />
                            <input type='text' value={item.institute} onChange={(e) => handle_education_change(index, 'institute', e.target.value)} placeholder='Institute' className={inputClass} />

                            <div className='flex gap-3'>
                                <input type='number' value={item.start_year} onChange={(e) => handle_education_change(index, 'start_year', e.target.value)} placeholder='Start Year' className={inputClass} />
                                <input type='number' value={item.end_year} onChange={(e) => handle_education_change(index, 'end_year', e.target.value)} placeholder='End Year' className={inputClass} />
                            </div>

                            <input type='text' value={item.grade} onChange={(e) => handle_education_change(index, 'grade', e.target.value)} placeholder='Grade' className={inputClass} />
                            <textarea value={item.description} onChange={(e) => handle_education_change(index, 'description', e.target.value)} placeholder='Description' rows={2} className={inputClass + ' resize-none'} />
                        </div>
                    ))}
                </div>

                {/* Certification */}
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm font-semibold text-[#024d4d]'>Certification</p>
                        <button type='button' onClick={add_cert} className='flex items-center gap-1 text-sm font-semibold text-[#04665a] hover:text-[#024d4d] transition-colors duration-300'>
                            <IoAdd /> Add Certificate
                        </button>
                    </div>

                    {certification.map((cert, index) => (
                        <div key={index} className='border-l-4 border-[#d1ca0b] bg-gray-50 rounded-r-2xl p-4 flex flex-col gap-2 relative'>
                            {certification.length > 1 && (
                                <IoClose onClick={() => remove_cert(index)} className='absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-[#024d4d] transition-colors duration-300' />
                            )}
                            <input type='text' value={cert.title} onChange={(e) => handle_cert_change(index, 'title', e.target.value)} placeholder='Certificate Title' className={inputClass} />
                            <input type='text' value={cert.organization} onChange={(e) => handle_cert_change(index, 'organization', e.target.value)} placeholder='Organization' className={inputClass} />
                            <input type='date' value={cert.issue_date} onChange={(e) => handle_cert_change(index, 'issue_date', e.target.value)} className={inputClass} />
                        </div>
                    ))}
                </div>

                <button
                    type='submit'
                    className='self-start bg-[#04665a] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#024d4d] hover:pr-8 transition-all duration-300'>
                    Save Details
                </button>
            </form>
        </section>
    )
}

export default AddDetails