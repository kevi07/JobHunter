"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection'
import RecordAnsSection from './_components/RecordAnsSection'

function StartInterview(params) {
    const [interviewData, setInterviewData] = useState(null)
    const [mockInterviewQns, setMockInterviewQns] = useState([])
    const [activeQn, setActiveQn] = useState(0)

    useEffect(() => {
        GetInterviewDetails()
    }, [])

    const GetInterviewDetails = async () => {
            const result = await db.select().from(MockInterview).where(
                eq(MockInterview.mockId, params.params.interviewId)
            )
            const jsonData = JSON.parse(result[0].jsonMockRes)
            setMockInterviewQns(jsonData)
            setInterviewData(result[0])
    }
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {mockInterviewQns && <QuestionSection 
                activeQn={activeQn}
                qns={mockInterviewQns} />}

                {mockInterviewQns && <RecordAnsSection
                    activeQn={activeQn}
                    qns={mockInterviewQns}
                    interviewData={interviewData}
                />
                }
            </div>
        </div>
    )
}

export default StartInterview