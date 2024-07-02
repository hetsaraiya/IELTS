import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
const VITE_REACT_APP_SERVER = import.meta.env.VITE_REACT_APP_SERVER;
import { Search, PencilLine, ListChecks } from "lucide-react";

const ReadingTestCards = () => {
    const [selectedQTypes, setSelectedQTypes] = useState([]);

   const handleQTypeChange = (qtype) => {
    if (selectedQTypes.includes(qtype)) {
       setSelectedQTypes(selectedQTypes.filter((selected) => selected !== qtype));
    } else {
       setSelectedQTypes([...selectedQTypes, qtype]);
    }
 };

    const [tests, setTests] = useState([]);
    const [error, setError] = useState('');
    const [questions,setQuestions] = useState([]);
    const [openSolution,setOpenSolution] = useState(false)
    const [sortedQuestions, setSortedQuestions] = useState({});
   

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get(`${VITE_REACT_APP_SERVER}/api/test-questions/`);
                setTests(response.data);
                console.log(tests)
            } catch (err) {
                setError('Error fetching data');
            }
        };
            fetchTests();     
    }, []);

    const sortQuestions = (questions) => {
      const sorted = {};
  
      questions.forEach((ques) => {
          if (!sorted[ques.question_type]) {
              sorted[ques.question_type] = [];
          }
          sorted[ques.question_type].push(ques);
      });
  
      return sorted;
  };

    useEffect(() => {
      if (questions.length > 0) {
          const sorted = sortQuestions(questions);
          setSortedQuestions(sorted);
          console.log("Sorted Questions:", sorted);
      }
  }, [questions]);

    const viewSolution = ((testId) => {
      const fetchQuestions = async () => {
          try {
              const response = await axios.get(`${VITE_REACT_APP_SERVER}/api/getTestQuestions/?test_id=${testId}`);
              setQuestions(response.data);
              console.log(questions)
              setOpenSolution(true)
          } catch (err) {
              setError('Error fetching data');
          }
      };

      if (testId) {
          fetchQuestions();
      } else {
          setError('No test ID provided');
      }
  });

  const filteredTests = tests.filter(test => test.type === 'Reading');
  console.log(filteredTests)

  return (
    <div className='font-prompt '>
      {filteredTests.length > 0 && <>
        {openSolution && <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex justify-center">
            <div className="md:w-[450px] w-[300px] h-fit  bg-white mt-10 flex flex-col justify-center px-10 py-10">
               <div className="flex justify-between"><p className="text-[18px] font-medium text-[#2B2D42] mb-2 ">Solution</p> <p onClick={()=>setOpenSolution(false)} className="cursor-pointer text-[18px] font-medium text-[#2B2D42]  ">X</p></div>
               {sortedQuestions["Sentence Completion MCQ"]?.length > 0 && 
                 <div className="flex gap-x-4 gap-y-2 mt-2">
                  {sortedQuestions["Sentence Completion MCQ"].map((question,index)=>{
                    return(
                      <p className="text-[14px] font-medium text-[#2b2d42] ">{question.qno}. {question.answer}</p>
                    )
                  })}
                </div>}
                {sortedQuestions["MCQ"]?.length > 0 && 
                 <div className="flex gap-x-4  gap-y-2 mt-2 ">
                  {sortedQuestions["MCQ"].map((question,index)=>{
                    return(
                      <>
                      <p className="text-[14px] font-medium text-[#2b2d42] ">{question.qno}. {question.answer}</p>
                      <p className="text-[14px] font-medium text-[#2b2d42] ">{question.qno}. {question.answer2}</p>
                      </>
                    )
                  })}
                </div>}
                {sortedQuestions["Matching Information"]?.length > 0 && 
                 <div className="flex gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Matching Information"].map((question,index)=>{
                    return(
                      <>
                      <p className="text-[14px] font-medium text-[#2b2d42] ">{question.qno}. {question.answer}</p>
                      </>
                    )
                  })}
                </div>}
                {sortedQuestions["Summary Completion"]?.length > 0 && 
                 <div className="flex gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Summary Completion"].map((question,index)=>{
                    return(
                      <>
                      <p className="text-[14px] font-medium text-[#2b2d42] ">{question.qno}. {question.answer}</p>
                      </>
                    )
                  })}
                </div>}
                {sortedQuestions["True False"]?.length > 0 && 
                 <div className="flex gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["True False"].map((question,index)=>{
                    return(
                      <>
                      <p className="text-[14px] font-medium text-[#2b2d42] ">{question.qno}. {question.answer}</p>
                      </>
                    )
                  })}
                </div>}
                {sortedQuestions["Yes No"]?.length > 0 && 
                 <div className="flex gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Yes No"].map((question,index)=>{
                    return(
                      <>
                      <p className="text-[14px] font-medium text-[#2b2d42] ">{question.qno}. {question.answer}</p>
                      </>
                    )
                  })}
                </div>}
                {sortedQuestions["Matching Heading"]?.length > 0 && 
                 <div className="flex gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Matching Heading"].map((question,index)=>{
                    return(
                      <>
                      <p className="text-[14px] font-medium text-[#2b2d42] ">{question.qno}. {question.answer}</p>
                      </>
                    )
                  })}
                </div>}
                {sortedQuestions["Diagram"]?.length > 0 && (
                <div className="flex gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Diagram"].map((question, index) => {
                    return (
                      <>
                        {question.answer && (
                          <p className="text-[14px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer}
                          </p>
                        )}
                        {question.answer2 && (
                          <p className="text-[14px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer2}
                          </p>
                        )}
                        {question.answer3 && (
                          <p className="text-[14px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer3}
                          </p>
                        )}
                        {question.answer4 && (
                          <p className="text-[14px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer4}
                          </p>
                        )}
                        {question.answer5 && (
                          <p className="text-[14px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer5}
                          </p>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
            </div>
            </div>}

      <div className='w-screen flex md:flex-row flex-col lg:mt-[100px] md:mt-[80px] mt-[40px] items-center md:items-start justify-center gap-x-[14px]'>

        <div className='w-[300px] h-[290px] bg-[#2B2D42] mb-5 md:mb-0 px-6 py-8 '>
           <p className='font-semibold text-[18px] text-white '>Question Type: </p>

           <div className='mt-[18px] flex flex-col gap-y-[5px]'>
            <div className='flex gap-x-[14px] items-center'>
                <input type='checkbox' value="Matching Information" checked={selectedQTypes.includes("Matching Information")} 
              onChange={() => handleQTypeChange("Matching Information")}  className='w-4 h-4 rounded-[2px] bg-transparent '/>
                <label className='font-medium text-[14px] text-white '>Matching Information</label>
            </div>
            <div className='flex gap-x-[14px] items-center'>
                <input type='checkbox' value="MCQ" checked={selectedQTypes.includes("MCQ")} 
              onChange={() => handleQTypeChange("MCQ")} className='w-4 h-4 rounded-[2px] bg-transparent '/>
                <label className='font-medium text-[14px] text-white '>MCQ</label>
            </div>
            <div className='flex gap-x-[14px] items-center'>
                <input type='checkbox' checked={selectedQTypes.includes("Diagram")} 
              onChange={() => handleQTypeChange("Diagram")}  value="Diagram" className='w-4 h-4 rounded-[2px] bg-transparent '/>
                <label className='font-medium text-[14px] text-white '>Plan, map, diagram, labelling</label>
            </div>
            <div className='flex gap-x-[14px] items-center'>
                <input type='checkbox' checked={selectedQTypes.includes("Sentence Completion MCQ")} 
              onChange={() => handleQTypeChange("Sentence Completion MCQ")}  value="Sentence Completion MCQ" className='w-4 h-4 rounded-[2px] bg-transparent '/>
                <label className='font-medium text-[14px] text-white '>Sentence Completion MCQ</label>
            </div>
            <div className='flex gap-x-[14px] items-center'>
                <input type='checkbox' checked={selectedQTypes.includes("Summary Completion")} 
              onChange={() => handleQTypeChange("Summary Completion")}  value="Summary Completion" className='w-4 h-4 rounded-[2px] bg-transparent '/>
                <label className='font-medium text-[14px] text-white '>Summary Completion</label>
            </div>
            <div className='flex gap-x-[14px] items-center'>
                <input type='checkbox' checked={selectedQTypes.includes("True False")} 
              onChange={() => handleQTypeChange("True False")}  value="True False" className='w-4 h-4 rounded-[2px] bg-transparent '/>
                <label className='font-medium text-[14px] text-white '>True False Not-Given</label>
            </div>
            <div className='flex gap-x-[14px] items-center'>
                <input type='checkbox' checked={selectedQTypes.includes("Yes No")} 
              onChange={() => handleQTypeChange("Yes No")}  value="Yes No" className='w-4 h-4 rounded-[2px] bg-transparent '/>
                <label className='font-medium text-[14px] text-white '>Yes No Not-Given</label>
            </div>
            <div className='flex gap-x-[14px] items-center'>
                <input type='checkbox' checked={selectedQTypes.includes("Matching Heading")} 
              onChange={() => handleQTypeChange("Matching Heading")}  value="Matching Heading" className='w-4 h-4 rounded-[2px] bg-transparent '/>
                <label className='font-medium text-[14px] text-white '>Matching Heading</label>
            </div>
           </div>

           
        </div>

        <div className='lg:w-[60%] md:w-[50%] w-[90%] border h-screen border-[#303030] flex flex-col items-center '>
            <p className='text-[18px] font-medium text-[#303030] lg:pt-20 pt-10'>Reading Practice Tests</p>
            <div className='w-full h-[80%]  justify-center flex flex-wrap gap-5 mt-8 overflow-y-scroll'>

          {selectedQTypes.length === 0 ? (
            filteredTests.map((test, index) => (
              <div key={index} className='group w-[170px] h-[270px] bg-[#F6F8F9] relative'>
                <div className='absolute hidden group-hover:flex flex-col gap-y-2 justify-center items-center w-[170px] h-[130px] bg-black opacity-85'>
                           {[...new Set(test.test_question_type)].map((qtype)=>{
                            return <div className='bg-[#FF467A] w-[120px] h-[16px] flex justify-center items-center'>
                               <p className='font-normal text-[8px] text-white'>{qtype}</p>
                            </div>
                           })} 
                        </div>
                       <img src={`${VITE_REACT_APP_SERVER}${test.thumbnail}`} className='group w-[170px] h-[130px]'/>

                       <p className='font-medium text-[14px] text-[#303030] ml-[15px] mt-[20px]'>{test.title}</p>

                       <div className='items-center flex flex-col gap-y-2.5 mt-[16px]'>
                         <Link to={`/readingtest/${test.id}`} className='w-[140px] h-[26px] border justify-center flex items-center gap-x-2 border-[#2B2D42] text-[#2B2D42] text-[12px] font-medium '>
                            Take test <PencilLine size={10} />
                         </Link>
                         <button onClick={()=>viewSolution(test.id)} className='w-[140px] h-[26px] justify-center flex items-center gap-x-2 bg-[#2B2D42] text-white text-[12px] font-normal '>
                            View Solution <ListChecks size={10}/>
                         </button>
                       </div>
              </div>
            ))
          ) : (
            filteredTests
              .filter((test) => test.test_question_type.some((qtype) => selectedQTypes.includes(qtype)))
              .map((test, index) => (
                <div key={index} className='group w-[170px] h-[270px] bg-[#F6F8F9] relative'>
                   <div className='absolute hidden group-hover:flex flex-col gap-y-2 justify-center items-center w-[170px] h-[130px] bg-black opacity-85'>
                           {[...new Set(test.test_question_type)].map((qtype)=>{
                            return <div className='bg-[#FF467A] w-[120px] h-[16px] flex justify-center items-center'>
                               <p className='font-normal text-[8px] text-white'>{qtype}</p>
                            </div>
                           })}
                        </div>
                       <img src={`${VITE_REACT_APP_SERVER}${test.thumbnail}`} className='w-[170px] h-[130px]'/>

                       <p className='font-medium text-[14px] text-[#303030] ml-[15px] mt-[20px]'>{test.title}</p>

                       <div className='items-center flex flex-col gap-y-2.5 mt-[16px]'>
                         <Link to={`/readingtest/${test.id}`} className='w-[140px] h-[26px] border justify-center flex items-center gap-x-2 border-[#2B2D42] text-[#2B2D42] text-[12px] font-medium '>
                            Take test <PencilLine size={10} />
                         </Link>
                         <button onClick={()=>viewSolution(test.id)} className='w-[140px] h-[26px] justify-center flex items-center gap-x-2 bg-[#2B2D42] text-white text-[12px] font-normal '>
                            View Solution <ListChecks size={10}/>
                         </button>
                       </div>
                </div>
              ))
          )}
            </div>
        </div>

      </div>
      
      </>}
        

    </div>
  )
}

export default ReadingTestCards



