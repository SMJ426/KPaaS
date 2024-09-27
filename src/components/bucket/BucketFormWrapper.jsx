'use client';

import { useState, useEffect } from 'react';
import LoadingIndicator from '../UI/LoadingIndicator';
import BucketForm from './BucketForm';

export default function BucketFormWrapper({
  initialLikes,
  nick_name,
  accessToken,
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingIndicator />; // 또는 로딩 인디케이터
  }

  return (
    <BucketForm
      initialLikes={initialLikes}
      nick_name={nick_name}
      accessToken={accessToken}
    />
  );
}
