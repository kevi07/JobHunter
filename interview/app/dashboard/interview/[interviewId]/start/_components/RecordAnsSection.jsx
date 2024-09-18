"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { chatSession } from '@/utils/geminiAIModel';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Mic } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam'
import { toast } from 'sonner';

function RecordAnsSection({ activeQn, qns, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("")
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript)
    ))
  }, [results])

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText()
      if (userAnswer?.length < 10) {
        toast('Error while saving your answer, Please record again')
        return
      }
      const qn = qns[activeQn]?.question
      const feedbackPrompt = "Question: " + qn + ", User Answer: " + userAnswer + ", Depends on question and user answer for given interview question" + "please give us rating for answer and feedback as area of improvement in any" + "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field in JSON data only"

      const result = await chatSession.sendMessage(feedbackPrompt)

      const MockJsonRes = (await result.response.text()).replace('```json', '').replace('```', '')

      if (MockJsonRes) {
        try {
          const parsedJson = JSON.parse(MockJsonRes)
          console.log(parsedJson)

          const res = await db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId,
            question: qns[activeQn]?.question,
            currectAnswer: qns[activeQn]?.answer,
            userAnswer: userAnswer,
            feedback: parsedJson.feedback,
            rating: parsedJson.rating,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY')
          })

          if (res) {
            toast('User answer recorded successfully')
          }

        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        console.log('Error while validating questions')
      }

    }
    else {
      startSpeechToText()
    }
  }


  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-10 bg-black justify-center items-center rounded-lg p-5">
        <Image src={'/webcam.png'} width={200} height={200} alt="webcam icon" className="absolute " />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline" className="p-2 mt-5"
        onClick={SaveUserAnswer}
      >
        {isRecording ?
          <h2 className="text-red-500 animate-pulse flex gap-2"><Mic /> Recording...</h2> : 'Record Answer'}
      </Button>
    </div>
  )
}

export default RecordAnsSection