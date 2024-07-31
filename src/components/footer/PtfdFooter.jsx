'use client';

import React from 'react';
import styled from 'styled-components';

const developers = [
  { name: '정지현', github: 'https://github.com/stophyeon' },
  { name: '신민재', github: 'https://github.com/SMJ426' },
  { name: '임지혁', github: 'https://github.com/jihyuk0414' },
  { name: '김민우', github: 'https://github.com/KimMinWoooo' },
  { name: '왕병권', github: 'https://github.com/KingBKwon' },
];

const PtfdFooter = () => {
  return (
    <StyledWrapper>
      <div className="wrapper-imgs-survice">
        <div className="wrapper-imgs">
          <img
            src="/images/png/footer-meta-img.png"
            alt="ptfd"
            className="meta-img"
          />
          <img
            className="main-logo"
            src="/images/png/footer-img.png"
            alt="피티에프디"
          />
        </div>

        <div className="wrapper-survice">
          <p className="service-text">서비스</p>
          <a
            target="_blank"
            href="https://www.notion.so/2024-K-PaaS-107d0c54f6584e0986f06522423c37e1?pvs=4"
          >
            개발 Notion
          </a>
          <span className="separator"> | </span>
          <a target="_blank" href="https://github.com/SMJ426/KPaaS">
            개발 GitHub
          </a>
        </div>
      </div>

      <div className="wrapper-developers">
        <p className="developer-text">개발자들</p>
        {developers.map((dev, index) => (
          <div key={index} className="developer">
            <span>{dev.name}</span>
            <a href={dev.github} target="_blank" rel="noopener noreferrer">
              <img src="/images/png/github.png" alt="깃헙" />
              GitHub
            </a>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

export default PtfdFooter;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 400px;
  margin-top: 50px;

  background-color: #ebebeb;
  height: 200px;

  .wrapper-imgs-survice {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;

    .wrapper-imgs {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .meta-img {
        width: 50px;
        height: 50px;
      }
      .main-logo {
        width: 120px;
        height: 50px;
      }
    }

    .wrapper-survice {
      .service-text {
        font-weight: bold;
        font-size: 17px;
        color: #999999;
        padding-bottom: 8px;
      }

      .separator {
        margin: 0 5px;
        color: #999999;
      }

      a {
        text-decoration: none;
        color: #999999;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .wrapper-developers {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #999999;

    .developer-text {
      font-weight: bold;
      font-size: 17px;
    }
    .developer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 14px;

      a {
        display: flex;
        align-items: center;
        gap: 3px;
        text-decoration: none;
        color: #999999;

        &:hover {
          text-decoration: underline;
        }

        > img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;
