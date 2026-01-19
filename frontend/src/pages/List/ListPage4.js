import React, { useState, useEffect } from 'react';
import './ListPage1.css'; // 페이지 스타일을 여기에 유지합니다.
import ListBlock4 from './ListBlock4';
import axios from 'axios';

function ListPage4() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [listData, setListData] = useState([]);
    const itemsPerPage = 6; // 한 페이지당 6개의 박스를 표시하도록 설정

    useEffect(() => {
        // 더미 데이터 설정
        const dummyData = [
            { Num: 1, Address: '서울특별시 강남구 역삼동', Price: '10억', State: '요청 중', Date: '2024-08-01', Request_id: 1 },
            { Num: 2, Address: '서울특별시 서초구 서초동', Price: '9억', State: '매칭 완료', Date: '2024-08-02', Request_id: 2 },
            { Num: 3, Address: '서울특별시 송파구 잠실동', Price: '12억', State: '작성 완료', Date: '2024-08-03', Request_id: 3 },
            { Num: 4, Address: '서울특별시 종로구 청진동', Price: '15억', State: '매칭 실패', Date: '2024-08-04', Request_id: 4 },
            { Num: 5, Address: '서울특별시 용산구 이촌동', Price: '8억', State: '요청 중', Date: '2024-08-05', Request_id: 5 },
            { Num: 6, Address: '서울특별시 강서구 화곡동', Price: '7억', State: '매칭 완료', Date: '2024-08-06', Request_id: 6 },
            { Num: 7, Address: '서울특별시 관악구 신림동', Price: '6억', State: '작성 완료', Date: '2024-08-07', Request_id: 7 },
            { Num: 8, Address: '서울특별시 마포구 서교동', Price: '11억', State: '매칭 실패', Date: '2024-08-08', Request_id: 8 },
            { Num: 9, Address: '서울특별시 성북구 정릉동', Price: '5억', State: '요청 중', Date: '2024-08-09', Request_id: 9 },
            { Num: 10, Address: '서울특별시 은평구 불광동', Price: '4억', State: '매칭 완료', Date: '2024-08-10', Request_id: 10 },
            { Num: 11, Address: '서울특별시 동작구 흑석동', Price: '13억', State: '작성 완료', Date: '2024-08-11', Request_id: 11 },
            { Num: 12, Address: '서울특별시 강동구 천호동', Price: '14억', State: '매칭 실패', Date: '2024-08-12', Request_id: 12 },
        ];

        // API에서 데이터 가져오기
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/member/footwork'); // 실제 API 엔드포인트로 대체
                const requestData = response.data.map((item, index) => ({
                    Num: index + 1,
                    Address: item.address,
                    Price: item.price,
                    State: item.state || 'N/A', // null 값을 'N/A'로 변환
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
                        <ListBlock4 
                            Num={item.Num} 
                            Address={item.Address} 
                            Price={item.Price} 
                            Date={item.Date} 
                            Request_id={item.Request_id} 
                            State={item.State} 
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

export default ListPage4;
