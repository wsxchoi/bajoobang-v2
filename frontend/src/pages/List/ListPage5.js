import React, { useState, useEffect } from 'react';
import './ListPage1.css';
import ListBlock from './ListBlock5';
import axios from 'axios';

function ListPage5() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [listData, setListData] = useState([]);
    const itemsPerPage = 6; // 한 페이지당 6개의 박스를 표시하도록 설정

    useEffect(() => {
        // 더미 데이터 설정
        const dummyData = [
            { Num: 1, Address: '서울특별시 강남구 역삼동', Month: '100만원', house_id: 1 },
            { Num: 2, Address: '서울특별시 서초구 서초동', Month: '90만원', house_id: 2 },
            { Num: 3, Address: '서울특별시 송파구 잠실동', Month: '120만원', house_id: 3 },
            { Num: 4, Address: '서울특별시 종로구 청진동', Month: '150만원', house_id: 4 },
            { Num: 5, Address: '서울특별시 용산구 이촌동', Month: '80만원', house_id: 5 },
            { Num: 6, Address: '서울특별시 강서구 화곡동', Month: '70만원', house_id: 6 },
            { Num: 7, Address: '서울특별시 관악구 신림동', Month: '60만원', house_id: 7 },
            { Num: 8, Address: '서울특별시 마포구 서교동', Month: '110만원', house_id: 8 },
            { Num: 9, Address: '서울특별시 성북구 정릉동', Month: '50만원', house_id: 9 },
            { Num: 10, Address: '서울특별시 은평구 불광동', Month: '40만원', house_id: 10 },
            { Num: 11, Address: '서울특별시 동작구 흑석동', Month: '130만원', house_id: 11 },
            { Num: 12, Address: '서울특별시 강동구 천호동', Month: '140만원', house_id: 12 },
        ];

        // API에서 데이터 가져오기
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/member/like'); // 실제 API 엔드포인트로 대체
                const requestData = response.data.map((item, index) => ({
                    Num: index + 1,
                    Address: item.address,
                    Month: item.month_price,
                    house_id: item.house_id,
                }));
                setListData(requestData.length > 0 ? requestData : dummyData); // 실제 데이터가 있으면 사용하고, 없으면 더미 데이터 사용
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
                setListData(dummyData); // 오류가 발생하면 더미 데이터 사용
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems(listData.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage, listData]);

    const paginate = (pageNumber, event) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='ListBackground'>
            <div className='ListGrid'> {/* 그리드 레이아웃으로 변경 */}
                {currentItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListBlock 
                            Num={item.Num} 
                            Address={item.Address}
                            Month={item.Month}
                            house_id={item.house_id}
                        />
                    </React.Fragment>
                ))}
            </div>
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={(event) => paginate(number, event)} href='!#' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default ListPage5;
