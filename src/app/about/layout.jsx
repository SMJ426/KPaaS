'use server';
import MainNavigation from '@compoents/components/layout/main-navigation';
import { cookies } from 'next/headers';

export default async function What_Is_PTFD({ children }) {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');

  return (
    <>
      <MainNavigation accessToken={Authorization?.value} />
      {children}
    </>
  );
}
