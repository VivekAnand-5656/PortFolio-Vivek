import React, { useState } from "react"
import axios from "axios"
import { FaGithub } from "react-icons/fa"
import { IoLogoVercel } from "react-icons/io5"
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

const AddProject = () => {

    const navigate = useNavigate()

    const api_base = "https://my-portfolio-32s5.onrender.com"

    const [formdata, setFormdata] = useState({
        title: "",
        details: "",
        gitlink: "",
        livelink: ""
    })

    const [techInput, setTechInput] = useState("")
    const [techstacks, setTechstacks] = useState([])
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)


    // Handle normal input
    const handle_change = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }


    // Add tech stack
    const add_tech = () => {

        const tech = techInput.trim()

        if (!tech) return

        setTechstacks([
            ...techstacks,
            tech
        ])

        setTechInput("")
    }


    // Remove tech stack
    const remove_tech = (index) => {

        setTechstacks(
            techstacks.filter((_, i) => i !== index)
        )
    }


    // Add tech on Enter
    const handle_key_down = (e) => {

        if (e.key === "Enter") {

            e.preventDefault()

            add_tech()
        }
    }


    // File select
    const handle_file_change = (e) => {

        const selectedFile = e.target.files[0]

        if (selectedFile) {
            setFile(selectedFile)
        }
    }


    // Submit
    const handle_submit = async (e) => {

        e.preventDefault()

        // Required validation
        if (!formdata.title.trim()) {
            alert("Project title is required")
            return
        }

        if (!formdata.details.trim()) {
            alert("Project details are required")
            return
        }

        if (techstacks.length === 0) {
            alert("Add at least one tech stack")
            return
        }

        if (!formdata.gitlink.trim()) {
            alert("GitHub link is required")
            return
        }

        if (!file) {
            alert("Project image is required")
            return
        }


        try {

            setLoading(true)


            // =====================================
            // FormData
            // =====================================

            const data = new FormData()


            // Required fields
            data.append(
                "title",
                formdata.title
            )

            data.append(
                "details",
                formdata.details
            )

            data.append(
                "gitlink",
                formdata.gitlink
            )


            // Optional live link
            if (formdata.livelink.trim()) {

                data.append(
                    "livelink",
                    formdata.livelink
                )
            }


            // List[str]
            // FastAPI:
            // techstacks: List[str] = Form(...)

            techstacks.forEach((tech) => {

                data.append(
                    "techstacks",
                    tech
                )

            })


            // File
            // FastAPI:
            // file: UploadFile | None = File(None)

            data.append(
                "file",
                file
            )


            // =====================================
            // Axios Request
            // =====================================

            const response = await axios.post(
                `${api_base}/admin/addproject`,
                data
            )


            console.log(response.data)

            alert("Project Added Successfully")


            // Reset
            setFormdata({
                title: "",
                details: "",
                gitlink: "",
                livelink: ""
            })

            setTechstacks([])

            setTechInput("")

            setFile(null)

            document.getElementById(
                "project-file"
            ).value = ""


        } catch (error) {

            console.log(
                error.response?.data?.detail ||
                error.message
            )

            alert(
                error.response?.data?.detail ||
                "Something went wrong"
            )

        } finally {

            setLoading(false)
        }
    }


    return (

        <section className="w-[95%] sm:w-[85%] max-w-2xl mx-auto my-8">

            {/* Back */}
            <button
                type="button"
                className="p-2 rounded cursor-pointer text-white"
                onClick={() => navigate("/adminhome")}
            >
                🔙
            </button>


            <form
                onSubmit={handle_submit}
                className="bg-[#f8fefe] rounded-3xl p-5 sm:p-6 flex flex-col gap-3 border border-[#024d4d]/20"
            >

                <h3 className="text-xl sm:text-2xl font-bold text-[#024d4d] mb-1">
                    Add New Project
                </h3>


                {/* =========================
                    TITLE
                ========================= */}

                <input
                    type="text"
                    name="title"
                    value={formdata.title}
                    onChange={handle_change}
                    placeholder="Project Title"
                    required
                    className="w-full border-b-2 border-gray-300 focus:border-[#04665a] px-2 py-2 outline-none bg-transparent transition-colors duration-300"
                />


                {/* =========================
                    DETAILS
                ========================= */}

                <textarea
                    name="details"
                    value={formdata.details}
                    onChange={handle_change}
                    placeholder="Project Details"
                    rows={3}
                    required
                    className="w-full border-b-2 border-gray-300 focus:border-[#04665a] px-2 py-2 outline-none resize-none bg-transparent transition-colors duration-300"
                />


                {/* =========================
                    TECH STACKS
                ========================= */}

                <div className="flex flex-col gap-2">

                    <div className="flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-[#04665a] transition-colors duration-300">

                        <input
                            type="text"
                            value={techInput}
                            onChange={(e) =>
                                setTechInput(e.target.value)
                            }
                            onKeyDown={handle_key_down}
                            placeholder="Type a tech and press Enter"
                            className="flex-1 px-2 py-2 outline-none bg-transparent"
                        />

                        <button
                            type="button"
                            onClick={add_tech}
                            className="text-sm font-semibold text-[#04665a] hover:text-[#024d4d] transition-colors duration-300 px-2"
                        >
                            Add
                        </button>

                    </div>


                    {/* Tech Tags */}

                    {techstacks.length > 0 && (

                        <div className="flex flex-wrap gap-2">

                            {techstacks.map((tech, index) => (

                                <span
                                    key={index}
                                    className="flex items-center gap-1 bg-[#d1ca0b] text-black text-[0.75rem] px-2 py-1 rounded-full"
                                >

                                    {tech}

                                    <IoClose
                                        onClick={() =>
                                            remove_tech(index)
                                        }
                                        className="cursor-pointer hover:text-[#024d4d] transition-colors duration-300"
                                    />

                                </span>

                            ))}

                        </div>

                    )}

                </div>


                {/* =========================
                    GITHUB
                ========================= */}

                <div className="flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-[#04665a] transition-colors duration-300">

                    <FaGithub className="text-gray-500" />

                    <input
                        type="url"
                        name="gitlink"
                        value={formdata.gitlink}
                        onChange={handle_change}
                        placeholder="GitHub Link"
                        required
                        className="flex-1 px-2 py-2 outline-none bg-transparent"
                    />

                </div>


                {/* =========================
                    LIVE LINK - OPTIONAL
                ========================= */}

                <div className="flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-[#04665a] transition-colors duration-300">

                    <IoLogoVercel className="text-gray-500" />

                    <input
                        type="url"
                        name="livelink"
                        value={formdata.livelink}
                        onChange={handle_change}
                        placeholder="Live Demo Link (Optional)"
                        className="flex-1 px-2 py-2 outline-none bg-transparent"
                    />

                </div>


                {/* =========================
                    PROJECT IMAGE
                ========================= */}

                <div className="flex flex-col gap-2">

                    <label className="text-sm font-semibold text-[#024d4d]">
                        Project Image
                    </label>

                    <input
                        id="project-file"
                        type="file"
                        accept="image/*"
                        onChange={handle_file_change}
                        required
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-transparent cursor-pointer"
                    />

                    {file && (

                        <p className="text-sm text-gray-500">
                            {file.name}
                        </p>

                    )}

                </div>


                {/* =========================
                    SUBMIT
                ========================= */}

                <button
                    type="submit"
                    disabled={loading}
                    className="self-start bg-[#04665a] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#024d4d] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >

                    {loading
                        ? "Saving..."
                        : "Save Project"
                    }

                </button>

            </form>

        </section>
    )
}

export default AddProject