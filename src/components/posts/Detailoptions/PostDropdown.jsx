'use client';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { IoIosMenu } from 'react-icons/io';
import PutDetailbutton from '@compoents/components/posts/Detailoptions/Edit-button';
import DeletePostButton from '@compoents/components/posts/Detailoptions/Delete-button';

export default function PostDropdown({ postpage, postId, accessToken }){
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          <IoIosMenu />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
        <DropdownItem key="Edit">
          <PutDetailbutton
            postpage={postpage}
            postId={postId}
            accessToken={accessToken}
          />
        </DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          <DeletePostButton
            postpage={postpage}
            postId={postId}
            accessToken={accessToken}
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
