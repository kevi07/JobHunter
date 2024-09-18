"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview(params) {
    const [interviewData, setInterviewData] = useState()
    const [webcamEn, setWebcamEn] = useState(false)

    useEffect(() => {
        GetInterviewDetails()
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(
            eq(MockInterview.mockId, params.params.interviewId)
        )
        setInterviewData(result[0])
    }

    return (
        <div className="my-2" >
            <h2 className="my-2 flex font-bold text-2xl justify-center flex-col items-center">Let's Get Started!!!</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col my-3 gap-5">
                    <div className="flex flex-col p-5 rounded-lg border gap-5">
                        <h2 className='text-lg'><strong>Job Role / Job Position: </strong>{interviewData?.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Job Description / Tech Stack: </strong>{interviewData?.jobDesc}</h2>
                        <h2 className='text-lg'><strong>Years of Experience: </strong>{interviewData?.jobExperience}</h2>
                    </div>
                    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                        <h2 className="flex gap-2 items-center mb-2 text-yellow-500">
                            <Lightbulb /> <span><strong>Information</strong></span></h2>
                        <h2 className="mt-3 text-yellow-500">Enable Video Web Cam and Microphone to Start your Al Generated Mock Interview, It Has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want</h2>
                    </div>
                </div>
                <div>
                    {webcamEn ? <Webcam
                        onUserMedia={() => setWebcamEn(true)}
                        onUserMediaError={() => setWebcamEn(false)}
                        mirrored={true}
                        style={{ height: 400, width: 350 }}
                    /> : <><WebcamIcon className="h-72 w-full my-3 p-20 bg-secondary rounded-lg border" />
                        <Button variant="ghost" className="w-full" onClick={() => setWebcamEn(true)}>Enable Webcam and Microphone</Button>
                    </>
                    }
                    <div className="my-5 flex justify-end items-end ">
                        <Link href={'/dashboard/interview/' + params.params.interviewId + '/start'}>
                            <Button>Start Interview</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interview