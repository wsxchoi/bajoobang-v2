import React, { useState, useEffect } from 'react';
import './ListPage1.css';
import ListBlock from './ListBlock1';
import Modal from './Modal';
import axios from 'axios';

function ListPage1() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const [listData, setListData] = useState([]);
    const itemsPerPage = 6; // 한 페이지당 6개의 박스를 표시하도록 설정

    useEffect(() => {
        // 더미 데이터 정의
        const dummyData = [
            { Num: 1, Address: '동대문구 휘경동', Person: '김철수', Star: 4.8 },
            { Num: 2, Address: '중구 광희동1가 145-2', Person: '김철수', Star: 4.8 },
            { Num: 3, Address: '서울특별시 관악구 신림동', Person: '김철수', Star: 4.8 },
            { Num: 4, Address: '서울특별시 서초구 서초동', Person: '김철수', Star: 4.8 },
            { Num: 5, Address: '서울특별시 서초구 서초동', Person: '김철수', Star: 4.8 },
            { Num: 6, Address: '서울특별시 서초구 서초동', Person: '김철수', Star: 4.8 },
            { Num: 7, Address: '서울특별시 서초구 서초동', Person: '김철수', Star: 4.8 },
            { Num: 8, Address: '서울특별시 서초구 서초동', Person: '김철수', Star: 4.8 },
            { Num: 9, Address: '서울특별시 서초구 서초동', Person: '김철수', Star: 4.8 },
            { Num: 10, Address: '서울특별시 서초구 서초동', Person: '김철수', Star: 4.8 },
            { Num: 11, Address: '서울특별시 서초구 서초동', Person: '김철수', Star: 4.8 },
            { Num: 12, Address: '서울특별시 서초구 서초동', Person: '김철수', Star: 4.8 },
        ];

        // API에서 데이터 가져오기
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/member/inquiry'); // 실제 API 엔드포인트로 대체
                const requestData = response.data.map((item, index) => ({
                    Num: index + 1,
                    Address: item.address,
                    Person: item.name,
                    Star: item.star,
                    Message: item.message,
                    Worker_id: item.worker_id,
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

    const handleBlockClick = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    // currentPage가 변경될 때 currentItems 업데이트
    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems(listData.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage, listData]);

    // 페이지 변경
    const paginate = (pageNumber, event) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div className='ListBackground'>
            <div className='ListGrid'> {/* 그리드 레이아웃으로 변경 */}
                {currentItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListBlock 
                            Num={item.Num} 
                            Address={item.Address} 
                            Person={item.Person} 
                            Star={item.Star} 
                            onClick={() => handleBlockClick(item)}
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
            <Modal 
                isOpen={isModalOpen}
                onClose={closeModal}
                data={modalData}
                Worker_id={modalData?.Worker_id} 
                Request_id={modalData?.Request_id}
            />
        </div>
    )
}

export default ListPage1;
