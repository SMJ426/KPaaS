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
        <div className="gyms-grid">
          {gymsData.data.map((gym) => (
            <div key={gym.번호} className="gym-card">
              <h2>{gym.시설명}</h2>
              <p>{gym.소재지}, {gym.시_도}</p>
              <p>{gym.전화번호}</p>
              <div className="button-group">
                <a href={`http://${gym.홈페이지}`} target="_blank" rel="noopener noreferrer" className="website-button">
                  홈페이지
                </a>
                <button className="map-button" onClick={() => handleGymSelect(gym)}>
                  지도
                </button>
              </div>
            </div>
          ))}
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  .location-select {
    width: 100%;
    max-width: 200px;
    padding: 8px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 50%;
    cursor: pointer;
  }

  .gyms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  .gym-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-3px);
    }

    h2 {
      color: #333;
      font-size: 1rem;
      margin-bottom: 8px;
    }

    p {
      color: #666;
      font-size: 0.8rem;
      margin-bottom: 5px;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .website-button, .map-button {
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    text-decoration: none;
    text-align: center;
    font-size: 0.8rem;
  }

  .website-button {
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
    }
  }

  .map-button {
    background-color: #2ecc71;
    color: white;

    &:hover {
      background-color: #27ae60;
    }
  }
`;