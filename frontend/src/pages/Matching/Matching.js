import React, { useEffect, useState } from 'react';
import './Matching.css';
import { ReactComponent as ProfileIcon } from '../../components/images/mp_profile.svg'; // Assuming you have the SVG in this path
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Matching() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState();
    const [apiEndpoint, setApiEndpoint] = useState('');

    const Request_id = location.state ? location.state.Request_id : null;

    useEffect(() => {
        if (location.state && location.state.fromPage === 'ListPage2') {
            setApiEndpoint('/api/member/registered/matching');
        } else if (location.state && location.state.fromPage === 'ListPage4') {
            setApiEndpoint('/api/member/footwork/matching');
        }
    }, [location]);

    useEffect(() => {
        const fetchData = async () => {
            console.log('request_id : ' + Request_id);
            try {
                if (apiEndpoint) {
                    const response = await axios.get(apiEndpoint, {
                        headers: {
                            'request_id': Request_id
                        }
                    });
                    
                    setData(response.data);
                    console.log('매칭데이터 : ', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        if (Request_id && apiEndpoint) {
            fetchData();
        }
    }, [Request_id, apiEndpoint]);

    return (
        <div className="matching-container">
            <div className="profile-section">
                <div className="profile-card">
                    <p className='profile-title'> 매칭 상대</p>
                    <ProfileIcon className="profile-icon"/>
                    
                    <p className="profile-name">{data?.worker || '홍길동'}</p>
                    <p className="profile-rating">⭐ {data?.rating || '4.2'}</p>
                </div>
            </div>
            <div className='right'>
            <div className="info-section">
                <div className="info-item">
                    <p>거래 가격</p>
                    <p>|</p>
                    <p>{data?.price || '15,000원'}</p>
                </div>
                <p></p>
                <div className="info-item">
                    <p>발품 일시</p>
                    <p>|</p>
                    <p>{data?.date || '2024년 3월 31일'}</p>
                </div>
                <p></p>
                <div className="info-item">
                    <p>거래 마감 기한</p>
                    <p>|</p>
                    <p>{data?.deadline || '2024년 4월 2일'}</p>
                </div>
            </div>
            <div className="button-section">
                <button className="action-button" onClick={() => navigate(`/request/${Request_id}`)}>요청서</button>
            </div></div>
        </div>
    );
}

export default Matching;
