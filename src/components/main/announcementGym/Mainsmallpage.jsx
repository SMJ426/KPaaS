import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DetailGymPage from './DetailGymPage.jsx';
import { LocationList } from '../constant/LocationList.js';
import Modal from '../announcementMap/Modal.jsx';
import OneGymMapForm from '../announcementMap/OneGymMapForm.jsx';

export default function Mainsmallpage() {
  const [gymsData, setGymsData] = useState(null);
  const [location, setLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState();
  const [openOneMap, setOpenOneMap] = useState(false);

  useEffect(() => {
    const fetchGymsData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/post/gyms/main`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setGymsData(data);
      } catch (error) {
        console.error('받던 도중 에러 발생 부분!', error);
      }
    };

    fetchGymsData();
  }, []);

  const handleGymSelect = (gym) => {
    setOpenOneMap(true);
    setSelectedGym(gym);
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
    if (selectedLocation) {
      openModal();
    } else {
      setIsModalOpen(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledWrapper>
      <select className="location-select" value={location} onChange={handleLocationChange}>
        <option value="">카테고리 선택</option>
        {LocationList.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <DetailGymPage location={location} onClose={closeModal} />
        </Modal>
      )}

      {gymsData && (
        <div className="gyms-table-container">
          <table className="gyms-table">
            <thead>
              <tr>
                <th>시설명</th>
                <th>구 단위 지역</th>
                <th>시 단위 지역</th>
                <th>전화번호</th>
                <th>홈페이지</th>
                <th>지도 보기</th>
              </tr>
            </thead>
            <tbody>
              {gymsData.data.map((gym) => (
                <tr key={gym.번호}>
                  <td>{gym.시설명}</td>
                  <td>{gym.소재지}</td>
                  <td>{gym.시_도}</td>
                  <td>{gym.전화번호}</td>
                  <td>
                    <a
                      href={`http://${gym.홈페이지}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {gym.홈페이지}
                    </a>
                  </td>
                  <td>
                    <button className="map-button" onClick={() => handleGymSelect(gym)}>
                      지도 보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openOneMap && (
        <Modal onClose={() => setOpenOneMap(false)}>
          <OneGymMapForm gym={selectedGym} onClose={setOpenOneMap} />
        </Modal>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  font-family: 'Pretendard', sans-serif;

  .select-container {
    position: relative;
    width: 200px; // 선택 상자의 너비 조절
  }

  .location-select {
    width: 20%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    appearance: none; // 기본 화살표 제거
    background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 50%;
    cursor: pointer;
  }

  // 드롭다운 메뉴 스타일링
  .location-select option {
    padding: 10px;
  }

  // 드롭다운 메뉴의 최대 높이 설정
  .location-select::-webkit-scrollbar {
    width: 10px;
  }

  .location-select::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .location-select::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  .location-select::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .gyms-table-container {
    overflow-x: auto;
  }

  .gyms-table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }

    th {
      background-color: #f8f8f8;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #e9e9e9;
    }
  }

  .map-button {
    padding: 8px 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }
  }
`;