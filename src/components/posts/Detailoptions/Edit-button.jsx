'use client';

import { useRouter } from 'next/navigation';

export default function PutDetailbutton({ postId, postpage }) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/${postpage}/${postId}/edit`);
  };
  return (
    <>
      <button className="btn" onClick={handleButtonClick}>
        수정
      </button>
    </>
  );
}

// .btn{
//   width: 65px;
//   height: 25px;
//   border: 0;
//   border-radius: 10px;
//   margin-left: 5px;
//   background: #a2dee7ad;
// }