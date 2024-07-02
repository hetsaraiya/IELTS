import { useState } from "react";
import axios from 'axios';
const VITE_REACT_APP_SERVER = import.meta.env.VITE_REACT_APP_SERVER;
import { useNavigate, useNavigation } from 'react-router-dom';

const Question = () => {
    const [currentSectionData, setCurrentSectionData] = useState(null);
    const navigate = useNavigate();

    const [sentanceMCQList, setSentanceMCQList] = useState([]);
const [MCQList, setMCQList] = useState([]);
// const [matchingList, setMatchingList] = useState([]);
const [summaryList, setSummaryList] = useState([]);
const [trueFalseList, setTrueFalseList] = useState([]);
const [yesNoList, setYesNoList] = useState([]);
const [matchingHeadingList, setMatchingHeadingList] = useState([]);
const [matchingInformationList, setMatchingInformationList] = useState([]);
const [diagramList, setDiagramList] = useState([])

    const handleSubmitSection = (data) => {
        setCurrentSectionData(data);
    };

    const [sentanceMCQData, setSentanceMCQData] = useState({
        howTheSolve: '',
        qno: '',
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        answer: ''
    });
    const [MCQData, setMCQData] = useState({
        howTheSolve: '',
        qno: '',
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        optionE: '',
        answer1: '',
        answer2: ''
    });
    const [SummaryData, setSummaryData] = useState({
        howTheSOlve: '',
        qno: '',
        question1: '',
        answer1: ''
    });
    const [TrueFalseData, setTrueFalseData] = useState({
        howTheSOlve: '',
        qno: '',
        question: '',
        answer: ''
    });
    const [YesNoData, setYesNoData] = useState({
        howTheSOlve: '',
        qno: '',
        question: '',
        answer: ''
    });
    const [MatchingHeadingData, setMatchingHeadingData] = useState({
        howTheSOlve: '',
        question: '',
        qno: '',
        options: ['', '', '', '', ''],
        answer: ''
    });
    const [MatchingInformationData, setMatchingInformationData] = useState({
        howTheSOlve: '',
        question: '',
        qno: '',
        options: ['', '', '', '', ''],
        answer: ''
    });
    const [DiagramData, setDiagramData] = useState({
        howTheSOlve: '',
        diagram: '',
        ano: '',
        answer: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: ''
    })

    const handleChangeSM = (e) => {
        const { name, value } = e.target;
        setSentanceMCQData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitSM = async (e) => {
        e.preventDefault();
        try {
            const url = `${VITE_REACT_APP_SERVER}/api/test-questions/`;
    
            const formData = new FormData();
            formData.append('test_id', localStorage.getItem('testId'));
            formData.append('qno', sentanceMCQData.qno);
            formData.append('content', sentanceMCQData.question);
            formData.append('diagram', ""); // Assuming no file to upload for 'diagram' in this case
            formData.append('question_type', 'Sentence Completion MCQ');
            formData.append('howToSolve', sentanceMCQData.howTheSolve);
            formData.append('option1', sentanceMCQData.optionA);
            formData.append('option2', sentanceMCQData.optionB);
            formData.append('option3', sentanceMCQData.optionC);
            formData.append('option4', "");  
            formData.append('option5', "");
            formData.append('answer', sentanceMCQData.answer);
            formData.append('answer2', "");
            formData.append('answer3', "");
            formData.append('answer4', "");
            formData.append('answer5', "");
    
            console.log("Sending data to server:", formData);
    
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                setSentanceMCQList(prevList => [...prevList, response.data]);
                alert("Your data is saved");
                setSentanceMCQData({
                    howTheSolve: '',
                    qno: '',
                    question: '',
                    optionA: '',
                    optionB: '',
                    optionC: '',
                    answer: ''
                });
            } else {
                alert("Error: " + response.data.error);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data: " + (error.response ? JSON.stringify(error.response.data) : error.message));
        }
    };
    

    const handleChangeMCQ = (e) => {
        const { name, value } = e.target;
        setMCQData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmitMCQ = async (e) => {
        e.preventDefault();
        try {
            const url = `${VITE_REACT_APP_SERVER}/api/test-questions/`;
    
            // Create a new FormData object
            const formData = new FormData();
            formData.append('test_id', localStorage.getItem('testId'));
            formData.append('qno', MCQData.qno);
            formData.append('content', MCQData.question);
            formData.append('diagram', ""); // Assuming no file for diagram here
            formData.append('question_type', 'MCQ');
            formData.append('howToSolve', MCQData.howTheSolve);
            formData.append('option1', MCQData.optionA);
            formData.append('option2', MCQData.optionB);
            formData.append('option3', MCQData.optionC);
            formData.append('option4', MCQData.optionD);
            formData.append('option5', MCQData.optionE);
            formData.append('answer', MCQData.answer1);
            formData.append('answer2', MCQData.answer2);
            formData.append('answer3', "");
            formData.append('answer4', "");
            formData.append('answer5', "");
    
            console.log("Sending data to server:", formData);
    
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                setMCQList(prevList => [...prevList, response.data]);
                alert("Your data is saved");
                setMCQData({
                    howTheSolve: '',
                    qno: '',
                    question: '',
                    optionA: '',
                    optionB: '',
                    optionC: '',
                    optionD: '',
                    optionE: '',
                    answer1: '',
                    answer2: ''
                });
            } else {
                alert("Error: " + response.data.error);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data: " + (error.response ? error.response.data : error.message));
        }
    };
    

    const handleChangeSummary = (e) => {
        const { name, value } = e.target;
        setSummaryData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmitSummary = async (e) => {
        e.preventDefault();
        try {
            const url = `${VITE_REACT_APP_SERVER}/api/test-questions/`;
            const formData = new FormData();
            formData.append('test_id', localStorage.getItem('testId'));
            formData.append('qno', SummaryData.qno);
            formData.append('content', SummaryData.question1);
            formData.append('diagram', "");
            formData.append('question_type', 'Summary Completion');
            formData.append('howToSolve', SummaryData.howTheSOlve);
            formData.append('option1', "");
            formData.append('option2', "");
            formData.append('option3', "");
            formData.append('option4', "");
            formData.append('option5', "");
            formData.append('answer', SummaryData.answer1);
            formData.append('answer2', "");
            formData.append('answer3', "");
            formData.append('answer4', "");
            formData.append('answer5', "");
    
            console.log("Sending data to server:", formData);
    
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                setSummaryList(prevList => [...prevList, response.data]);
                alert("Your data is saved");
                setSummaryData({
                    howTheSOlve: '',
                    qno: '',
                    question1: '',
                    answer1: ''
                });
            } else {
                alert("Error: " + response.data.error);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data: " + (error.response ? error.response.data : error.message));
        }
    };

    const handleChangeTrueFalse = (e) => {
        const { name, value } = e.target;
        setTrueFalseData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmitTrueFalse = async (e) => {
        e.preventDefault();
        try {
            const url = `${VITE_REACT_APP_SERVER}/api/test-questions/`;
            const formData = new FormData();
            formData.append('test_id', localStorage.getItem('testId'));
            formData.append('qno', TrueFalseData.qno);
            formData.append('content', TrueFalseData.question);
            formData.append('diagram', "");
            formData.append('question_type', 'True False');
            formData.append('howToSolve', TrueFalseData.howTheSOlve);
            formData.append('option1', "");
            formData.append('option2', "");
            formData.append('option3', "");
            formData.append('option4', "");
            formData.append('option5', "");
            formData.append('answer', TrueFalseData.answer);
            formData.append('answer2', "");
            formData.append('answer3', "");
            formData.append('answer4', "");
            formData.append('answer5', "");
    
            console.log("Sending data to server:", formData);
    
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                setTrueFalseList(prevList => [...prevList, response.data]);
                alert("Your data is saved");
                setTrueFalseData({
                    howTheSOlve: '',
                    qno: '',
                    question: '',
                    answer: ''
                });
            } else {
                alert("Error: " + response.data.error);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data: " + (error.response ? error.response.data : error.message));
        }
    };

    const handleChangeYesNo = (e) => {
        const { name, value } = e.target;
        setYesNoData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmitYesNo = async (e) => {
        e.preventDefault();
        try {
            const url = `${VITE_REACT_APP_SERVER}/api/test-questions/`;
            const formData = new FormData();
            formData.append('test_id', localStorage.getItem('testId'));
            formData.append('qno', YesNoData.qno);
            formData.append('content', YesNoData.question);
            formData.append('diagram', "");
            formData.append('question_type', 'Yes No');
            formData.append('howToSolve', YesNoData.howTheSOlve);
            formData.append('option1', "");
            formData.append('option2', "");
            formData.append('option3', "");
            formData.append('option4', "");
            formData.append('option5', "");
            formData.append('answer', YesNoData.answer);
            formData.append('answer2', "");
            formData.append('answer3', "");
            formData.append('answer4', "");
            formData.append('answer5', "");
    
            console.log("Sending data to server:", formData);
    
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                setYesNoList(prevList => [...prevList, response.data]);
                alert("Your data is saved");
                setYesNoData({
                    howTheSOlve: '',
                    qno: '',
                    question: '',
                    answer: ''
                });
            } else {
                alert("Error: " + response.data.error);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data: " + (error.response ? error.response.data : error.message));
        }
    };
    

    const handleChangeMatchingHeading = (e) => {
        const { name, value } = e.target;
        if (name === 'options') {
            const options = [...MatchingHeadingData.options];
            const index = parseInt(e.target.dataset.index, 10);
            options[index] = value;
            setMatchingHeadingData(prevState => ({
                ...prevState,
                options: options
            }));
        } else {
            setMatchingHeadingData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    const handleSubmitMatchingHeading = async (e) => {
        e.preventDefault();
        try {
            const url = `${VITE_REACT_APP_SERVER}/api/test-questions/`;
            const formData = new FormData();
            formData.append('test_id', localStorage.getItem('testId'));
            formData.append('qno', MatchingHeadingData.qno);
            formData.append('content', MatchingHeadingData.question);
            formData.append('diagram', "");
            formData.append('question_type', 'Matching Heading');
            formData.append('howToSolve', MatchingHeadingData.howTheSOlve);
            formData.append('option1', MatchingHeadingData.options[0]);
            formData.append('option2', MatchingHeadingData.options[1]);
            formData.append('option3', MatchingHeadingData.options[2]);
            formData.append('option4', MatchingHeadingData.options[3]);
            formData.append('option5', MatchingHeadingData.options[4]);
            formData.append('answer', MatchingHeadingData.answer);
            formData.append('answer2', "");
            formData.append('answer3', "");
            formData.append('answer4', "");
            formData.append('answer5', "");
    
            console.log("Sending data to server:", formData);
    
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                setMatchingHeadingList(prevList => [...prevList, response.data]);
                alert("Your data is saved");
                setMatchingHeadingData({
                    howTheSOlve: '',
                    qno: '',
                    question: '',
                    options: ['', '', '', '', ''],
                    answer: ''
                });
            } else {
                alert("Error: " + response.data.error);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data: " + (error.response ? error.response.data : error.message));
        }
    };

    const handleChangeMatchingInformation = (e) => {
        const { name, value } = e.target;
        if (name === 'options') {
            const options = [...MatchingInformationData.options];
            const index = parseInt(e.target.dataset.index, 10);
            options[index] = value;
            setMatchingInformationData(prevState => ({
                ...prevState,
                options: options
            }));
        } else {
            setMatchingInformationData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    const handleSubmitMatchingInformation = async (e) => {
        e.preventDefault();
        try {
            const url = `${VITE_REACT_APP_SERVER}/api/test-questions/`;
            const formData = new FormData();
            formData.append('test_id', localStorage.getItem('testId'));
            formData.append('qno', MatchingInformationData.qno);
            formData.append('content', MatchingInformationData.question);
            formData.append('diagram', "");
            formData.append('question_type', 'Matching Information');
            formData.append('howToSolve', MatchingInformationData.howTheSOlve);
            formData.append('option1', MatchingInformationData.options[0]);
            formData.append('option2', MatchingInformationData.options[1]);
            formData.append('option3', MatchingInformationData.options[2]);
            formData.append('option4', MatchingInformationData.options[3]);
            formData.append('option5', MatchingInformationData.options[4]);
            formData.append('answer', MatchingInformationData.answer);
            formData.append('answer2', "");
            formData.append('answer3', "");
            formData.append('answer4', "");
            formData.append('answer5', "");
    
            console.log("Sending data to server:", formData);
    
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                setMatchingInformationList(prevList => [...prevList, response.data]);
                alert("Your data is saved");
                setMatchingInformationData({
                    howTheSOlve: '',
                    qno: '',
                    question: '',
                    options: ['', '', '', '', ''],
                    answer: ''
                });
            } else {
                alert("Error: " + response.data.error);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data: " + (error.response ? error.response.data : error.message));
        }
    };
    

    const [diagramPreview, setDiagramPreview] = useState('');
    const handleUploadClick = () => {
        document.getElementById('fileInput').click(); // Trigger click event on file input
    };

    const handleDiagramChange = (e) => {
        const file = e.target.files[0];
        setDiagramData({ ...DiagramData, diagram: file }); // Store file object
        // Preview thumbnail
        const reader = new FileReader();
        reader.onloadend = () => {
            setDiagramPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setDiagramPreview('');
        }
    };

    const handleDiagram = (e) => {
        const { name, value } = e.target;
        setDiagramData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitDiagram = async (e) => {
        e.preventDefault();
        try {
            const url = `${VITE_REACT_APP_SERVER}/api/test-questions/`;
            const formData = new FormData();
            formData.append('test_id', localStorage.getItem('testId'));
            formData.append('qno', DiagramData.ano);
            formData.append('content', "");
            formData.append('diagram', DiagramData.diagram); // Assuming DiagramData.diagram is a file
            formData.append('question_type', 'Diagram');
            formData.append('howToSolve', DiagramData.howTheSOlve);
            formData.append('option1', "");
            formData.append('option2', "");
            formData.append('option3', "");
            formData.append('option4', "");
            formData.append('option5', "");
            formData.append('answer', DiagramData.answer);
            formData.append('answer2', DiagramData.answer2);
            formData.append('answer3', DiagramData.answer3);
            formData.append('answer4', DiagramData.answer4);
            formData.append('answer5', DiagramData.answer5);
    
            console.log("Sending data to server:", formData);
    
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                setDiagramList(prevList => [...prevList, response.data]);
                alert("Your data is saved");
                setDiagramData({
                    howTheSOlve: '',
                    diagram: '',
                    ano: '',
                    answer: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: ''
                });
            } else {
                alert("Error: " + response.data.error);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data: " + (error.response ? error.response.data : error.message));
        }
    };
    
    const handleUploadTest = () => {
        const allData = {
            sentanceMCQList,
            MCQList,
            summaryList,
            trueFalseList,
            yesNoList,
            matchingHeadingList,
            matchingInformationList,
            diagramList
        };
    
        console.table(allData);
    
        // Optionally reset all arrays after upload
        setSentanceMCQList([]);
        setMCQList([]);
        setSummaryList([]);
        setTrueFalseList([]);
        setYesNoList([]);
        setMatchingHeadingList([]);
        setMatchingInformationList([]);
        setDiagramList([])

        navigate("/material")
    };
    return (
        <div className="flex items-center flex-col justify-center w-full gap-y-4">
            <p>{localStorage.getItem('testId')}</p>
            <p className="text-[#2b2d42] font-medium font-prompt text-[30px] py-5">Set Questions for "Test Title"</p>
            {/* form */}
            <div className="p-5 bg-[#f6f8f9] w-[90%] flex flex-col gap-y-5 font-prompt">
                {/* SENTENCE COMPLETION MCQ */}
                <div className="flex flex-col gap-y-5 ">
                    <div className="flex flex-col gap-y-5">
                        <p className="text-[#2b2d42] font-medium font-prompt text-[20px] text-center">SENTENCE COMPLETION MCQ</p>
                        <textarea
                            type="text"
                            name="howTheSolve"
                            value={sentanceMCQData.howTheSolve}
                            onChange={handleChangeSM}
                            className="mx-auto border border-[#303030] rounded-[8px] h-[200px]  w-[90%] p-2"
                            placeholder="Write a detailed description on how to solve the questions"
                        />
                    </div>
                    {/* question */}
                    <div className="flex gap-x-2 mx-auto w-[90%]">
                    <p className="font-medium font-[#303030] mb-1">Q.No</p>
                        <input
                            type="text"
                            name="qno"
                            value={sentanceMCQData.qno}
                            onChange={handleChangeSM}
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[10%] pl-2"
                        />
                        <p className="font-medium font-[#303030] mb-1">Question</p>
                        <input
                            type="text"
                            name="question"
                            value={sentanceMCQData.question}
                            onChange={handleChangeSM}
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[90%] pl-2"
                        />
                    </div>
                    {/* Option */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Option</p>
                        <div className="flex items-center justify-stretch w-full gap-x-5">
                            {/* Options A, B, C */}
                            {[sentanceMCQData.optionA, sentanceMCQData.optionB, sentanceMCQData.optionC].map((option, index) => (
                                <div key={index} className="flex items-center justify-center gap-x-2">
                                    <p>{String.fromCharCode(65 + index)}.</p>
                                    <input
                                        type="text"
                                        name={`option${String.fromCharCode(65 + index)}`}
                                        value={option}
                                        onChange={handleChangeSM}
                                        className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Answer */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Answer (write the sentence of the Answer)</p>
                        <input
                            type="text"
                            name="answer"
                            value={sentanceMCQData.answer}
                            onChange={handleChangeSM}
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                        />
                    </div>
                    <div onClick={handleSubmitSM} className="flex items-center justify-center mx-auto bg-[#2B2D42] text-white rounded-[8px] w-[30%] sm:w-[10%] py-2 cursor-pointer">
                        <p type="submit">Submit</p>
                    </div>
                </div>
                {/* MULTIPLE CHOICE QUESTIONS */}
                <div className="flex flex-col gap-y-5 ">
                    <div className="flex flex-col gap-y-5">
                        <p className="text-[#2b2d42] font-medium font-prompt text-[20px] text-center">MULTIPLE CHOICE QUESTIONS</p>
                        <textarea
                            type="text"
                            name="howTheSolve"
                            value={MCQData.howTheSolve}
                            onChange={handleChangeMCQ}
                            className="mx-auto border border-[#303030] rounded-[8px] h-[200px] w-[90%] p-2"
                            placeholder="Write a detailed description on how to solve the questions"
                        />
                    </div>
                    {/* question */}
                    <div className="flex gap-x-2 mx-auto w-[90%]">
                    <p className="font-medium font-[#303030] mb-1">Q.No</p>
                        <input
                            type="text"
                            name="qno"
                            value={MCQData.qno}
                            onChange={handleChangeMCQ}
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[10%] pl-2"
                        />
                        <p className="font-medium font-[#303030] mb-1">Question</p>
                        <input
                            type="text"
                            name="question"
                            value={MCQData.question}
                            onChange={handleChangeMCQ}
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[90%] pl-2"
                        />
                    </div>
                    {/* Option */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Options</p>
                        <div className="grid grid-cols-2 gap-5">
                            {/* Options A, B, C, D, E */}
                            {['A', 'B', 'C', 'D', 'E'].map((option, index) => (
                                <div key={index} className="flex items-center justify-center gap-x-2">
                                    <p>{option}.</p>
                                    <input
                                        type="text"
                                        name={`option${option}`}
                                        value={MCQData[`option${option}`]}
                                        onChange={handleChangeMCQ}
                                        className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Answers */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Answer 1 (write the sentence of the Answer)</p>
                        <input
                            type="text"
                            name="answer1"
                            value={MCQData.answer1}
                            onChange={handleChangeMCQ}
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                        />
                    </div>
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Answer 2 (write the sentence of the Answer)</p>
                        <input
                            type="text"
                            name="answer2"
                            value={MCQData.answer2}
                            onChange={handleChangeMCQ}
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                        />
                    </div>
                    <div onClick={handleSubmitMCQ} className="flex items-center justify-center mx-auto bg-[#2B2D42] text-white rounded-[8px] w-[30%] sm:w-[10%] py-2 cursor-pointer">
                        <button type="submit">Submit</button>
                    </div>
                </div>
                 {/* MATCHING INFORMATION */}
                 <div className="flex flex-col gap-y-5 ">
                    <div className="flex flex-col gap-y-5">
                        <p className="text-[#2b2d42] font-medium font-prompt text-[20px] text-center">MATCHING INFORMATION</p>
                        <textarea
                            type="text"
                            name="howTheSOlve"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[200px] w-[90%] p-2"
                            placeholder="Write a detailed description on how to solve the questions"
                            value={MatchingInformationData.howTheSOlve}
                            onChange={handleChangeMatchingInformation}
                        />
                    </div>
                    {/* question */}
                    <div className="flex gap-x-2 mx-auto w-[90%]">
                    <p className="font-medium font-[#303030] mb-1">Q.No</p>
                        <input
                            type="text"
                            name="qno"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[10%] pl-2"
                            value={MatchingInformationData.qno}
                            onChange={handleChangeMatchingInformation}
                        />
                        <p className="font-medium font-[#303030] mb-1">Question</p>
                        <input
                            type="text"
                            name="question"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[90%] pl-2"
                            value={MatchingInformationData.question}
                            onChange={handleChangeMatchingInformation}
                        />
                    </div>
                    {/* Option */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Option</p>
                        <div className="grid grid-cols-2 w-full gap-5">
                            {['A', 'B', 'C', 'D', 'E'].map((option, index) => (
                                <div key={option} className="flex items-center justify-center gap-x-2">
                                    <p>{option}.</p>
                                    <input
                                        type="text"
                                        name="options"
                                        data-index={index}
                                        className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                                        value={MatchingInformationData.options[index]}
                                        onChange={handleChangeMatchingInformation}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Answer */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Answer (Answer should be the option for eg:- A)</p>
                        <input
                            type="text"
                            name="answer"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                            value={MatchingInformationData.answer}
                            onChange={handleChangeMatchingInformation}
                        />
                    </div>
                    <div onClick={handleSubmitMatchingInformation} className="flex items-center justify-center mx-auto bg-[#2B2D42] text-white rounded-[8px] w-[30%] sm:w-[10%] py-2 cursor-pointer">
                        <button type="submit">Submit</button>
                    </div>
                </div>
                {/* SUMMARY, FORM COMPLETION */}
                <div className="flex flex-col gap-y-5 ">
                    <div className="flex flex-col gap-y-5">
                        <p className="text-[#2b2d42] font-medium font-prompt text-[20px] text-center">SUMMARY, FORM COMPLETION</p>
                        <textarea
                            type="text"
                            name="howTheSOlve"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[200px] w-[90%] p-2"
                            placeholder="Write a detailed description on how to solve the questions"
                            value={SummaryData.howTheSOlve}
                            onChange={handleChangeSummary}
                        />
                    </div>
                    <p className="italic ml-8">*PUT _ IN THE QUESTION FOR THE BLANK</p>
                    {/* question 1 */}
                    <div className="flex gap-x-2 mx-auto w-[90%]">
                    <p className="font-medium font-[#303030] mb-1">Q.No</p>
                        <input
                            type="text"
                            name="qno"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[10%] pl-2"
                            value={SummaryData.qno}
                            onChange={handleChangeSummary}
                        />
                        <p className="font-medium font-[#303030] mb-1">Question</p>
                        <input
                            type="text"
                            name="question1"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[90%] pl-2"
                            value={SummaryData.question1}
                            onChange={handleChangeSummary}
                        />
                    </div>
                    {/* Answer 1 */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Answer</p>
                        <input
                            type="text"
                            name="answer1"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                            value={SummaryData.answer1}
                            onChange={handleChangeSummary}
                        />
                    </div>
                    <div onClick={handleSubmitSummary} className="flex items-center justify-center mx-auto bg-[#2B2D42] text-white rounded-[8px] w-[30%] sm:w-[10%] py-2 cursor-pointer">
                        <button type="submit">Submit</button>
                    </div>
                </div>
                {/* TRUE-FALSE-NOT GIVEN */}
                <div className="flex flex-col gap-y-5 ">
                    <div className="flex flex-col gap-y-5">
                        <p className="text-[#2b2d42] font-medium font-prompt text-[20px] text-center">TRUE-FALSE-NOT GIVEN</p>
                        <textarea
                            type="text"
                            name="howTheSOlve"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[200px] w-[90%] p-2"
                            placeholder="Write a detailed description on how to solve the questions"
                            value={TrueFalseData.howTheSOlve}
                            onChange={handleChangeTrueFalse}
                        />
                    </div>
                    {/* question */}
                    <div className="flex gap-x-2 mx-auto w-[90%]">
                    <p className="font-medium font-[#303030] mb-1">Q.No</p>
                        <input
                            type="text"
                            name="qno"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[10%] pl-2"
                            value={TrueFalseData.qno}
                            onChange={handleChangeTrueFalse}
                        />
                        <p className="font-medium font-[#303030] mb-1">Question</p>
                        <input
                            type="text"
                            name="question"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[90%] pl-2"
                            value={TrueFalseData.question}
                            onChange={handleChangeTrueFalse}
                        />
                    </div>
                    {/* Answer */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Answer</p>
                        <input
                            type="text"
                            name="answer"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[40%] pl-2"
                            value={TrueFalseData.answer}
                            onChange={handleChangeTrueFalse}
                        />
                    </div>
                    <div onClick={handleSubmitTrueFalse} className="flex items-center justify-center mx-auto bg-[#2B2D42] text-white rounded-[8px] w-[30%] sm:w-[10%] py-2 cursor-pointer">
                        <button type="submit">Submit</button>
                    </div>
                </div>
                {/* YES-NO-NOT GIVEN */}
                <div className="flex flex-col gap-y-5 ">
                    <div className="flex flex-col gap-y-5">
                        <p className="text-[#2b2d42] font-medium font-prompt text-[20px] text-center">YES-NO-NOT GIVEN</p>
                        <textarea
                            type="text"
                            name="howTheSOlve"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[200px] w-[90%] p-2"
                            placeholder="Write a detailed description on how to solve the questions"
                            value={YesNoData.howTheSOlve}
                            onChange={handleChangeYesNo}
                        />
                    </div>
                    {/* question */}
                    <div className=" flex gap-x-2 mx-auto w-[90%]">
                    <p className="font-medium font-[#303030] mb-1">Q.No</p>
                        <input
                            type="text"
                            name="qno"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[10%] pl-2"
                            value={YesNoData.qno}
                            onChange={handleChangeYesNo}
                        />
                        <p className="font-medium font-[#303030] mb-1">Question</p>
                        <input
                            type="text"
                            name="question"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[90%] pl-2"
                            value={YesNoData.question}
                            onChange={handleChangeYesNo}
                        />
                    </div>
                    {/* Answer */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Answer</p>
                        <input
                            type="text"
                            name="answer"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[40%] pl-2"
                            value={YesNoData.answer}
                            onChange={handleChangeYesNo}
                        />
                    </div>
                    <div onClick={handleSubmitYesNo} className="flex items-center justify-center mx-auto bg-[#2B2D42] text-white rounded-[8px] w-[30%] sm:w-[10%] py-2 cursor-pointer">
                        <button type="submit">Submit</button>
                    </div>
                </div>
                {/* MATCHING HEADING */}
                <div className="flex flex-col gap-y-5 ">
                    <div className="flex flex-col gap-y-5">
                        <p className="text-[#2b2d42] font-medium font-prompt text-[20px] text-center">MATCHING HEADING</p>
                        <textarea
                            type="text"
                            name="howTheSOlve"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[200px] w-[90%] p-2"
                            placeholder="Write a detailed description on how to solve the questions"
                            value={MatchingHeadingData.howTheSOlve}
                            onChange={handleChangeMatchingHeading}
                        />
                    </div>
                    {/* question */}
                    <div className="flex gap-x-2 mx-auto w-[90%]">
                    <p className="font-medium font-[#303030] mb-1">Q.No</p>
                        <input
                            type="text"
                            name="qno"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[10%] pl-2"
                            value={MatchingHeadingData.qno}
                            onChange={handleChangeMatchingHeading}
                        />
                        <p className="font-medium font-[#303030] mb-1">Question (only give the paragraph A, para B as question)</p>
                        <input
                            type="text"
                            name="question"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[90%] pl-2"
                            value={MatchingHeadingData.question}
                            onChange={handleChangeMatchingHeading}
                        />
                    </div>
                    {/* Option */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Option (list of heading)</p>
                        <div className="grid grid-cols-2 w-full gap-5">
                            {['1', '2', '3', '4', '5'].map((option, index) => (
                                <div key={option} className="flex items-center justify-center gap-x-2">
                                    <p>{option}.</p>
                                    <input
                                        type="text"
                                        name="options"
                                        data-index={index}
                                        className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                                        value={MatchingHeadingData.options[index]}
                                        onChange={handleChangeMatchingHeading}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Answer */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Answer (Answer should be the NUMBER of Heading for eg:- 1</p>
                        <input
                            type="text"
                            name="answer"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                            value={MatchingHeadingData.answer}
                            onChange={handleChangeMatchingHeading}
                        />
                    </div>
                    <div onClick={handleSubmitMatchingHeading} className="flex items-center justify-center mx-auto bg-[#2B2D42] text-white rounded-[8px] w-[30%] sm:w-[10%] py-2 cursor-pointer">
                        <button type="submit">Submit</button>
                    </div>
                </div>
                {/* Diagram */}
                <div className="flex flex-col gap-y-5 ">
                    <div className="flex flex-col gap-y-5">
                        <p className="text-[#2b2d42] font-medium font-prompt text-[20px] text-center">Plan Map, Diagram</p>
                        <textarea
                            type="text"
                            name="howTheSOlve"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[200px] w-[90%] p-2"
                            placeholder="Write a detailed description on how to solve the questions"
                            value={DiagramData.howTheSOlve}
                            onChange={handleChangeMatchingHeading}
                        />
                    </div>
                    {/* question */}
                    <div className="flex gap-x-2 mx-auto w-[90%]">
                    <p className="font-medium font-[#303030] mb-1">A.No</p>
                        <input
                            type="text"
                            name="ano"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-[10%] pl-2"
                            value={DiagramData.ano}
                            onChange={handleDiagram}
                        />
                        <p className="font-medium font-[#303030] mb-1">Enter the Diagram image</p>
                        <input type="file" id="fileInput" className="hidden" onChange={handleDiagramChange} />
                        <div onClick={handleUploadClick} className="ml-3 border border-[#303030] rounded-[8px] h-auto w-[260px] text-[14px] flex items-center justify-center cursor-pointer">
                            {diagramPreview ? <img src={diagramPreview} alt="Diagram Preview" className="max-w-[200px] h-auto p-1" /> : <p className='p-2'>Upload Diagram</p>}
                        </div>
                    </div>
                    
                    {/* Answer */}
                    <div className="mx-auto w-[90%]">
                        <p className="font-medium font-[#303030] mb-1">Answer</p>
                        <input
                            type="text"
                            name="answer"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                            value={DiagramData.answer}
                            onChange={handleDiagram}
                        />
                        <p className="font-medium font-[#303030] mb-1">Answer 2</p>
                        <input
                            type="text"
                            name="answer2"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                            value={DiagramData.answer2}
                            onChange={handleDiagram}
                        />
                        <p className="font-medium font-[#303030] mb-1">Answer 3</p>
                        <input
                            type="text"
                            name="answer3"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                            value={DiagramData.answer3}
                            onChange={handleDiagram}
                        />
                        <p className="font-medium font-[#303030] mb-1">Answer 4</p>
                        <input
                            type="text"
                            name="answer4"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                            value={DiagramData.answer4}
                            onChange={handleDiagram}
                        />
                        <p className="font-medium font-[#303030] mb-1">Answer 5</p>
                        <input
                            type="text"
                            name="answer5"
                            className="mx-auto border border-[#303030] rounded-[8px] h-[40px] w-full pl-2"
                            value={DiagramData.answer5}
                            onChange={handleDiagram}
                        />
                    </div>
                    <div onClick={handleSubmitDiagram} className="flex items-center justify-center mx-auto bg-[#2B2D42] text-white rounded-[8px] w-[30%] sm:w-[10%] py-2 cursor-pointer">
                        <button type="submit">Submit</button>
                    </div>
                </div>
               
                <div onClick={handleUploadTest} className="flex items-center justify-center mx-auto bg-[#2B2D42] text-white rounded-[8px] w-[30%] sm:w-[40%] py-2 cursor-pointer">
                    <p>Upload Test</p>
                </div>
            </div>
        </div>
    )
}

export default Question
