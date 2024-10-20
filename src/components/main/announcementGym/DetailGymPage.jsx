import React, { useState, useEffect } from 'react';
import KakaoMap from '../announcementMap/KakaoMap';
import styled from 'styled-components';
import Modal from '../announcementMap/Modal';

export default function DetailGymPage({ location, onClose }) {
  const [gymswithLocation, setGymswithLocation] = useState(null);
  const [selectedGym, setSelectedGym] = useState(null);

  useEffect(() => {
    const fetchGymswithLocation = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/post/gyms/all`;
        if (location !== '전체') {
          url += `?location=${encodeURIComponent(location)}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGymswithLocation(data);
      } catch (error) {
        //
      }
    };

    if (location) {
      fetchGymswithLocation();
    }
  }, [location]);

  const handleMapView = (gym) => {
    setSelectedGym(gym);
  };

  return (
    <StyledWrapper>
      <h2>{location} 지역의 센터 목록</h2>
      {gymswithLocation ? (
        <div className="gym-grid">
          {gymswithLocation.data.map((gym) => (
            <div key={gym.번호} className="gym-card">
              <h3>{gym.시설명}</h3>
              <p>
                {gym.소재지}, {gym.시_도}
              </p>
              <p>{gym.전화번호}</p>
              <div className="button-group">
                <a
                  href={`http://${gym.홈페이지}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-button"
                >
                  웹사이트
                </a>
                <button
                  className="map-button"
                  onClick={() => handleMapView(gym)}
                >
                  지도 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading">로딩 중입니다.. 잠시만 기다려주세요!</p>
      )}
      {selectedGym && (
        <Modal onClose={() => setSelectedGym(null)}>
          <div className="map-modal">
            <h3>{selectedGym.시설명}</h3>
            <KakaoMap gym={selectedGym} />
          </div>
        </Modal>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  font-family: 'Pretendard', sans-serif;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }

  .gym-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }

  .gym-card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-3px);
    }

    h3 {
      font-size: 16px;
      color: #333;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .website-button,
  .map-button {
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 12px;
    text-decoration: none;
    text-align: center;
  }

  .website-button {
    background-color: #3b5bdb;
    color: white;

    &:hover {
      background-color: #364fc7;
    }
  }

  .map-button {
    background-color: #2ecc71;
    color: white;

    &:hover {
      background-color: #27ae60;
    }
  }

  .loading {
    text-align: center;
    color: #666;
    font-style: italic;
  }

  .map-modal {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      margin-bottom: 15px;
      font-size: 20px;
      color: #333;
    }
  }
`;
