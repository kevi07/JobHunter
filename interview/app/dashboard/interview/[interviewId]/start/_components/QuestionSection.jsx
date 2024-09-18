import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection(params) {
  const textToSpeech = (text)=>{
     if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
     }else{
      alert('Sorry, Your browser does not support text to speech')
     }
  }
  return (
    <div>
      <div className="p-5 border my-10 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {params.qns.map((qn, index) =>
          (
            <h2 key={index} className={`p-2  rounded-full
            text-sm md:text-xs text-center cursor-pointer
            ${params.activeQn === index ? 'bg-primary text-white' : 'bg-secondary'}`}>Question #{index + 1}</h2>
          )
          )}
        </div>
        <h2 className="my-5 text-md font-bold md:text-sm">{
          params.qns[params.activeQn]?.question
        }</h2>
        <Volume2 className="cursor-pointer" onClick={()=> textToSpeech(params.qns[params.activeQn]?.question)}/>

        <div className="border rounded-lg p-5 bg-blue-100 mt-3">
          <h2 className="mb-2 flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note: </strong>
          </h2>
          <h2 className="text-md text-primary">
            Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to comapre it.
          </h2>
        </div>

      </div>
    </div>
  )
}

export default QuestionSection