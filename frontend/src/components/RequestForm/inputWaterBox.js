import React, { useState, useEffect, useCallback } from 'react';
import './CircleSelector.css';
import './waterBox.css';
import { ReactComponent as Plus } from '../../components/images/plus_gray.svg';

function InputWaterBox({ Icon, title, complete, savedState, onChange, onImageChange }) {
    const [selected, setSelected] = useState(savedState?.selected || null);
    const [hotWaterTime1, setHotWaterTime1] = useState(savedState?.hotWaterTime1 || '');
    const [hotWaterTime2, setHotWaterTime2] = useState(savedState?.hotWaterTime2 || '');
    const [image, setImage] = useState(null); // 업로드된 이미지 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 상태
    const [inputId, setInputId] = useState(''); // 고유한 input id

    useEffect(() => {
        // 고유한 id를 생성하여 상태에 저장
        setInputId(`imageUpload-${Math.random().toString(36).substr(2, 9)}`);
    }, []);

    const handleTimeChange = useCallback((setter, value) => {
        if (!complete) {
            setter(value);
            if (onChange) {
                onChange({
                    selected,
                    hotWaterTime1: setter === setHotWaterTime1 ? value : hotWaterTime1,
                    hotWaterTime2: setter === setHotWaterTime2 ? value : hotWaterTime2,
                });
            }
        }
    }, [complete, selected, hotWaterTime1, hotWaterTime2, onChange]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // 파일 객체 자체를 가져옴
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                setImage(result); // Base64로 이미지를 보여주는 부분은 유지

                if (onImageChange) onImageChange(file); // 파일 객체를 상위 컴포넌트로 전달
            };
            reader.readAsDataURL(file); // Base64로 읽음
        }
    };
    

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='waterBox'>
            <div className='waterTitle'>
                <Icon style={{ paddingRight: '0.3vw' }} />
                {title}
            </div>
            <div className='waterContent'>
                <div className='waterSmallTitle'>
                    수압 정보
                </div>
                <div className="inputImageWater">
                    {image ? (
                        <img
                            src={image}
                            alt="Uploaded"
                            className="wateruploadedImage"
                            onClick={toggleModal} // 클릭하면 모달 창이 열림
                        />
                    ) : (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                id={inputId} // 고유한 id 사용
                                style={{ display: 'none' }}
                            />
                            <label htmlFor={inputId} className="wateruploadLabel">
                                <Plus style={{ marginRight: '5px' }} />
                                <p style={{ color: '#A1A1A1', fontSize: '13px' }}>사진 업로드</p>
                            </label>
                        </>
                    )}
                </div>
                <div className='waterSmallTitle'>
                    온수 정보
                </div>
                <div className='waterTimeBox'>
                    <p style={{ color: "#5F5F5F", paddingRight: '0.2vw' }}>1.</p>
                    <input
                        type='text'
                        className='waterTextInput'
                        placeholder={'00분 00초'}
                        value={hotWaterTime1}
                        onChange={e => handleTimeChange(setHotWaterTime1, e.target.value)}
                        readOnly={complete}
                    />
                </div>
                <div className='waterTimeBox'>
                    <p style={{ color: "#5F5F5F", paddingRight: '0.2vw' }}>2.</p>
                    <input
                        type='text'
                        className='waterTextInput'
                        placeholder={'00분 00초'}
                        value={hotWaterTime2}
                        onChange={e => handleTimeChange(setHotWaterTime2, e.target.value)}
                        readOnly={complete}
                    />
                </div>
            </div>
            {isModalOpen && (
                <div className="watermodal" onClick={toggleModal}>
                    <span className="close">&times;</span>
                    <img className="watermodalContent" src={image} alt="Modal" />
                </div>
            )}
        </div>
    );
}

export default InputWaterBox;