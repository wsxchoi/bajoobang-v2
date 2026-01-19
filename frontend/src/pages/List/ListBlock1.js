import React from 'react';
import './ListBlock1.css';

function ListBlock({ Num, Address, Person, Star, onClick }) {
    return(
        <div className='ListBlockContainer' onClick={onClick}>
            <div className='ListBlockHeader'>
                {Address}
            </div>
            <div className='ListBlockBody'>
                <div className='ListPerson'>발품인 : {Person}</div><p></p>
                <div className='ListStar'>별점 : {Star}</div>
            </div>
        </div>
    );
}

export default ListBlock;
