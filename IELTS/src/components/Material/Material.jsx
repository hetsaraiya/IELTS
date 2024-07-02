import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const VITE_REACT_APP_SERVER = import.meta.env.VITE_REACT_APP_SERVER;
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, ContentState, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Material = () => {

    const handleUploadClick = () => {
        document.getElementById('fileInput').click(); // Trigger click event on file input
    };

    const navigate = useNavigate();

    // State to store form data
    const [formData, setFormData] = useState({
        testType: '',
        testTitle: '',
        testThumbnail: '',
        readingContent: '',
        listeningContent: ''
    });
    const [editorState, setEditorState] = useState(() =>EditorState.createEmpty(),);
    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        setFormData({ ...formData, readingContent: JSON.stringify(rawContent) });
    };

    // State to store thumbnail preview URL
    const [thumbnailPreview, setThumbnailPreview] = useState('');

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, testThumbnail: file }); // Store file object
        // Preview thumbnail
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setThumbnailPreview('');
        }
    };

    const handleNextClick = async () => {
        const data = new FormData();
        data.append('type', formData.testType);
        data.append('title', formData.testTitle);
        data.append('thumbnail', formData.testThumbnail);
        if (formData.readingContent) {
            data.append('content_for_reading', formData.readingContent);
        }
        if (formData.listeningContent) {
            data.append('content_for_listing', formData.listeningContent);
        }

        try {
            const response = await axios.post( VITE_REACT_APP_SERVER + "/api/test/", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                localStorage.setItem('testId', response.data.id);

                navigate('/question');
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to update form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="flex items-center flex-col justify-center w-full gap-y-4">
            <p className="text-[#2b2d42] font-medium font-prompt text-[30px] py-5">Test Material Upload</p>
            {/* form */}
            <div className="p-5 bg-[#f6f8f9] w-[90%] flex flex-col gap-y-5 font-prompt">
                <div className="flex flex-col items-start gap-y-5">
                    {/* select test */}
                    <div>
                        <li className="font-medium font-[#303030] mb-1">Select the type of Test</li>
                        <div className="flex items-center justify-between ml-3">
                            <div className="flex items-center justify-center gap-x-2">
                                <input type="radio" name="testType" id="listening" value="Listening" onChange={handleChange} />
                                <label htmlFor="listening" className="font-normal text-[#303030]">Listening</label>
                            </div>
                            <div className="flex items-center justify-center gap-x-2">
                                <input type="radio" name="testType" id="reading" value="Reading" onChange={handleChange} />
                                <label htmlFor="reading" className="font-normal text-[#303030]">Reading</label>
                            </div>
                        </div>
                    </div>
                    {/* title test */}
                    <div>
                        <li className="font-medium font-[#303030] mb-1">Title of Test</li>
                        <input type="text" name="testTitle" className="ml-3 border border-[#303030] rounded-[8px] h-[40px] w-[260px] pl-2" onChange={handleChange} />
                    </div>
                    {/* thumbnail test */}
                    <div>
                        <li className="font-medium font-[#303030] mb-1">Thumbnail of Test</li>
                        <input type="file" id="fileInput" className="hidden" onChange={handleThumbnailChange} />
                        {/* onChange={(e) => setFormData({ ...formData, testThumbnail: e.target.files[0] })} */}
                        <div onClick={handleUploadClick} className="ml-3 border border-[#303030] rounded-[8px] h-auto w-[260px] text-[14px] flex items-center justify-center cursor-pointer">
                            {thumbnailPreview ? <img src={thumbnailPreview} alt="Thumbnail Preview" className="max-w-[200px] h-auto p-1" /> : <p className='p-2'>Upload Thumbnail</p>}
                        </div>
                        {/* Thumbnail preview */}
                        {/* {thumbnailPreview && (
                            <div className="mt-2">
                                <img src={thumbnailPreview} alt="Thumbnail Preview" className="max-w-[200px] h-auto" />
                            </div>
                        )} */}
                    </div>
                    {/* Content for Reading test */}
                    <div>
                        <li className="font-medium font-[#303030] mb-1">Content of Reading Test</li>
                        {/* <textarea type="text" name="readingContent" className="ml-3 border border-[#303030] rounded-[8px] h-[200px] w-[260px] sm:w-[560px] p-2" onChange={handleChange} /> */}
                        <div className="ml-3 border border-[#303030] rounded-[8px] max-h-[200px] overflow-y-scroll w-[260px] sm:w-[560px] p-2">
                            <Editor toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName" editorClassName="editorClassName" editorState={editorState} onChange={handleEditorChange} />
                        </div>
                    </div>
                    {/* Content of Listening Test */}
                    <div>
                        <li className="font-medium font-[#303030] mb-1">Content of Listening Test</li>
                        <input type="text" name="listeningContent" className="ml-3 border border-[#303030] rounded-[8px] h-[40px] w-[260px] pl-2" placeholder="URL" onChange={handleChange} />
                    </div>
                </div>
                <div onClick={handleNextClick} className="flex items-center justify-center mx-auto bg-[#2B2D42] text-white rounded-[8px] w-[30%] sm:w-[10%] py-2 cursor-pointer">
                    <p>Next</p>
                </div>
            </div>
        </div>
    )
}

export default Material