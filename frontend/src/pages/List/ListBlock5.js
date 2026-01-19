import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListBlock1.css'; // 별도의 CSS 파일로 스타일을 관리합니다.

function ListBlock5({ Num, Address, Month, house_id }) {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('house_id : ' + house_id);
        navigate(`/helpinfo/${house_id}`);
    };

    return (
        <div onClick={handleClick}  className='ListBlockContainer'>
            <div className='ListBlockHeader'>
                {Address}
            </div>
            <div className='ListBlockBody'>
                <div>월세: {Month}</div><p></p>
                <div>중개인: </div><p></p>
                <div>중개사 위치: </div><p></p>
            </div>
        </div>
    );
}

export default ListBlock5;
