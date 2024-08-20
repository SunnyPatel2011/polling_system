import { useState, useEffect } from 'react';
import './header.css';
import logo from '../assets/poll.png';
import arrow from '../assets/left-arrow.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Header() {
  const [datas, setDatas] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handlefetchuser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log('API response', response.data);

      if (response.data.user) {
        const { firstName, lastName } = response.data.user;
        const userDatas = `${firstName[0]}${lastName[0]}`.toUpperCase();
        setDatas(userDatas);
      } else {
        console.log('User data not found in response', response.data);
      }
    } catch (error) {
      console.log('Error fetching data', error);
    }
  }

  const handlelogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    handlefetchuser();
  }, [])

  return (
    <>
      <div className='header'>
        <div className='polli' onClick={() => navigate('/inside')}>
          <img src={arrow} alt="arrow" />
          <img src={logo} alt="logo" />
          <p className='poller'>PollErs</p>
        </div>
        <p className='usernames' onClick={() => handlelogout()}>{datas}</p>
      </div>
    </>
  );
}

export default Header;
