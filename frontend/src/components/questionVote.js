import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './questionVote.css';

const QuestionVote = () => {
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/questions/${questionId}`,{
                    headers: { Authorization: `Bearer ${token}`}
                });
                setQuestion(response.data.question);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchQuestion();
    }, [questionId]);

    const handleVoteSubmit = async () => {
        if (!selectedOption) {
            alert('Please select an option to vote.');
            return;
        }else{
            navigate('/viewquestion')
        }

        try {
            await axios.put(`http://localhost:8000/options/${selectedOption}/add_vote`, null, {
                headers: { Authorization: `Bearer ${token}`}
            });
            setVoteSubmitted(true);
        } catch (error) {
            console.error('Error submitting vote:', error);
            alert('Failed to submit vote.');
        }
    };

    if (!question) {
        return <p>Loading...</p>;
    }

    return (
        <div className="question-vote">
            <h2>{question.title}</h2>
            <div className="options">
                {question.options.map((option) => (
                    <div key={option._id}>
                        <input
                            type="radio"
                            id={option._id}
                            name="option"
                            value={option._id}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        />
                        <label htmlFor={option._id}>{option.text}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleVoteSubmit} >
                Submit Vote
            </button>
        </div>
    );
};

export default QuestionVote;