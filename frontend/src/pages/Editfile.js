import React, { useEffect, useState } from 'react';
import axios from 'axios';
import closes from '../assets/close.png';
import Header from '../components/header';
import { useParams, useNavigate } from 'react-router-dom';
import './editfile.css';

const EditFile = () => {
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/questions/${questionId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setQuestion(response.data.question);
                setOptions(response.data.question.options);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchQuestion();
    }, [questionId, token]);

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index].text = event.target.value;
        setOptions(newOptions);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8000/questions/${questionId}/update`,
                { title: question.title, options },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/viewquestion');
        } catch (error) {
            console.error('Error updating question:', error);
            alert('Failed to update question.');
        }
    };

    const handleDeleteOptions = async (optionId) => {
        try {
            await axios.delete(`http://localhost:8000/options/${optionId}/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOptions(options.filter(option => option._id !== optionId));
            alert('Option deleted successfully!');
        } catch (error) {
            console.error('Error deleting option:', error);
        }
    };

    if (!question) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <Header />
        <div className='editsquestion'>
            <h2>Edit Question</h2>
            <input
                type="text"
                value={question.title}
                onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                className='Ques'
            />
            {options.map((option, index) => (
                <div key={option} className='optioned'>
                    <input
                        type="text"
                        value={option.text}
                        onChange={(e) => handleOptionChange(index, e)}
                    />
                
                    <img src={closes} alt="close" onClick={() => handleDeleteOptions(option._id)} />
                </div>
            ))}


            <button onClick={handleSave}className='btns'>Save</button>
        </div>
</>
    );
};

export default EditFile;
