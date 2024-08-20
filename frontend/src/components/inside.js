import './inside.css';
import polls from '../assets/polls.png';
import choice from '../assets/choice.png';
import ranking from '../assets/ranking.png';
import quiz from '../assets/quiz.png';
import open from '../assets/open.png';
import close from '../assets/close.png';
import axios from 'axios';
import Header from './header.js';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import ViewQuestionBtn from '../pages/viewQuestionBtn';

function Inside() {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);
    const [questionId, setQuestionId] = useState(null);// eslint-disable-line no-unused-vars
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);

        if (index === options.length - 1 && event.target.value) {
            setOptions([...newOptions, '']);
        }
    }

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
        setQuestion('');
        setOptions(['']);
    }

    const handleSave = async () => {
        try {
            const questionResponse = await axios.post('http://localhost:8000/questions/create', 
                { title: question },
                {headers: { Authorization: `Bearer ${token}`}}
            );

            const newQuestionId = questionResponse.data.question._id;
            setQuestionId(newQuestionId);

            const optionTexts = options.slice(0, -1);
            await axios.post(`http://localhost:8000/questions/${newQuestionId}/options/create`, 
                { text: optionTexts },
                {headers: { Authorization: `Bearer ${token}`}}
            );

            alert('Question and options saved successfully!');
            setIsOpen(false);   
            setQuestion('');
            setOptions(['']);
            
        } catch (error) {
            console.error('Error saving question:', error);
            alert('Failed to save question.');
        }
    };


    return (
        <>
        <Header />
            <div className="back">
                <div className='pollcreates'>
                    <img src={polls} alt="" />
                    <div className='pollpara'>
                        <span>Create your polls</span>
                        <p>Engage your audience with live polls, surveys or<br /> quizzes.</p>
                    </div>
                    <div onClick={() => navigate('/viewquestion')}>
                    <ViewQuestionBtn/>
                    </div>
                </div>
                <div className='pollers'>
                    <div className='choices' onClick={handleOpen}>
                        <img src={choice} alt="choice" />
                        <p>Multiple choice</p>
                    </div>
                    <div className='ranking'>
                        <img src={ranking} alt="ranking" />
                        <p>Ranking</p>
                    </div>
                </div>

                <div className='poller2'>
                    <div className='quiz'>
                        <img src={quiz} alt="quiz" />
                        <p>Quiz</p>
                    </div>
                    <div className='open'>
                        <img src={open} alt="open" />
                        <p>Open text</p>
                    </div>
                </div>

                {isOpen && (
                    <div className="backgrounds">
                        <img src={close} alt="close" onClick={handleClose} />
                        <hr />
                        <input 
                            type="text" 
                            placeholder='What would you like to ask? *' 
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required 
                        />
                        {options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={option}
                                    placeholder={`Option ${index + 1}`}
                                    onChange={(e) => handleOptionChange(index, e)}
                                />
                            </div>
                        ))}
                        <button onClick={handleSave}>Save</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Inside;
