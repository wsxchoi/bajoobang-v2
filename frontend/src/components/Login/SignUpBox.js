import React, { useState } from 'react';
import './box.css';
import axios from 'axios';
import { ReactComponent as LoginLeft } from '../images/loginLeft.svg';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import houseImage from '../images/login_house.svg'; // Import the SVG image

function SignUpBox() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [address, setAddress] = useState('');
    const [account, setAccount] = useState('');
    

    const handleLoginClick = () => {
        navigate('/login');
    };

    async function SignUpPost() {
        const data = {
            name: name,
            email: email,
            pw: pw,
            address: address,
            account : account
        };
        try {
            console.log(name);
            const response = await axios.post('/api/signup', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Signup success:', response.data);
            toast.success('회원가입에 성공했습니다.');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            toast.error('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    }

    return (
        <div className='container1'>
            <div className='imageBox'>
                <img src={houseImage} alt="House" className='houseImage' />
            </div>
        <div className='box'>
            <div className='rightBox'>
                <p className='title'>WELCOME!</p>
                <Input isPrivate={false} title={"Name"} placeholder={'Name'} onChange={(e) => setName(e.target.value)} />
                <Input isPrivate={false} title={"Email Address"} placeholder={'Email Address'} onChange={(e) => setEmail(e.target.value)} />
                <Input isPrivate={true} title={"Password"} placeholder={'Password'} onChange={(e) => setPw(e.target.value)} />
                <Input isPrivate={false} title={"Location Address"} placeholder={'Location Address'} onChange={(e) => setAddress(e.target.value)} />
                <Input isPrivate={true} title={"Account Number"} placeholder={'Account Number'} onChange={(e) => setAccount(e.target.value)} />
                <button className='button' onClick={SignUpPost}>Sign Up</button>
                    <p className='loginText' onClick={handleLoginClick}>Log In</p>
            </div>
        </div>
        </div>
    );
}

export default SignUpBox;
