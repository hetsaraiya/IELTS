import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const VITE_REACT_APP_SERVER = import.meta.env.VITE_REACT_APP_SERVER;
import axios from 'axios';
import TestSection2 from '../TestSection2/TestSection2';

const Testevaluation = () => {
    const location = useLocation();
    const { correctCount, wrongCount, minutes, seconds, selectedAnswers } = location.state || {};
    const [questions,setQuestions] = useState([]);
    const [openSolution,setOpenSolution] = useState(false)
    const [sortedQuestions, setSortedQuestions] = useState({});
    const [error, setError] = useState()
    const { testId } = useParams();
    const levelData = ['Expert',"very Good", 'Good', 'Very Good', 'Competent', 'Modest', 'Limited', 'Extremely Limited'];
    const bandData = ['9', "8.5/9",'7.5/9', '7/5.5', '6/4.5', '4/3', '3/2', '2/1'];


    const generateShadeOfPink = (index) => {

        const hue = 337;
        const saturation = 100;

        const lightness = 50 + (index * 5);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

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

    useEffect(() => {
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
    }, [testId]);
    return (
        <>
            <div>
                <div>
                    <div>
                    <p className="text-[#303030] text-center font-prompt font-medium text-[25px] md:text-[30px] lg:text-[36px] pt-16 px-8 md:px-24 lg:px-48">Your Test Evaluation</p>

                    {/* <p className=" text-[22px]  md:text-[25px] lg:text-[30px]  text-center font-prompt text-[#303030] py-10">Test Name:&nbsp;<span>Title of Test</span></p> */}

                    <p className="text-[#303030] pt-4 font-prompt font-medium text-[25px] md:text-[30px] lg:text-[36px] px-8 md:px-24 lg:px-48 pb-[30px]">Your Band Score: {correctCount}</p>
                    </div>


                    {/* ////////Score board////// */}
                    <div className="w-[85%] md:w-[70%] lg:w-[55%] mx-auto  bg-[#2B2D42] text-white flex flex-row items-start justify-center gap-4 md:gap-16 lg:gap-56">


                        {/*/////// left ////////// */}
                        <div className="py-8">
                            <div>
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px] lg:text-[30px] font-medium">Total Questions</p>
                                <div className="bg-white w-[20%] h-[1px] mb-2"></div>
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px] lg:text-[30px] font-medium">10</p>
                            </div>

                            <div className="py-8">
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px] lg:text-[30px] font-medium">Marks</p>
                                <div className="bg-white w-[20%] h-[1px] mb-2"></div>
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px]lg:text-[30px] font-medium">{correctCount}</p>
                            </div>

                            <div className="">
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px] lg:text-[30px] font-medium">Time Taken</p>
                                <div className="bg-white w-[40%] h-[1px] mb-2"></div>
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px] lg:text-[30px] font-medium">{minutes} mins and {seconds} secs</p>
                            </div>

                        </div>


                        {/* //////////Right///////// */}
                        <div className="py-8">
                            <div className="">
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px] lg:text-[30px] font-medium">Correct</p>
                                <div className="bg-white w-[50%] h-[1px] mb-2"></div>
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px] lg:text-[30px] font-medium">{correctCount}</p>
                            </div>

                            <div className="py-8">
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px] lg:text-[30px] font-medium">InCorrect</p>
                                <div className="bg-white w-[50%] h-[1px] mb-2"></div>
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px] lg:text-[30px] font-medium">{wrongCount}</p>
                            </div>


                            {/* <div className="">
                                <p className="font-prompt text-[#ffff] text-[20px] md:text-[25px] lg:text-[30px] font-medium">Unanswered</p>
                                <div className="bg-white w-[60%] h-[1px] mb-2"></div>
                                <p className="font-prompt text-[#ffff] text-[20px]  md:text-[25px] first-line:lg:text-[30px] font-medium">0</p>
                            </div> */}


                        </div>

                    </div>


                    {/* ///////Tables/////// */}
                    <div className="flex flex-col lg:flex-row  items-center lg:items-start justify-center  gap-10 pt-14">
                        <div className="">
                            <p className="font-prompt text-[#303030] font-medium text-[25px] md:text-[30px] lg:text-[36px] pb-4 ">Answer Table</p>                      
                            <div className=" flex justify-center">
            <div className="md:w-[450px] w-[300px] h-fit  bg-white  flex flex-col justify-center px-10 pb-10">
               {/* <div className="flex justify-between"><p className="text-[18px] font-medium text-[#2B2D42] mb-2 ">Solution</p> <p onClick={()=>setOpenSolution(false)} className="cursor-pointer text-[18px] font-medium text-[#2B2D42]  ">X</p></div> */}
               {sortedQuestions["Sentence Completion MCQ"]?.length > 0 && 
                 <div className="flex flex-col gap-x-4 gap-y-2 ">
                  {sortedQuestions["Sentence Completion MCQ"].map((question,index)=>{
                    return(
                    <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                     <p className="text-[18px] font-medium text-[#2b2d42] ">{question.qno}.&nbsp; {question.answer}</p>
                    </div>
                      
                    )
                  })}
                </div>}
                {sortedQuestions["MCQ"]?.length > 0 && 
                 <div className="flex flex-col gap-x-4  gap-y-2 mt-2 ">
                  {sortedQuestions["MCQ"].map((question,index)=>{
                    return(
                        <>
                      <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                      <p className="text-[18px] font-medium text-[#2b2d42] ">{question.qno}.&nbsp; {question.answer}</p>
                      </div>
                      <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                      <p className="text-[18px] font-medium text-[#2b2d42] ">{question.qno}.&nbsp; {question.answer2}</p>
                      </div>
                      </>
                    )
                  })}
                </div>}
                {sortedQuestions["Matching Information"]?.length > 0 && 
                 <div className="flex flex-col gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Matching Information"].map((question,index)=>{
                    return(
                      <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                      <p className="text-[18px] font-medium text-[#2b2d42] ">{question.qno}.&nbsp; {question.answer}</p>
                      </div>
                    )
                  })}
                </div>}
                {sortedQuestions["Summary Completion"]?.length > 0 && 
                 <div className="flex flex-col gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Summary Completion"].map((question,index)=>{
                    return(
                      <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]' >
                      <p className="text-[18px] font-medium text-[#2b2d42] ">{question.qno}.&nbsp; {question.answer}</p>
                      </div>
                    )
                  })}
                </div>}
                {sortedQuestions["True False"]?.length > 0 && 
                 <div className="flex flex-col gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["True False"].map((question,index)=>{
                    return(
                      <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                      <p className="text-[18px] font-medium text-[#2b2d42] ">{question.qno}.&nbsp; {question.answer}</p>
                      </div>
                    )
                  })}
                </div>}
                {sortedQuestions["Yes No"]?.length > 0 && 
                 <div className="flex flex-col gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Yes No"].map((question,index)=>{
                    return(
                      <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                      <p className="text-[18px] font-medium text-[#2b2d42] ">{question.qno}.&nbsp; {question.answer}</p>
                      </div>
                    )
                  })}
                </div>}
                {sortedQuestions["Matching Heading"]?.length > 0 && 
                 <div className="flex flex-col gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Matching Heading"].map((question,index)=>{
                    return(
                      <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                      <p className="text-[18px] font-medium text-[#2b2d42] ">{question.qno}.&nbsp; {question.answer}</p>
                      </div>
                    )
                  })}
                </div>}
                {sortedQuestions["Diagram"]?.length > 0 && (
                <div className="flex flex-col gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Diagram"].map((question, index) => {
                    return (
                      <>
                        {question.answer && (
                         <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                          <p className="text-[18px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer}
                          </p>
                          </div>
                        )}
                        {question.answer2 && (
                        <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                          <p className="text-[18px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer2}
                          </p>
                          </div>
                        )}
                        {question.answer3 && (
                          <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                          <p className="text-[18px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer3}
                          </p>
                          </div>
                        )}
                        {question.answer4 && (
                         <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                         <p className="text-[18px] font-medium text-[#2b2d42] ">
                           {question.qno}. {question.answer4}
                         </p>
                         </div>
                        )}
                        {question.answer5 && (
                          <div className='border-[1px] h-[40px] px-4 flex items-center border-[#303030]'>
                          <p className="text-[18px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer5}
                          </p>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
            </div>
                          </div>
                        </div>               

                        <div className="">
                            <p className="font-prompt text-[#303030] font-medium text-[25px] md:text-[30px] lg:text-[36px] pb-4 ">Band Score</p>
                            <div className="">
                                <table className=" border-[1px] border-[#303030] w-[310px] md:w-[410px]">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 bg-white text-left text-[#303030] font-prompt">Level</th>
                                            <th className="px-4 py-2 bg-white text-left text-[#303030] font-prompt">Band</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {levelData.map((level, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-4 text-white font-prompt " style={{ backgroundColor: generateShadeOfPink(index) }}>{level}</td>
                                                <td className="px-4 py-2 text-white font-prompt" style={{ backgroundColor: generateShadeOfPink(index) }}>{bandData[index]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>


                    {/* ////////other tests//////// */}

                    <div>
                    <p className="text-[#303030] font-prompt font-medium text-[25px] md:text-[30px] lg:text-[36px] pt-16 px-8 md:px-24 lg:px-48">Other tests</p>
                    <TestSection2/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Testevaluation
