import React, { useState, useEffect } from 'react';
import KakaoMap from '../announcementMap/KakaoMap';
import styled from 'styled-components';

export default function DetailGymPage({ location, onClose }) {
  const [gymswithLocation, setGymswithLocation] = useState(null);
  const [openMapForGym, setOpenMapForGym] = useState(null);

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
        console.log(data);
        setGymswithLocation(data);
      } catch (error) {
        console.error('상세부 가져오기 실패', error);
      }
    };

    if (location) {
      fetchGymswithLocation();
    }
  }, [location]);

  const handleMapToggle = (gymId) => {
    setOpenMapForGym(openMapForGym === gymId ? null : gymId);
  };

  return (
    <StyledWrapper>
      <h2>{location} 지역의 센터 목록</h2>
      {gymswithLocation ? (
        <div className="table-container">
          <table>
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
              {gymswithLocation.data.map((gym) => (
                <React.Fragment key={gym.번호}>
                  <tr>
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
                        웹사이트
                      </a>
                    </td>
                    <td>
                      <button className="map-button" onClick={() => handleMapToggle(gym.번호)}>
                        {openMapForGym === gym.번호 ? '지도 닫기' : '지도 보기'}
                      </button>
                    </td>
                  </tr>
                  {openMapForGym === gym.번호 && (
                    <tr>
                      <td colSpan="6" className="map-cell">
                        <KakaoMap gym={gym} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="loading">로딩 중입니다.. 잠시만 기다려주세요!</p>
      )}
      <button className="close-button" onClick={onClose}>돌아가기</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  max-height: 80vh;
  overflow-y: auto;

  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: #495057;
  }

  tr:hover {
    background-color: #f1f3f5;
  }

  .map-button {
    padding: 8px 12px;
    background-color: #3b5bdb;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #364fc7;
    }
  }

  .map-cell {
    padding: 20px 0;
  }

  .loading {
    text-align: center;
    color: #666;
    font-style: italic;
  }

  .close-button {
    display: block;
    width: 100%;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    background-color: #f8f9fa;
    color: #495057;
    border: 1px solid #ced4da;
    border-radius: 5px;
    transition: all 0.3s ease;
    margin-top: 20px;

    &:hover {
      background-color: #e9ecef;
      color: #212529;
    }
  }

  a {
    color: #3b5bdb;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;