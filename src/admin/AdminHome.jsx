import React, { useEffect, useState } from 'react'
import axios from "axios"
import { FaGithub } from "react-icons/fa"
import { IoLogoVercel } from "react-icons/io5"
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'

const AdminHome = () => {
    const navigate = useNavigate()
    const api_base = "https://my-portfolio-32s5.onrender.com"

    const [projects, setProjects] = useState([])
    const [details, setDetails] = useState({})

    const fetch_projects = async () => {
        try {
            const response = await axios.get(`${api_base}/admin/getprojects`)
            setProjects(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetch_details = async () => {
        try {
            const response = await axios.get(`${api_base}/admin/getdetails`)
            setDetails(response.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    // ============== Update Project ===========
    const [showProject, setShowProject] = useState(false)
    const [formdata, setFormdata] = useState({
        title: "",
        details: "",
        gitlink: "",
        livelink: "",
        createdAt: ""
    })

    const [techInput, setTechInput] = useState("")
    const [techstacks, setTechstacks] = useState([])
    const [pId, setPId] = useState("")

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
            const response = await axios.put(`${api_base}/admin/updateproject/${pId}`, payload)
            alert("Project Updated")
            setPId("")
            setShowProject(false)
            await fetch_projects()
            setFormdata({ title: "", details: "", gitlink: "", livelink: "", createdAt: "" })
            setTechstacks([])
        } catch (error) {
            alert("Something went wrong")
            console.log(error.response?.data?.detail || "Something went wrong")
        }
    }

    // ============= About Update ===============
    const [showAbout, setShowAbout] = useState(false)
    const [aboutId, setAboutId] = useState("")
    const [abouttext, setAbouttext] = useState("")

    const update_about = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${api_base}/admin/updateabout/${aboutId}`, null,
                {
                    params: {
                        about: abouttext
                    }
                }
            )
            alert("About Updated")
            await fetch_details()
            setShowAbout(false)

        } catch (error) {
            console.log(error.response?.data?.detail || "Something went wrong")
            console.log(`Error:- ${error}`)
        }
    }

    // ======== Add Skills ==========
    const [newskill, setNewskill] = useState("")
    const add_skill = async (skillid) => {
        try {
            const response = await axios.put(`${api_base}/admin/updateskills/${skillid}`, null,
                {
                    params: {
                        skill: newskill
                    }
                }
            )
            alert("Skill Updated")
            await fetch_details()
            setNewskill("")

        } catch (error) {
            console.log(error.response?.data?.detail || "Something went wrong")
            console.log(`Error:- ${error}`)
        }
    }

    // ====== Update Service ======
    const [showService, setShowService] = useState(false)
    const [serviceForm, setServiceForm] = useState({
        title: "",
        description: ""
    })

    const service_change = (e) => {
        setServiceForm({ ...serviceForm, [e.target.name]: e.target.value })
    }

    const update_service = async (d_id) => {
        try {
            const response = await axios.put(`${api_base}/admin/updateservice/${d_id}`, serviceForm)
            alert("Service Updated ")
            await fetch_details()
            setServiceForm({
                title: "",
                description: ""
            })
            setShowService(false)

        } catch (error) {
            console.log(error.response?.data?.detail || "Something went wrong")
            console.log(`Error:- ${error}`)
        }
    }

    // ============== Update Social Links ========
    const [showlink, setShowlink] = useState(false)
    const [linkform, setLinkform] = useState({
        github: "",
        linkedin: "",
        instagram: ""
    })

    const link_change = (e) => {
        setLinkform({ ...linkform, [e.target.name]: e.target.value })
    }
    const update_link = async (d_id) => {
        try {
            const response = await axios.put(`${api_base}/admin/updatesociallink/${d_id}`,
                linkform
            )
            await fetch_details()
            alert("Links Updated")
            setLinkform({
                github: "",
                linkedin: "",
                instagram: ""
            })
            setShowlink(false)
        } catch (error) {
            console.log(error.response?.data?.detail || "Something went wrong")
            console.log(`Error:- ${error}`)
        }
    }

    // =========== Add Education ==========
    const [showedu, setShowedu] = useState(false)
    const [eduForm, setEduForm] = useState({
        degree: "",
        institute: "",
        start_year: "",
        end_year: "",
        grade: "",
        description: ""
    })

    const edu_change = (e) => {
        setEduForm({ ...eduForm, [e.target.name]: e.target.value })
    }
    const add_edu = async (d_id) => {
        try {
            await axios.put(`${api_base}/admin/updateeducation/${d_id}`,
                eduForm
            )
            await fetch_details()
            alert("Education Addedd")
            setEduForm({
                degree: "",
                institute: "",
                start_year: "",
                end_year: "",
                grade: "",
                description: ""
            })
            setShowedu(false)
        } catch (error) {
            console.log(error.response?.data?.detail || "Something went wrong")
            console.log(`Error:- ${error}`)
        }
    }

    // ======= Add Certification ==========
    const [showctfcn, setShowctfcn] = useState(false)
    const [certiForm, setCertiForm] = useState({
        title: "",
        organization: "",
        issue_date: ""
    })

    const certi_change = (e) => {
        setCertiForm({ ...certiForm, [e.target.name]: e.target.value })
    }
    const add_certification = async (d_id) => {
        try {
            await axios.put(`${api_base}/admin/updatecertification/${d_id}`, certiForm)
            await fetch_details()
            alert("Certification Added")
            setShowctfcn(false)
        } catch (error) {
            console.log(error.response?.data?.detail || "Something went wrong")
            console.log(`Error:- ${error}`)
        }
    }

    // ---------- Delete handlers ----------
    const delete_project = async (id) => {
        if (!window.confirm("Delete this project?")) return
        try {
            await axios.delete(`${api_base}/admin/deleteproject/${id}`)
            setProjects(projects.filter((p) => p._id !== id))
            await fetch_projects()
        } catch (error) {
            alert("Something went wrong")
        }
    }

    const delete_skill = async (id, skil) => {
        if (!window.confirm("Delete this skill?")) return
        try {
            await axios.delete(`${api_base}/admin/deleteskill/${id}`,
                {
                    params: {
                        skill: skil
                    }
                }
            )

            await fetch_details()
            alert("Skill deleted")
        } catch (error) {
            alert("Something went wrong")
        }
    }

    const delete_service = async (id, servicetitle) => {
        if (!window.confirm("Delete this service?")) return
        try {
            await axios.delete(`${api_base}/admin/deleteservice/${id}`,
                {
                    params: {
                        title: servicetitle
                    }
                }
            )
            await fetch_details()
            alert("Service Deleted")

        } catch (error) {
            alert("Something went wrong")
        }
    }

    const delete_education = async (id, edudegree) => {
        if (!window.confirm("Delete this education entry?")) return
        try {
            await axios.delete(`${api_base}/admin/deleteeducation/${id}`,
                {
                    params: {
                        degree: edudegree
                    }
                }
            )
            await fetch_details()
            alert("Education Deleted")
        } catch (error) {
            alert("Something went wrong")
        }
    }

    const delete_certification = async (id, certtitle) => {
        if (!window.confirm("Delete this certificate?")) return
        try {
            await axios.delete(`${api_base}/admin/deletecertofocatopn/${id}`,
                {
                    params: {
                        title: certtitle
                    }
                }
            )
            await fetch_details()
        } catch (error) {
            alert("Something went wrong")
        }
    }

    const row = 'flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0'
    const iconBtn = 'w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300'
    const updateBtn = 'flex items-center gap-1 bg-[#04665a] text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#024d4d] transition-colors duration-300 cursor-pointer'
    const addBtn = 'bg-[#d1ca0b] text-black text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#024d4d] hover:text-white transition-colors duration-300 cursor-pointer'
    const fieldInput = 'w-full border-b-2 border-gray-300 focus:border-[#04665a] px-2 py-2 outline-none bg-transparent transition-colors duration-300'
    const panelWrap = (show) => `overflow-hidden transition-all duration-500 ease-in-out ${show ? 'max-h-[900px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`
    const panelInner = 'bg-gray-50 rounded-2xl p-4 flex flex-col gap-3 border border-[#024d4d]/10'
    const closeBtn = 'self-end w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-red-600 transition-colors duration-300'

    useEffect(() => {
        fetch_projects()
        fetch_details()
    }, [])

    return (
        <div className='w-[95%] sm:w-[85%] max-w-4xl mx-auto my-8 flex flex-col gap-6'>
            <button onClick={() => navigate("/adddetail")} className={addBtn}>Add Details</button>

            {/* Projects */}
            <div className='bg-white rounded-2xl p-5 border border-gray-200'>
                <div className='w-full flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold text-[#024d4d]'>Projects</h3>
                    <button onClick={() => navigate("/addproject")} className={addBtn}>Add</button>
                </div>

                {projects?.map((project) => (
                    <div key={project._id} className={row}>
                        <div>
                            <p className='font-medium'>{project.title}</p>
                            <div className='flex gap-2 mt-1 flex-wrap'>
                                {project.techstacks?.map((tech, i) => (
                                    <span key={i} className='text-xs text-gray-500'>{tech}{i < project.techstacks.length - 1 ? ',' : ''}</span>
                                ))}
                            </div>
                        </div>

                        <div className='flex items-center gap-1 shrink-0'>
                            <a href={project.gitlink} target='_blank' rel='noopener noreferrer' className={iconBtn}><FaGithub /></a>
                            <a href={project.livelink} target='_blank' rel='noopener noreferrer' className={iconBtn}><IoLogoVercel /></a>
                            <button className={iconBtn} onClick={() => {
                                setShowProject(true)
                                setPId(project._id)
                            }}><FiEdit2 /></button>
                            <button onClick={() => delete_project(project._id)} className={iconBtn + ' hover:text-red-600'}><FiTrash2 /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* About */}
            <div className='bg-white rounded-2xl p-5 border border-gray-200'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-lg font-semibold text-[#024d4d]'>About</h3>
                    <button onClick={() => {
                        setShowAbout(!showAbout)
                        setAboutId(details._id)
                    }} className={updateBtn}>Update <FiEdit2 /></button>
                </div>
                <p className='text-sm text-gray-600 mt-2'>{details.about}</p>

                <div className={panelWrap(showAbout)}>
                    <div className={panelInner}>
                        <button className={closeBtn} onClick={() => setShowAbout(false)}><FiX /></button>
                        <textarea
                            name="about" placeholder='Write about yourself........'
                            className={fieldInput + ' resize-none'}
                            rows={3}
                            value={abouttext}
                            onChange={(e) => setAbouttext(e.target.value)}
                        ></textarea>
                        <button className='self-start bg-[#04665a] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#024d4d] transition-colors duration-300'
                            onClick={update_about}
                        >Update</button>
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className='bg-white rounded-2xl p-5 border border-gray-200'>
                <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold text-[#024d4d]'>Skills</h3>
                </div>

                {/* ===== Add Skill ===== */}
                <div className='flex items-center mb-3 gap-2'>
                    <input type="text" placeholder='Add skills...' className={fieldInput}
                        value={newskill}
                        onChange={(e) => setNewskill(e.target.value)}
                    />
                    <button className='shrink-0 bg-[#04665a] rounded-full cursor-pointer text-white px-4 py-2 text-sm font-semibold hover:bg-[#024d4d] transition-colors duration-300'
                        onClick={() => add_skill(details._id)}
                    >Add</button>
                </div>

                <div className='flex flex-wrap gap-2'>
                    {details.skills?.map((skill, i) => (
                        <span key={i} className='flex items-center gap-1 text-xs bg-gray-100 px-3 py-1.5 rounded-full'>
                            {skill}
                            <FiTrash2 className='cursor-pointer hover:text-red-600 transition-colors duration-300' onClick={() => delete_skill(details._id, skill)} />
                        </span>
                    ))}
                </div>
            </div>

            {/* Services */}
            <div className='bg-white rounded-2xl p-5 border border-gray-200'>
                <h3 className='text-lg font-semibold text-[#024d4d] mb-2'>Services</h3>
                {details.services?.map((service, index) => (
                    <div key={index} className={row}>
                        <div>
                            <p className='font-medium'>{service.title}</p>
                            <p className='text-xs text-gray-500'>{service.description}</p>
                        </div>
                        <div className='flex items-center gap-1 shrink-0'>
                            <button className={iconBtn}
                                onClick={() => setShowService(!showService)} ><FiEdit2 /></button>
                            <button onClick={() => delete_service(details._id, service.title)} className={iconBtn + ' hover:text-red-600'}><FiTrash2 /></button>
                        </div>
                    </div>
                ))}

                {/* ========= Update Service ====== */}
                <div className={panelWrap(showService)}>
                    <div className={panelInner}>
                        <button className={closeBtn} onClick={() => setShowService(false)}><FiX /></button>
                        <input type="text" className={fieldInput} placeholder='Full Stack Developer' required
                            name='title'
                            value={serviceForm.title}
                            onChange={service_change}
                        />
                        <input type="text" className={fieldInput} placeholder='Details............' required
                            name='description'
                            value={serviceForm.description}
                            onChange={service_change}
                        />
                        <button className='self-start bg-[#04665a] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#024d4d] transition-colors duration-300'
                            onClick={() => update_service(details._id)}
                        >Update</button>
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className='bg-white rounded-2xl p-5 border border-gray-200'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-lg font-semibold text-[#024d4d]'>Social Links</h3>
                    <button onClick={() => setShowlink(!showlink)} className={updateBtn}>Update <FiEdit2 /></button>
                </div>
                <div className='flex flex-col gap-1 mt-2 text-sm text-gray-600'>
                    <p>GitHub: {details.socialLinks?.github}</p>
                    <p>LinkedIn: {details.socialLinks?.linkedin}</p>
                    <p>Instagram: {details.socialLinks?.instagram}</p>
                </div>

                {/* ====== Update Social Links ===== */}
                <div className={panelWrap(showlink)}>
                    <div className={panelInner}>
                        <button className={closeBtn} onClick={() => setShowlink(false)}><FiX /></button>
                        <input type="text" className={fieldInput} placeholder='Github'
                            name="github"
                            value={linkform.github}
                            onChange={link_change}
                        />
                        <input type="text" className={fieldInput} placeholder='Linkedin'
                            name='linkedin'
                            value={linkform.linkedin}
                            onChange={link_change}
                        />
                        <input type="text" className={fieldInput} placeholder='Instagram'
                            name='instagram'
                            value={linkform.instagram}
                            onChange={link_change}
                        />
                        <button className='self-start bg-[#04665a] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#024d4d] transition-colors duration-300'
                            onClick={() => update_link(details._id)}
                        >Update</button>
                    </div>
                </div>
            </div>

            {/* Education */}
            <div className='bg-white rounded-2xl p-5 border border-gray-200'>
                <div className='w-full flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold text-[#024d4d]'>Education</h3>
                    <button className={addBtn} onClick={() => setShowedu(!showedu)}>Add</button>
                </div>
                {details.education?.map((item, index) => (
                    <div key={index} className={row}>
                        <div>
                            <p className='font-medium'>{item.degree}</p>
                            <p className='text-xs text-gray-500'>{item.institute} · {item.start_year} - {item.end_year}</p>
                        </div>
                        <div className='flex items-center gap-1 shrink-0'>
                            <button onClick={() => delete_education(details._id, item.degree)} className={iconBtn + ' hover:text-red-600'}><FiTrash2 /></button>
                        </div>
                    </div>
                ))}

                <div className={panelWrap(showedu)}>
                    <div className={panelInner}>
                        <button className={closeBtn} onClick={() => setShowedu(false)}><FiX /></button>
                        <input type="text" className={fieldInput} placeholder='Degree (B.A, BCA, B.Tech, etc)'
                            name="degree"
                            value={eduForm.degree}
                            onChange={edu_change}
                        />
                        <input type="text" className={fieldInput} placeholder='Institute'
                            name='institute'
                            value={eduForm.institute}
                            onChange={edu_change}
                        />
                        <div className='flex gap-3'>
                            <input type="text" className={fieldInput} placeholder='Start Year'
                                name='start_year'
                                value={eduForm.start_year}
                                onChange={edu_change}
                            />
                            <input type="text" className={fieldInput} placeholder='End Year'
                                name="end_year"
                                value={eduForm.end_year}
                                onChange={edu_change}
                            />
                        </div>
                        <input type="text" className={fieldInput} placeholder='Grade'
                            name='grade'
                            value={eduForm.grade}
                            onChange={edu_change}
                        />
                        <input type="text" className={fieldInput} placeholder='Details....'
                            name='description'
                            value={eduForm.description}
                            onChange={edu_change}
                        />
                        <button className='self-start bg-[#04665a] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#024d4d] transition-colors duration-300'
                            onClick={() => add_edu(details._id)}
                        >Update</button>
                    </div>
                </div>
            </div>

            {/* Certification */}
            <div className='bg-white rounded-2xl p-5 border border-gray-200'>
                <div className='w-full flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold text-[#024d4d]'>Certification</h3>
                    <button className={addBtn} onClick={() => setShowctfcn(!showctfcn)}>Add</button>
                </div>
                {details.certification?.map((cert, index) => (
                    <div key={index} className={row}>
                        <div>
                            <p className='font-medium'>{cert.title}</p>
                            <p className='text-xs text-gray-500'>{cert.organization}</p>
                        </div>
                        <div className='flex items-center gap-1 shrink-0'>
                            <button onClick={() => delete_certification(details._id, cert.title)} className={iconBtn + ' hover:text-red-600'}><FiTrash2 /></button>
                        </div>
                    </div>
                ))}

                {/* ======= Add Certification ===== */}
                <div className={panelWrap(showctfcn)}>
                    <div className={panelInner}>
                        <button className={closeBtn} onClick={() => setShowctfcn(false)}><FiX /></button>
                        <input type="text" className={fieldInput} placeholder='Python Development, Full Stack Development'
                            name="title"
                            value={certiForm.title}
                            onChange={certi_change}
                        />
                        <input type="text" className={fieldInput} placeholder='Organization'
                            name='organization'
                            value={certiForm.organization}
                            onChange={certi_change}
                        />
                        <input type="text" className={fieldInput} placeholder='Issue Date - 2026'
                            name='issue_date'
                            value={certiForm.issue_date}
                            onChange={certi_change}
                        />
                        <button className='self-start bg-[#04665a] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#024d4d] transition-colors duration-300'
                            onClick={() => add_certification(details._id)}
                        >Update</button>
                    </div>
                </div>
            </div>

            {/* ================ Update Project Modal =============== */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-500 ease-in-out ${showProject ? 'bg-black/50 opacity-100 pointer-events-auto' : 'bg-black/0 opacity-0 pointer-events-none'}`}>
                <div className={`w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 transition-all duration-500 ease-in-out ${showProject ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                    <button className={closeBtn} onClick={() => setShowProject(false)}><FiX /></button>

                    <form onSubmit={handle_submit} className='flex flex-col gap-3'>
                        <h3 className='text-xl sm:text-2xl font-bold text-[#024d4d] mb-1'>Update Project</h3>

                        <input
                            type='text' name='title' value={formdata.title} onChange={handle_change}
                            placeholder='Project Title'
                            className={fieldInput}
                        />

                        <textarea
                            name='details' value={formdata.details} onChange={handle_change}
                            placeholder='Project Details'
                            rows={3}
                            className={fieldInput + ' resize-none'}
                        />

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
                            className={fieldInput}
                        />

                        <button
                            type='submit'
                            className='self-start bg-[#04665a] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#024d4d] hover:pr-8 transition-all duration-300'>
                            Save Project
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AdminHome