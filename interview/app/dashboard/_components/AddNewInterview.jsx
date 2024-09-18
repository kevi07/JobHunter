"use client"
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/geminiAIModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPos, setJobPos] = useState()
  const [jobDesc, setJobDesc] = useState()
  const [jobExp, setJobExp] = useState()
  const [loading, setLoading] = useState(false)
  const [jsonRes, setJsonRes] = useState(false)
  const { user } = useUser()
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const inputPrompt = `Job Position: ${jobPos}, Job Description: ${jobDesc}, Years of Experience: ${jobExp}, Depends on this information please give me 5 Interview question with Answered in Json Format, Give question field and answer field in JSON data only`
    const result = await chatSession.sendMessage(inputPrompt)
    const MockJsonRes = (await result.response.text()).replace('```json', '').replace('```', '');
    if (MockJsonRes) {
      try {
        const parsedJson = JSON.parse(MockJsonRes)
        setJsonRes(parsedJson)

        const res = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockRes: MockJsonRes,
          jobDesc,
          jobExperience: jobExp,
          jobPosition: jobPos,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY')
        }).returning({ mockId: MockInterview.mockId })

        console.log('inserted id: ', res)

        if(res) {
          setOpenDialog(false)
          setLoading(false)
          router.push('/dashboard/interview/'+res[0]?.mockId)
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.log('Error while generating questions')
    }
  }

  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer">
        <h2 className="text-lg text-center" onClick={() => setOpenDialog(true)}>+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader >
            <DialogTitle className="text-2xl">Tell us more about Job you are interviewing</DialogTitle>
            <DialogDescription>
              <div>
                <h2>Add Details about job position, Your skills, and Year of experience</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mt-7 my-3">
                    <label>Job Position / Role name</label>
                    <Input placeholder="Ex. Full Stack Developer" required onChange={(e) => setJobPos(e.target.value)} />
                  </div>
                  <div className="my-3">
                    <label>Job Description / Tech Stack (in Short)</label>
                    <Textarea placeholder="Ex. React, Angular, NodeJS, MongoDB etc..." required onChange={(e) => setJobDesc(e.target.value)} />
                  </div>
                  <div className="my-3">
                    <label>Year of Experience</label>
                    <Input placeholder="Ex. 5" max="50" type="number" required onChange={(e) => setJobExp(e.target.value)} />
                  </div>
                  <div className="flex gap-5 justify-end">
                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Close</Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? <><LoaderCircle className="animate-spin" /> Generating... ✨</> : 'Start Interview'}
                    </Button>
                  </div>
                </form>
              </div>
            </DialogDescription>

          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddNewInterview