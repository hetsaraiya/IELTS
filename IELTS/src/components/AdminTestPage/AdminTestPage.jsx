import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
const VITE_REACT_APP_SERVER = import.meta.env.VITE_REACT_APP_SERVER;
import { Search, PencilLine, ListChecks } from "lucide-react";

const AdminTestPage = () => {

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

  const [deleteId, setDeleteId] = useState()
  const [deleteOpen, setDeleteOpen] = useState(false)
  
  const open = (id) =>{
    setDeleteId(id);
    setDeleteOpen(true)
  }
  
  const deleteTestQuestion = async (id) => {
    try {
        const response = await axios.delete(`${VITE_REACT_APP_SERVER}/api/tests/${id}/delete`);
        if (response.status === 204) {
            alert('Test successfully');
            setTests(tests.filter(test => test.id !== id));
            setDeleteOpen(false);
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            alert('Test not found');
        } else {
            alert('An error occurred while deleting the test question');
        }
        console.error('Error deleting test question:', error);
    }
};

    

  return (
     <div className='font-prompt '>
      {tests.length > 0 && <>
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

        {deleteOpen && <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex justify-center">
            <div className="md:w-[450px] w-[300px] h-[276px] bg-white mt-10 flex flex-col justify-center items-center">
              <p className="md:text-[18px] text-[14px] font-medium text-[#2B2D42] ">Are you sure you want to Delete the test?</p>
              <div onClick={()=> deleteTestQuestion(deleteId)} className="w-[200px] h-[40px] border border-[#2B2D42] text-[#2B2D42] mt-[46px] text-[16px] font-medium flex justify-center items-center ">Delete</div>
              <div onClick={()=>setDeleteOpen(false)} className="w-[200px] cursor-pointer h-[40px] bg-[#2B2D42] text-white flex justify-center items-center mt-[10px] text-[16px] font-medium ">Cancel</div>
            </div>
          </div>}

      <div className='w-screen flex md:flex-row flex-col lg:mt-[100px] md:mt-[80px] mt-[40px] items-center md:items-start justify-center gap-x-[14px]'>

        <div className='lg:w-[60%] md:w-[50%] w-[90%] border h-screen border-[#303030] flex flex-col items-center '>
            <p className='text-[18px] font-medium text-[#303030] lg:pt-20 pt-10'>All Tests</p>
            <div className='w-full h-[80%]  justify-center flex flex-wrap gap-5 mt-8 overflow-y-scroll'>

            {tests.map((test, index) => (
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
                         {/* <Link to={`/readingtest/${test.id}`} className='w-[140px] h-[26px] border justify-center flex items-center gap-x-2 border-[#2B2D42] text-[#2B2D42] text-[12px] font-medium '>
                            Take test <PencilLine size={10} />
                         </Link> */}
                         <button onClick={()=>open(test.id)} className='w-[140px] h-[26px] border justify-center flex items-center gap-x-2 border-[#2B2D42] text-[#2B2D42] text-[12px] font-medium '>
                            Delete Test 
                         </button>
                         <button onClick={()=>viewSolution(test.id)} className='w-[140px] h-[26px] justify-center flex items-center gap-x-2 bg-[#2B2D42] text-white text-[12px] font-normal '>
                            View Solution <ListChecks size={10}/>
                         </button>
                       </div>
              </div>
            ))}
            </div>
        </div>

      </div>
      
      </>}
        

    </div>
  )
}

export default AdminTestPage
