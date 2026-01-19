import React, { useState, useContext } from 'react';
import './box.css';
import axios from 'axios';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import houseImage from '../images/login_house.svg'; // Import the SVG image

function LoginBox() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    async function LoginPost() {
        const data = {
            email: email,
            pw: pw,
        };
        try {
            const response = await axios.post('/api/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                login();
                toast.success('로그인에 성공했습니다.');
                navigate('/helpmap');
            } else {
                toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    }

    return (
        <div  className='container1' >
            <div className='imageBox'>
                <img src={houseImage} alt="House" className='houseImage' />
            </div>
            <div className='box'>
                <div className='rightBox'>
                    <p className='title'>WELCOME!</p>
                    <Input isPrivate={false} title={"Email"} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)} />
                    <Input isPrivate={true} title={"Password"} placeholder={'Password'} onChange={(e) => setPw(e.target.value)} />
                    <button className='button' onClick={LoginPost}>Log In</button>
                    <p className='loginText' onClick={handleSignUpClick}>Sign Up</p>
                </div>
            </div>
        </div>
    );
}

export default LoginBox;
