import React from 'react';
import './ListBlock1.css'; // 별도의 CSS 파일로 스타일을 관리합니다.
import { useNavigate } from 'react-router-dom';

function ListBlock3({Num, Address, Price, Date, Request_id, Requester}) {
    const navigate = useNavigate();

    return (
        <div className='ListBlockContainer' onClick={() => navigate(`/request/${Request_id}`)}>
            <div className='ListBlockHeader'>
                {Address}
            </div>
            <div className='ListBlockBody'>
                <div>거래 가격 : {Price}</div><p></p>
                <div>요청인 : {Requester}</div><p></p>
                <div>요청일 : {Date}</div>
            </div>
        </div>
    )
}

export default ListBlock3;
