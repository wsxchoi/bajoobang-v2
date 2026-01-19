import React, { useState, useEffect } from 'react';
import './ListPage1.css'; // 페이지 스타일을 여기에 유지합니다.
import ListBlock3 from './ListBlock3';
import axios from 'axios';

function ListPage3() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [listData, setListData] = useState([]);
    const itemsPerPage = 6; // 한 페이지당 6개의 박스를 표시하도록 설정

    useEffect(() => {
        // 더미 데이터 설정
        const dummyData = [
            { Num: 1, Address: '서울특별시 서초구 서초동', Price: '10,000원', Requester: '손흥민', Date: '2024.03.29', Request_id: 1 },
            { Num: 2, Address: '서울특별시 강남구 역삼동', Price: '20,000원', Requester: '김연아', Date: '2024.03.28', Request_id: 2 },
            { Num: 3, Address: '서울특별시 강동구 천호동', Price: '15,000원', Requester: '박지성', Date: '2024.03.27', Request_id: 3 },
            { Num: 4, Address: '서울특별시 강서구 화곡동', Price: '12,000원', Requester: '이강인', Date: '2024.03.26', Request_id: 4 },
            { Num: 5, Address: '서울특별시 마포구 합정동', Price: '30,000원', Requester: '김연경', Date: '2024.03.25', Request_id: 5 },
            { Num: 6, Address: '서울특별시 용산구 이태원동', Price: '8,000원', Requester: '류현진', Date: '2024.03.24', Request_id: 6 },
            { Num: 7, Address: '서울특별시 성동구 성수동', Price: '14,000원', Requester: '추신수', Date: '2024.03.23', Request_id: 7 },
            { Num: 8, Address: '서울특별시 종로구 혜화동', Price: '18,000원', Requester: '황희찬', Date: '2024.03.22', Request_id: 8 },
            { Num: 9, Address: '서울특별시 서대문구 홍제동', Price: '25,000원', Requester: '손흥민', Date: '2024.03.21', Request_id: 9 },
            { Num: 10, Address: '서울특별시 동작구 상도동', Price: '22,000원', Requester: '박지성', Date: '2024.03.20', Request_id: 10 },
            { Num: 11, Address: '서울특별시 송파구 잠실동', Price: '19,000원', Requester: '김연아', Date: '2024.03.19', Request_id: 11 },
            { Num: 12, Address: '서울특별시 강남구 청담동', Price: '17,000원', Requester: '김연경', Date: '2024.03.18', Request_id: 12 },
            { Num: 13, Address: '서울특별시 영등포구 여의도동', Price: '16,000원', Requester: '류현진', Date: '2024.03.17', Request_id: 13 },
            { Num: 14, Address: '서울특별시 광진구 화양동', Price: '23,000원', Requester: '이강인', Date: '2024.03.16', Request_id: 14 },
        ];

        // API에서 데이터 가져오기
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/member/alarm'); // 실제 API 엔드포인트로 대체
                const requestData = response.data.map((item, index) => ({
                    Num: index + 1,
                    Address: item.address,
                    Price: item.price,
                    Requester: item.requester,
                    Date: item.date,
                    Request_id: item.request_id,
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
                        <ListBlock3 
                            Num={item.Num} 
                            Address={item.Address} 
                            Price={item.Price} 
                            Date={item.Date} 
                            Request_id={item.Request_id} 
                            Requester={item.Requester} 
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
    )
}

export default ListPage3;
