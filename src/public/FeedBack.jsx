import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const FeedBack = () => {

    const feedbacks = [
        {
            name: 'Rahul Sharma',
            role: 'Startup Founder',
            rating: 5,
            message: 'Great portfolio and very clean design. The projects are presented really well.'
        },
        {
            name: 'Priya Singh',
            role: 'Business Owner',
            rating: 5,
            message: 'Loved the overall design and smooth user experience. Everything feels professional.'
        },
        {
            name: 'Aman Kumar',
            role: 'Developer',
            rating: 4,
            message: 'Nice work! The project section and animations make the portfolio stand out.'
        },
        {
            name: 'Neha Verma',
            role: 'Entrepreneur',
            rating: 5,
            message: 'Very impressive portfolio. Clean UI, good colors and easy to navigate.'
        }
    ]

    return (
        <section className='w-[95%] sm:w-[92%] max-w-6xl mx-auto py-8 sm:py-10'>

            <div className='mb-6'>
                <span className='text-xs sm:text-sm uppercase tracking-[5px] text-[#c809c8]'>
                    -- Feedback
                </span>

                <h2 className='text-2xl sm:text-3xl font-bold text-white mt-2'>
                    What People Say
                </h2>

                <p className='text-sm text-gray-400 mt-1'>
                    Feedback from people who explored my work.
                </p>
            </div>


            {/* Feedback Scroll */}
            <div className='w-full flex gap-4 overflow-x-auto scroll-smooth pb-4
            snap-x snap-mandatory scrollbar-hide'>

                {feedbacks.map((feedback, index) => (

                    <div
                        key={index}
                        className='shrink-0 w-[85%] sm:w-[48%] lg:w-[32%]
                        snap-start p-5 rounded-2xl
                        bg-white/[0.04] border border-white/10
                        hover:border-[#c809c8]/50
                        hover:-translate-y-1
                        transition-all duration-300'
                    >

                        {/* Profile */}
                        <div className='flex justify-between items-center gap-3'>

                            <div className='flex items-center gap-3'>

                                <div className='w-11 h-11 rounded-full
                                flex justify-center items-center
                                bg-gradient-to-br from-[#c809c8] to-[#04b3a8]
                                text-white'>
                                    <FaUserCircle className='text-2xl' />
                                </div>

                                <div>
                                    <h3 className='text-white font-semibold'>
                                        {feedback.name}
                                    </h3>

                                    <p className='text-xs text-gray-500'>
                                        {feedback.role}
                                    </p>
                                </div>

                            </div>

                            <span className='text-xs text-gray-600'>
                                0{index + 1}
                            </span>

                        </div>


                        {/* Rating */}
                        <div className='mt-4 text-sm'>
                            {'⭐'.repeat(feedback.rating)}
                        </div>


                        {/* Message */}
                        <p className='text-sm text-gray-400 leading-6 mt-3'>
                            "{feedback.message}"
                        </p>

                    </div>

                ))}

            </div>

        </section>
    )
}

export default FeedBack