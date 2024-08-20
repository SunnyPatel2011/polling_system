import './viewQuestion.css';
import edit from '../assets/edit.png';
import deletes from '../assets/delete.png';
import view from '../assets/view.png';
import link from '../assets/link.png';
import close from '../assets/close.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';


function ViewQuestion() {
const [questions, setQuestions] = useState([]);
const [selectedQuestionId, setSelectedQuestionId] = useState(null);
const [selectedQuestion, setSelectedQuestion] = useState(null);
const navigate = useNavigate();

const token = localStorage.getItem('token');

useEffect(() => {
    const fetchQuestions = async() => {
        try {
            const response = await axios.get('http://localhost:8000/questions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setQuestions(response.data.questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }
    fetchQuestions();
}, [token]);

const handleDelete = async(questionId) => {
    try {
    await axios.delete(`http://localhost:8000/questions/${questionId}/delete`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    setQuestions(questions.filter(q => q._id !== questionId));
    console.log('Success delete question')
    console.log('delete clicked');
} catch (error) {
    alert('Votes is given so it wont be deleted');
        console.error('Error deleteing questions', error);
    }
};


const handleView = async(questionId) => {
    try {
        const response = await axios.get(`http://localhost:8000/questions/${questionId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setSelectedQuestion(response.data.question);
        setSelectedQuestionId(questionId);
        console.log('handle view clicked');
    } catch (error) {
        console.error('Error fetching question details', error);
    }
}
const handleClosing = () => {
    setSelectedQuestion(null);
}
const handleEdit = (questionId) => {
    navigate(`/questions/${questionId}/edit`)
}

const handleLink = (questionId) => {
    navigate(`/questions/${questionId}`);
}

    return (
        <>
        <Header />
            <div className='viewquestion'>
        {questions.map(q => (
                <div key={q._id} className='component'>

                    <div className='mainquestion'>
                        <p>{q.title}</p>
                        <img src={edit} alt="edit" className='edit' onClick={() => handleEdit(q._id)} />
                        <img src={deletes} onClick={() => handleDelete(q._id)} alt="delete" className='deletes' />
                    </div>

                    <div className='count'>
                        <img src={view} alt="views" className='viewer' onClick={() => handleView(q._id)}/>
                        <p>{q.totalVotes}</p>
                        <img src={link} alt="Link" className='linker' onClick={() => handleLink(q._id)} />
                    </div>

                </div>
            ))}
            </div>
            {selectedQuestion && (
                <div className='optionview'>
                    <img src={close} alt="close" onClick={() => handleClosing()} />
                    <h3>Option for "{selectedQuestion.title}"</h3>
                    {selectedQuestion.options.map(option => (
                        <div key={option._id} className='optionitem'>
                            <p>{option.text}: {option.votes}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
export default ViewQuestion;