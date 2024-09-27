import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function KakaoMap({ gym }) {
  console.log('Gym', gym.시설명);
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const infowindowRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4d6d8c3cc12679e673ba2b73431b4555&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
        mapRef.current = map;

        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        infowindowRef.current = infowindow;

        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(gym.시설명, placesSearchCB);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [gym]);

  function handleButtonClick() {
    const gymName = encodeURIComponent(gym.시설명);
    const url = `https://map.kakao.com/?eName=${gymName}`;
    window.open(url, '_blank');
  }

  const displayMarker = (place) => {
    const { kakao } = window;
    if (!kakao || !mapRef.current) return;

    const marker = new kakao.maps.Marker({
      map: mapRef.current,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    kakao.maps.event.addListener(marker, 'click', () => {
      infowindowRef.current.setContent(
        `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
      );
      infowindowRef.current.open(mapRef.current, marker);
    });
  };

  const placesSearchCB = (data, status) => {
    const { kakao } = window;
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      mapRef.current.setBounds(bounds);
    }
  };

  return (
    <StyledWrapper>
      <div id="map" ref={mapContainer} className="map-container"></div>
      <button onClick={handleButtonClick} className="find-route-btn">
        길 찾기
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin: auto;

  .map-container {
    width: 600px;
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .find-route-btn {
    display: block;
    width: 100%;
    margin-top: 15px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    background-color: #3b5bdb;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #364fc7;
    }
  }
`;
