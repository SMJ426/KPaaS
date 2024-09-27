import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosMenu } from 'react-icons/io';
import PutDetailButton from './Edit-button';
import DeletePostButton from './Delete-button';

export default function PostDropdown({ postId, accessToken }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        <IoIosMenu />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          <DropdownItem>
            <PutDetailButton postId={postId} accessToken={accessToken} />
          </DropdownItem>
          <DropdownItem>
            <DeletePostButton postId={postId} accessToken={accessToken} />
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 80px;
`;

const DropdownItem = styled.div`
  margin: 5px 12px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
