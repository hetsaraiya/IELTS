import React, { useState, useEffect } from "react";
import { Upload, LogOut } from "lucide-react";
import "semantic-ui-css/semantic.min.css";
import { Link, useParams } from "react-router-dom";
const VITE_REACT_APP_SERVER = import.meta.env.VITE_REACT_APP_SERVER;
import axios from "axios";
import ReactPlayer from "react-player/youtube";
import { useNavigate, useNavigation } from "react-router-dom";

const ListeningTest = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [submitOpen, setSubmitOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [yesNo, setYesNo] = useState([]);

  const { testId } = useParams();
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [sortedQuestions, setSortedQuestions] = useState({});
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [openSolution, setOpenSolution] = useState(false);
  const [testContent, setTestContent] = useState();

  const [playing, setPlaying] = useState(false);
  const navigate = useNavigate();

  const handlePlayPause = () => {
    setPlaying(!playing);
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
    let intervalId;

    if (!formSubmitted) {
      intervalId = setInterval(() => {
        if (seconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);
        } else {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [formSubmitted, seconds]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${VITE_REACT_APP_SERVER}/api/getTestQuestions/?test_id=${testId}`
        );
        setQuestions(response.data);
      } catch (err) {
        setError("Error fetching data");
      }
    };

    if (testId) {
      fetchQuestions();
    } else {
      setError("No test ID provided");
    }
  }, [testId]);

  useEffect(() => {
    if (questions.length > 0) {
      const sorted = sortQuestions(questions);
      setSortedQuestions(sorted);
      console.log("Sorted Questions:", sorted);

      // Extract test_content from the first question type
      const firstQuestionTypeKey = Object.keys(sorted)[0];
      setTestContent(sorted[firstQuestionTypeKey][0].test_content);
      console.log("Test Content:", testContent);
    }
  }, [questions]);

  //////// SENTENCE COMPLETION ///////////////////
  const sentenceCompletion = [
    {
      no: 1,
      ques: "Question number one",
      optionA: "option a",
      optionB: "option b",
      optionC: "option c",
      answer: "option a",
    },
    {
      no: 2,
      ques: "Question number two",
      optionA: "option a",
      optionB: "option b",
      optionC: "option c",
      answer: "option c",
    },
    {
      no: 3,
      ques: "Question number three",
      optionA: "option a",
      optionB: "option b",
      optionC: "option c",
      answer: "option b",
    },
  ];

  const sentenceCompletionDesc = "Choose the correct option";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScValues({ ...scValues, [name]: value });
    console.log(scValues);
  };

  const [scValues, setScValues] = useState({ options: "" });

  //////// SENTENCE COMPLETION END ///////////////////

  ///////////// MCQ //////////////////
  const mcq = [
    {
      no: 4,
      ques: "Question number four",
      optionA: "option a",
      optionB: "option b",
      optionC: "option c",
      optionD: "option d",
      optionE: "option e",
      answer1: "option b",
      answer2: "option c",
    },
  ];

  const mcqDesc = "Choose TWO letters, A-E";

  const handleChange2 = (e) => {
    const { name, value, checked } = e.target;

    // If the checkbox is checked, add its value to the state if there are less than 2 selected options
    if (checked) {
      setMcqValues((prevValues) => ({
        ...prevValues,
        [name]:
          (prevValues[name]?.length || 0) < 2
            ? [...(prevValues[name] || []), value]
            : prevValues[name],
      }));
    } else {
      // If the checkbox is unchecked, remove its value from the state
      setMcqValues((prevValues) => ({
        ...prevValues,
        [name]: prevValues[name]?.filter((v) => v !== value),
      }));
    }
  };

  const [mcqValues, setMcqValues] = useState({ options: "" });
  ///////////// MCQ END//////////////////

  ///////////// MATCHING OPTIONS //////////////////
  const matchingOptions = ["A", "B", "C", "D", "E"];
  const matchingDesc =
    "Choose answers from the box and write the correct letter, next to Questions";

  const matching = [
    {
      no: 5,
      ques: "Question number five",
      answer: "A",
    },
    {
      no: 6,
      ques: "Question number six",
      answer: "B",
    },
    {
      no: 7,
      ques: "Question number seven",
      answer: "E",
    },
  ];

  const matchingSentences = [
    "A Sentence number one",
    "B Sentence number two",
    "C Sentence number three",
    "D Sentence number four",
    "E Sentence number five",
  ];

  const handleMatchingChange = (e, questionIndex) => {
    const { value } = e.target;
    setMatchingValues((prevValues) => ({
      ...prevValues,
      [questionIndex]: value,
    }));
  };

  // const handleMatchingChange = (e, index) => {
  //   const newValue = e.target.value;
  //   setMatchingValues(prevValues => {
  //     const updatedValues = [...prevValues];
  //     updatedValues[index] = newValue;
  //     return updatedValues;
  //   });
  // };

  const [matchingValues, setMatchingValues] = useState({});
  ///////////// MATCHING OPTIONS END//////////////////

  ///////////// SUMMARY COMPLETION //////////////////
  const summaryDesc = "Write the correct answer (Answers are compulsory)";

  const summary = [
    // {
    //   no: 8,
    //   ques: "Sentence number eight _",
    //   answer: "hello"
    // },
    // {
    //   no: 9,
    //   ques: "Sentence _ number nine",
    //   answer: "hey"
    // },
    // {
    //   no: 10,
    //   ques: " _ Sentence number ten",
    //   answer: "hi"
    // },
  ];

  // Inside the ListeningTest component

  const handleSummaryChange = (index, value) => {
    const newSummaryValues = [...summaryValues];
    newSummaryValues[index] = value;
    setSummaryValues(newSummaryValues);
  };

  const [summaryValues, setSummaryValues] = useState(
    Array(summary.length).fill("")
  );

  // Rendering the summary questions with blanks
  const renderSummaryQuestions = () => {
    return sortedQuestions["Summary Completion"].map((item, index) => {
      // Splitting the question to identify where to insert input fields
      const parts = item.content.split("_");
      return (
        <div key={index} className="flex text-[18px] font-normal mt-3">
          {parts.map((part, partIndex) => (
            <React.Fragment key={partIndex}>
              <span className="mr-2">{part}</span>
              {partIndex < parts.length - 1 && (
                <div className="flex">
                  <p>{item.qno}. </p>
                  <input
                    type="text"
                    value={summaryValues[index]}
                    id={summaryValues[index]}
                    onChange={(e) => {
                      handleSummaryChange(index, e.target.value);
                      handleInputChange(item.qno);
                    }}
                    className="ml-2 mr-2 px-2 w-[120px] h-[24px] bg-[#D3D3D3]"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      );
    });
  };

  const diagramDesc =
    "Label the Diagram and write the correct answer next to it's number (Answers are compulsory)";
  const diagram = [];

  const handleDiagramChange = (index, value) => {
    const newDiagramValues = [...diagramValues];
    newDiagramValues[index] = value;
    setDiagramValues(newDiagramValues);
  };
  const [diagramValues, setDiagramValues] = useState(
    Array(diagram.length).fill("")
  );

  ///////////// SUMMARY COMPLETION //////////////////
  const handleSubmit = (e) => {
    e.preventDefault();

    let correctCount = 0;
    let wrongCount = 0;
    const selectedAnswers = {};

    if (sortedQuestions["Sentence Completion MCQ"]?.length > 0) {
      sortedQuestions["Sentence Completion MCQ"].forEach((question, index) => {
        const selectedOption = scValues[`options${index}`];
        const correctAnswer = question.answer;
        const isCorrect = selectedOption === correctAnswer;
        selectedAnswers[`Question ${question.qno}`] = {
          selectedOption,
          correctAnswer,
          isCorrect,
        };

        if (isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
      });
    }

    if (sortedQuestions["MCQ"]?.length > 0) {
      sortedQuestions["MCQ"].forEach((question, index) => {
        const selectedOptions = mcqValues[`options${index}`] || []; // Get selected options
        const correctAnswer1 = question.answer;
        const correctAnswer2 = question.answer2;
        const isCorrect1 = selectedOptions.includes(correctAnswer1); // Check if answer 1 is correct
        const isCorrect2 = selectedOptions.includes(correctAnswer2); // Check if answer 2 is correct

        selectedAnswers[`Question ${question.qno}`] = {
          selectedOptions,
          correctAnswer1,
          correctAnswer2,
          isCorrect1,
          isCorrect2,
        };

        // Increase correctCount by one if either answer 1 or answer 2 is correct
        if (isCorrect1 || isCorrect2) {
          correctCount++;
        }

        // Increase correctCount by one more if both answer 1 and answer 2 are correct
        if (isCorrect1 && isCorrect2) {
          correctCount++;
        } else {
          wrongCount++;
        }
      });
    }

    if (sortedQuestions["Matching Information"]?.length > 0) {
      sortedQuestions["Matching Information"].forEach((question, index) => {
        const selectedOption = document.getElementById(
          `matching-${index}`
        ).value;
        const correctAnswer = question.answer;

        const isCorrect = selectedOption.toLowerCase() === correctAnswer.toLowerCase();

        selectedAnswers[`Question ${question.qno}`] = {
          selectedOption,
          correctAnswer,
          isCorrect,
        };

        if (isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
      });
    }

    if (sortedQuestions["Summary Completion"]?.length > 0) {
      sortedQuestions["Summary Completion"].forEach((question, index) => {
        const selectedAnswer = document.getElementById(
          `${summaryValues[index]}`
        ).value;
        const correctAnswer = question.answer;

        const isCorrect =
          selectedAnswer.toLowerCase() === correctAnswer.toLowerCase();

        selectedAnswers[`Question ${question.qno}`] = {
          selectedAnswer,
          correctAnswer,
          isCorrect,
        };

        if (isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
      });
    }

    if (sortedQuestions["Diagram"]?.length > 0) {
      sortedQuestions["Diagram"].forEach((question, index) => {
        const selectedAnswer = diagramValues[index]; // Assuming diagramValues is an array of user inputs
        const correctAnswers = [
          question.answer,
          question.answer2,
          question.answer3,
          question.answer4,
          question.answer5,
        ];

        // Check if the selected answer matches any of the correct answers
        const isCorrect = correctAnswers.some(
          (answer) => selectedAnswer.toLowerCase() === answer.toLowerCase()
        );

        selectedAnswers[`Question ${question.qno}`] = {
          selectedAnswer,
          correctAnswers,
          isCorrect,
        };

        // Increase correctCount if the selected answer is correct
        if (isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
      });
    }

    console.log("Selected Answers:", selectedAnswers);
    console.log("Correct Answers Count:", correctCount);
    console.log("Wrong Answers Count:", wrongCount);
    setFormSubmitted(true);

    navigate(`/testevaluation/${testId}`, {
      state: {
        correctCount,
        wrongCount,
        minutes,
        seconds,
        
        // selectedAnswers
      },
    });

    window.scrollTo(0,0)
    setTimeout(() => {
      setSubmitOpen(false);
    }, 1000);

    // navigate("/testevaluation")
  };

  // Total number of questions across all types
  useEffect(() => {
    const totalQuestions =
      (sortedQuestions["Sentence Completion MCQ"]?.length ?? 0) +
      (sortedQuestions["MCQ"]?.length ?? 0) +
      (sortedQuestions["Matching Information"]?.length ?? 0) +
      (sortedQuestions["Summary Completion"]?.length ?? 0) +
      (sortedQuestions["Diagram"]?.length ?? 0);

    console.log(`"total ques:" ${totalQuestions}`);
    setAttemptedQuestions(Array(totalQuestions).fill(false));
  }, [sortedQuestions]);

  // Example update function for any type of input change
  const handleInputChange = (index) => {
    setAttemptedQuestions((prev) => {
      const updated = [...prev];
      updated[index - 1] = true;
      console.log(`"updated ques:"${updated}`);
      return updated;
    });
  };

  const renderQuestionStatus = () => {
    return (
      <div className="numbers flex flex-row justify-center gap-y-5 flex-wrap mt-[17px] gap-x-[15px]">
        {attemptedQuestions.map((attempted, index) => (
          <div
            className={`w-[38px] h-[38px] rounded-full flex justify-center items-center ${
              attempted ? "bg-[#FF467A]" : "bg-[#E4E4E4]"
            }`}
          >
            <p
              className={`text-[16px] font-medium text-${
                attempted ? "white" : "#303030"
              }`}
            >
              {index + 1}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="font-prompt">
      <form
        onSubmit={handleSubmit}
        className="w-[100%] flex lg:flex-row flex-col justify-center gap-x-[35px] mt-[100px]"
      >
        {submitOpen && (
          <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex justify-center">
            <div className="md:w-[450px] w-[300px] h-[276px] bg-white mt-10 flex flex-col justify-center items-center">
              <p className="md:text-[18px] text-[14px] font-medium text-[#2B2D42] ">
                Are you sure you want to SUBMIT?
              </p>
              <button
                type="submit"
                className="w-[200px] h-[40px] border border-[#2B2D42] text-[#2B2D42] mt-[46px] text-[16px] font-medium "
              >
                Submit
              </button>
              <div
                onClick={() => setSubmitOpen(false)}
                className="w-[200px] cursor-pointer h-[40px] bg-[#2B2D42] text-white flex justify-center items-center mt-[10px] text-[16px] font-medium "
              >
                Cancel
              </div>
            </div>
          </div>
        )}

        {exitOpen && (
          <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex justify-center">
            <div className="md:w-[450px] w-[300px] h-[276px] bg-white mt-10 flex flex-col justify-center items-center">
              <p className="md:text-[18px] text-[14px] font-medium text-[#2B2D42] ">
                Are you sure you want to EXIT?
              </p>
              <Link
                to="/testcards"
                className="cursor-pointer flex justify-center items-center w-[200px] h-[40px] border border-[#2B2D42] text-[#2B2D42] mt-[46px] text-[16px] font-medium "
              >
                Exit
              </Link>
              <div
                onClick={handleRefresh}
                className="w-[200px] h-[40px] border border-[#2B2D42] text-[#2B2D42] flex cursor-pointer justify-center items-center mt-[10px] text-[16px] font-medium "
              >
                Retake the test
              </div>
              <div
                onClick={() => setExitOpen(false)}
                className="w-[200px] h-[40px] bg-[#2B2D42] cursor-pointer text-white flex justify-center items-center mt-[10px] text-[16px] font-medium "
              >
                Cancel
              </div>
            </div>
          </div>
        )}
        {openSolution && (
          <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex justify-center">
            <div className="md:w-[450px] w-[300px] h-fit  bg-white mt-10 flex flex-col justify-center px-10 py-10">
              <div className="flex justify-between">
                <p className="text-[18px] font-medium text-[#2B2D42] mb-2 ">
                  Solution
                </p>{" "}
                <p
                  onClick={() => setOpenSolution(false)}
                  className="cursor-pointer text-[18px] font-medium text-[#2B2D42]  "
                >
                  X
                </p>
              </div>
              {sortedQuestions["Sentence Completion MCQ"]?.length > 0 && (
                <div className="flex gap-x-4 gap-y-2 mt-2">
                  {sortedQuestions["Sentence Completion MCQ"].map(
                    (question, index) => {
                      return (
                        <p className="text-[14px] font-medium text-[#2b2d42] ">
                          {question.qno}. {question.answer}
                        </p>
                      );
                    }
                  )}
                </div>
              )}
              {sortedQuestions["MCQ"]?.length > 0 && (
                <div className="flex gap-x-4  gap-y-2 mt-2 ">
                  {sortedQuestions["MCQ"].map((question, index) => {
                    return (
                      <>
                        <p className="text-[14px] font-medium text-[#2b2d42] ">
                          {question.qno}. {question.answer}
                        </p>
                        <p className="text-[14px] font-medium text-[#2b2d42] ">
                          {question.qno}. {question.answer2}
                        </p>
                      </>
                    );
                  })}
                </div>
              )}
              {sortedQuestions["Matching Information"]?.length > 0 && (
                <div className="flex gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Matching Information"].map(
                    (question, index) => {
                      return (
                        <>
                          <p className="text-[14px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer}
                          </p>
                        </>
                      );
                    }
                  )}
                </div>
              )}
              {sortedQuestions["Summary Completion"]?.length > 0 && (
                <div className="flex gap-x-4 gap-y-2 mt-2 ">
                  {sortedQuestions["Summary Completion"].map(
                    (question, index) => {
                      return (
                        <>
                          <p className="text-[14px] font-medium text-[#2b2d42] ">
                            {question.qno}. {question.answer}
                          </p>
                        </>
                      );
                    }
                  )}
                </div>
              )}
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
          </div>
        )}
        <div className="w-[300px] bg-white border border-[#2B2D42] mx-auto lg:mx-0  flex flex-col items-center py-8 h-[550px]">
          <div className="w-[250px] h-[67px] bg-[#2B2D42] flex justify-center items-center ">
            <p className="font-bold  text-[24px] text-white ">
              {minutes < 10 ? "0" + minutes : minutes}&nbsp;: &nbsp;
              {seconds < 10 ? "0" + seconds : seconds}
            </p>
          </div>

          <div className="mt-[32px]">
            <p className="font-semibold text-[18px] text-center text-[#303030] ">
              Question status
            </p>
            {renderQuestionStatus()}
            <div className="flex justify-center mt-[25px]">
              <div className="w-[20px] h-[20px] rounded-full bg-[#FF467A] ml-[10px] "></div>{" "}
              <p className="font-medium text-[14px] text-[#303030] ml-[8px] ">
                Answered
              </p>
              <div className="w-[20px] h-[20px] rounded-full bg-[#E4E4E4] ml-5"></div>{" "}
              <p className="font-medium text-[14px] text-[#303030] ml-[8px] ">
                Unanswered
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div
                onClick={() => setSubmitOpen(true)}
                className="w-[250px] h-[50px] cursor-pointer bg-[#2B2D42] text-white text-[18px] font-medium flex justify-center items-center mt-[30px]"
              >
                Submit <Upload size={14} className="ml-2" />
              </div>

              <div
                onClick={() => setOpenSolution(true)}
                className="w-[250px] h-[50px] border border-[#2B2D42] cursor-pointer text-[#2B2D42] text-[18px] font-medium flex justify-center items-center mt-[12px]"
              >
                Solution{" "}
                <svg
                  className="ml-2"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_45_63)">
                    <path
                      d="M12.6875 2.625C12.8035 2.625 12.9148 2.67109 12.9969 2.75314C13.0789 2.83519 13.125 2.94647 13.125 3.0625V10.9375C13.125 11.0535 13.0789 11.1648 12.9969 11.2469C12.9148 11.3289 12.8035 11.375 12.6875 11.375H1.3125C1.19647 11.375 1.08519 11.3289 1.00314 11.2469C0.921094 11.1648 0.875 11.0535 0.875 10.9375V3.0625C0.875 2.94647 0.921094 2.83519 1.00314 2.75314C1.08519 2.67109 1.19647 2.625 1.3125 2.625H12.6875ZM1.3125 1.75C0.964403 1.75 0.630564 1.88828 0.384422 2.13442C0.138281 2.38056 0 2.7144 0 3.0625L0 10.9375C0 11.2856 0.138281 11.6194 0.384422 11.8656C0.630564 12.1117 0.964403 12.25 1.3125 12.25H12.6875C13.0356 12.25 13.3694 12.1117 13.6156 11.8656C13.8617 11.6194 14 11.2856 14 10.9375V3.0625C14 2.7144 13.8617 2.38056 13.6156 2.13442C13.3694 1.88828 13.0356 1.75 12.6875 1.75H1.3125Z"
                      fill="#2B2D42"
                    />
                    <path
                      d="M6.12504 4.81249C6.12504 4.69646 6.17113 4.58518 6.25318 4.50313C6.33523 4.42108 6.44651 4.37499 6.56254 4.37499H10.9375C11.0536 4.37499 11.1649 4.42108 11.2469 4.50313C11.3289 4.58518 11.375 4.69646 11.375 4.81249C11.375 4.92852 11.3289 5.0398 11.2469 5.12185C11.1649 5.20389 11.0536 5.24999 10.9375 5.24999H6.56254C6.44651 5.24999 6.33523 5.20389 6.25318 5.12185C6.17113 5.0398 6.12504 4.92852 6.12504 4.81249ZM4.81604 4.06524C4.85678 4.10588 4.88911 4.15416 4.91116 4.20731C4.93322 4.26046 4.94457 4.31744 4.94457 4.37499C4.94457 4.43253 4.93322 4.48952 4.91116 4.54267C4.88911 4.59582 4.85678 4.6441 4.81604 4.68474L3.50354 5.99724C3.4629 6.03798 3.41462 6.07031 3.36147 6.09236C3.30832 6.11442 3.25134 6.12577 3.19379 6.12577C3.13624 6.12577 3.07926 6.11442 3.02611 6.09236C2.97296 6.07031 2.92468 6.03798 2.88404 5.99724L2.44654 5.55974C2.40586 5.51906 2.3736 5.47077 2.35158 5.41762C2.32957 5.36448 2.31824 5.30751 2.31824 5.24999C2.31824 5.13381 2.36439 5.02239 2.44654 4.94024C2.52869 4.85809 2.64011 4.81194 2.75629 4.81194C2.87247 4.81194 2.98389 4.85809 3.06604 4.94024L3.19379 5.06886L4.19654 4.06524C4.23718 4.0245 4.28546 3.99217 4.33861 3.97011C4.39176 3.94806 4.44874 3.93671 4.50629 3.93671C4.56384 3.93671 4.62082 3.94806 4.67397 3.97011C4.72712 3.99217 4.7754 4.0245 4.81604 4.06524ZM6.12504 8.31249C6.12504 8.19646 6.17113 8.08518 6.25318 8.00313C6.33523 7.92108 6.44651 7.87499 6.56254 7.87499H10.9375C11.0536 7.87499 11.1649 7.92108 11.2469 8.00313C11.3289 8.08518 11.375 8.19646 11.375 8.31249C11.375 8.42852 11.3289 8.5398 11.2469 8.62185C11.1649 8.7039 11.0536 8.74999 10.9375 8.74999H6.56254C6.44651 8.74999 6.33523 8.7039 6.25318 8.62185C6.17113 8.5398 6.12504 8.42852 6.12504 8.31249ZM4.81604 7.56524C4.85678 7.60588 4.88911 7.65416 4.91116 7.70731C4.93322 7.76046 4.94457 7.81744 4.94457 7.87499C4.94457 7.93254 4.93322 7.98952 4.91116 8.04267C4.88911 8.09582 4.85678 8.1441 4.81604 8.18474L3.50354 9.49724C3.4629 9.53798 3.41462 9.57031 3.36147 9.59236C3.30832 9.61442 3.25134 9.62577 3.19379 9.62577C3.13624 9.62577 3.07926 9.61442 3.02611 9.59236C2.97296 9.57031 2.92468 9.53798 2.88404 9.49724L2.44654 9.05974C2.40586 9.01906 2.3736 8.97077 2.35158 8.91762C2.32957 8.86448 2.31824 8.80751 2.31824 8.74999C2.31824 8.69246 2.32957 8.6355 2.35158 8.58235C2.3736 8.52921 2.40586 8.48092 2.44654 8.44024C2.48722 8.39956 2.53551 8.36729 2.58865 8.34528C2.6418 8.32327 2.69876 8.31194 2.75629 8.31194C2.81382 8.31194 2.87078 8.32327 2.92393 8.34528C2.97707 8.36729 3.02536 8.39956 3.06604 8.44024L3.19379 8.56886L4.19654 7.56524C4.23718 7.5245 4.28546 7.49217 4.33861 7.47012C4.39176 7.44806 4.44874 7.43671 4.50629 7.43671C4.56384 7.43671 4.62082 7.44806 4.67397 7.47012C4.72712 7.49217 4.7754 7.5245 4.81604 7.56524Z"
                      fill="#2B2D42"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_45_63">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div
                onClick={() => setExitOpen(true)}
                className="w-[250px] h-[50px] cursor-pointer text-[#2B2D42]  text-[18px] font-medium flex justify-center items-center mt-[12px]"
              >
                Exit <LogOut size={14} className="ml-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[60%] md:w-[80%] w-full bg-white md:mx-auto lg:mx-0 lg:mt-0 mt-10 h-fit ">
          <div className="w-full bg-[#F6F8F9] h-[300px]">
            {/* {testContent} */}
            <ReactPlayer
              width={"100%"}
              height={"300px"}
              url={testContent}
              playing={playing}
              controls={true} // This will add YouTube's native controls
            />
          </div>

          <div className="flex justify-center">
            <div
              className="w-[100px] h-[40px] rounded-[10px] border flex justify-center items-center cursor-pointer border-[#303030] text-[#303030] font-medium my-5 bg-[#F6F8F9] "
              onClick={handlePlayPause}
            >
              {playing ? "Pause" : "Play"}
            </div>
          </div>

          <div className="text-[#303030]">
            {sortedQuestions["Sentence Completion MCQ"]?.length > 0 && (
              <div className="sentence w-full bg-[#F6F8F9] h-fit py-10 mt-[18px] ">
                <p className="text-[18px] font-medium text-[#303030] text-center ">
                  Sentence Completion MCQ
                </p>
                <p className="italic text-[18px] text-[#303030] pt-5 md:pl-12 pl-8">
                  {sentenceCompletionDesc}
                </p>
                {sortedQuestions["Sentence Completion MCQ"].map(
                  (question, index) => {
                    return (
                      <div className="mt-5 md:ml-16 ml-10">
                        <div className="flex text-[18px] font-normal  ">
                          <p>{question.qno}.</p> &nbsp;{" "}
                          <p>{question.content}</p>
                        </div>

                        <div className="flex mt-[11px] font-normal text-[18px]  ">
                          <p>A.</p>{" "}
                          <input
                            type="radio"
                            className="w-4 h-4 rounded-full accent-[#2B2D42] mt-1 ml-2 mr-2.5 "
                            name={`options${index}`}
                            id={`A-${index}`}
                            checked={
                              scValues[`options${index}`] === question.option1
                            }
                            value={question.option1}
                            onChange={(e) => {
                              handleChange(e);
                              handleInputChange(question.qno);
                            }}
                            // onChange={handleChange}
                          />{" "}
                          <p>{question.option1}</p>
                        </div>
                        <div className="flex mt-[6px] font-normal text-[18px] ">
                          <p>B.</p>{" "}
                          <input
                            type="radio"
                            className="w-4 h-4 rounded-full accent-[#2B2D42] mt-1 ml-2 mr-2.5 "
                            name={`options${index}`}
                            id={`B-${index}`}
                            checked={
                              scValues[`options${index}`] === question.option2
                            }
                            value={question.option2}
                            onChange={(e) => {
                              handleChange(e);
                              handleInputChange(question.qno);
                            }}
                            // onChange={handleChange}
                          />{" "}
                          <p>{question.option2}</p>
                        </div>
                        <div className="flex mt-[6px] font-normal text-[18px] ">
                          <p>C.</p>{" "}
                          <input
                            type="radio"
                            className="w-4 h-4 rounded-full accent-[#2B2D42] mt-1 ml-2 mr-2.5 "
                            name={`options${index}`}
                            id={`C-${index}`}
                            checked={
                              scValues[`options${index}`] === question.option3
                            }
                            value={question.option3}
                            onChange={(e) => {
                              handleChange(e);
                              handleInputChange(question.qno);
                            }}
                            // onChange={handleChange}
                          />{" "}
                          <p>{question.option3}</p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}

            {sortedQuestions["MCQ"]?.length > 0 && (
              <div className="sentence w-full bg-[#F6F8F9] h-fit py-10 mt-[18px] ">
                <p className="text-[18px] font-medium text-[#303030] text-center ">
                  Multiple Choice Questions
                </p>
                <p className="italic text-[18px] text-[#303030] pt-5 md:pl-12 pl-8">
                  {mcqDesc}
                </p>
                {sortedQuestions["MCQ"].map((question, index) => {
                  return (
                    <div className="mt-5 md:ml-16 ml-10">
                      <div className="flex text-[18px] font-normal  ">
                        <p>{question.qno}.</p> &nbsp; <p>{question.content}</p>
                      </div>

                      <div className="flex mt-[11px] font-normal text-[18px]  ">
                        <p>A.</p>{" "}
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded-full accent-[#2B2D42] mt-1 ml-2 mr-2.5 "
                          name={`options${index}`}
                          id={`A-${index}`}
                          checked={mcqValues[`options${index}`]?.includes(
                            question.option1
                          )}
                          value={question.option1}
                          onChange={(e) => {
                            handleChange2(e);
                            handleInputChange(question.qno);
                          }}
                        />{" "}
                        <p>{question.option1}</p>
                      </div>
                      <div className="flex mt-[6px] font-normal text-[18px] ">
                        <p>B.</p>{" "}
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded-full accent-[#2B2D42] mt-1 ml-2 mr-2.5 "
                          name={`options${index}`}
                          id={`B-${index}`}
                          checked={mcqValues[`options${index}`]?.includes(
                            question.option2
                          )}
                          value={question.option2}
                          onChange={(e) => {
                            handleChange2(e);
                            handleInputChange(question.qno);
                          }}
                        />{" "}
                        <p>{question.option2}</p>
                      </div>
                      <div className="flex mt-[6px] font-normal text-[18px] ">
                        <p>C.</p>{" "}
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded-full accent-[#2B2D42] mt-1 ml-2 mr-2.5 "
                          name={`options${index}`}
                          id={`C-${index}`}
                          checked={mcqValues[`options${index}`]?.includes(
                            question.option3
                          )}
                          value={question.option3}
                          onChange={(e) => {
                            handleChange2(e);
                            handleInputChange(question.qno);
                          }}
                        />{" "}
                        <p>{question.option3}</p>
                      </div>
                      <div className="flex mt-[6px] font-normal text-[18px] ">
                        <p>D.</p>{" "}
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded-full accent-[#2B2D42] mt-1 ml-2 mr-2.5 "
                          name={`options${index}`}
                          id={`D-${index}`}
                          checked={mcqValues[`options${index}`]?.includes(
                            question.option4
                          )}
                          value={question.option4}
                          onChange={(e) => {
                            handleChange2(e);
                            handleInputChange(question.qno);
                          }}
                        />{" "}
                        <p>{question.option4}</p>
                      </div>
                      <div className="flex mt-[6px] font-normal text-[18px] ">
                        <p>E.</p>{" "}
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded-full accent-[#2B2D42] mt-1 ml-2 mr-2.5 "
                          name={`options${index}`}
                          id={`E-${index}`}
                          checked={mcqValues[`options${index}`]?.includes(
                            question.option5
                          )}
                          value={question.option5}
                          onChange={(e) => {
                            handleChange2(e);
                            handleInputChange(question.qno);
                          }}
                        />{" "}
                        <p>{question.option5}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {sortedQuestions["Matching Information"]?.length > 0 && (
              <div className="sentence w-full bg-[#F6F8F9] h-fit py-10 mt-[18px] ">
                <p className="text-[18px] font-medium text-[#303030] text-center ">
                  Matching Information
                </p>
                <p className="italic text-[18px] text-[#303030] pt-5 md:pl-12 pl-8">
                  {matchingDesc}
                </p>
                <div className=" text-[18px] font-normal flex flex-col gap-y-1 md:ml-16 ml-10 mt-5 mb-[23px]">
                  <p>A. {sortedQuestions["Matching Information"][0].option1}</p>
                  <p>B. {sortedQuestions["Matching Information"][0].option2}</p>
                  <p>C. {sortedQuestions["Matching Information"][0].option3}</p>
                  <p>D. {sortedQuestions["Matching Information"][0].option4}</p>
                  <p>E. {sortedQuestions["Matching Information"][0].option5}</p>
                </div>
                {sortedQuestions["Matching Information"].map(
                  (question, index) => {
                    return (
                      <div className="mt-[6px] md:ml-16 ml-10">
                        <div className="flex text-[18px] font-normal  ">
                          <p>{question.qno}.</p> &nbsp;{" "}
                          <select
                            name="matching"
                            id={`matching-${index}`}
                            className=" w-[60px] h-[20px] border rounded-[5px] flex flex-col justify-center text-[12px] "
                            onChange={(e) => {
                              handleMatchingChange(e, index);
                              handleInputChange(question.qno);
                            }}
                            value={matchingValues[index] || ""}
                          >
                            <option value={null}>Select</option>
                            {matchingOptions.map((options, index) => {
                              return <option value={options}>{options}</option>;
                            })}
                          </select>{" "}
                          &nbsp; <p>{question.content}</p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}

            {sortedQuestions["Summary Completion"]?.length > 0 && (
              <div className="sentence w-full bg-[#F6F8F9] h-fit py-10 mt-[18px] ">
                <p className="text-[18px] font-medium text-[#303030] text-center ">
                  Summary, form completion
                </p>
                <p className="italic text-[18px] text-[#303030] pt-5 md:pl-12 pl-8">
                  {summaryDesc}
                </p>
                <div className="mt-[6px] md:ml-16 ml-10">
                  {renderSummaryQuestions()}
                </div>
              </div>
            )}

            {sortedQuestions["Diagram"]?.length > 0 && (
              <div className="sentence w-full bg-[#F6F8F9] h-fit py-10 mt-[18px]">
                <p className="text-[18px] font-medium text-[#303030] text-center">
                  Plan Map, Diagram
                </p>
                <p className="italic text-[18px] text-[#303030] pt-5 md:pl-12 pl-8">
                  {diagramDesc}
                </p>
               
                {sortedQuestions["Diagram"].map((question, index) => (
                  <>
                  {index === 0 && ( // Render the first question's diagram here
                    <div className="flex justify-center my-4 w-[90%] bg-pink-300 ">
                    <img
                        src={`${VITE_REACT_APP_SERVER}${question.diagram}`}
                        className="diagramImg w-full "
                    />
                    </div>
                )}
                  <div
                    key={question.id}
                    className="flex items-center space-x-4 mt-4"
                  >
                    
                    <p className="text-[18px] font-normal">{question.qno}.</p>
                    <input
                      type="text"
                      value={diagramValues[index]}
                      id={diagramValues[index]}
                      onChange={(e) => {
                        handleDiagramChange(index, e.target.value);
                        handleInputChange(question.qno);
                      }}
                      className="ml-2 mr-2 px-2 w-[150px] h-[24px] bg-[#D3D3D3]"
                    />
                  </div>
                  </>
                ))}
                
              </div>
            )}

            <div className="my-[46px] flex flex-col items-center ">
              <p className="text-[14px] font-medium text-[#303030] ">
                End of Test
              </p>
              <p className="text-[12px] font-light text-[#303030] mt-[12px]">
                Submit the test to view your score and solution
              </p>
              <div
                onClick={() => setSubmitOpen(true)}
                className="w-[120px] h-[35px] cursor-pointer bg-[#2B2D42] text-white text-[16px] font-normal mt-[15px] flex justify-center items-center"
              >
                Submit <Upload size={14} className="ml-2" />{" "}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListeningTest;
