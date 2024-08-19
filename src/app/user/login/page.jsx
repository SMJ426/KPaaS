import MainNavigation from '@compoents/components/layout/main-navigation';
import LoginForm from '@compoents/components/login/LoginForm';
import { cookies } from 'next/headers';

export default function LoginPage() {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  return (
    <>
      <MainNavigation accessToken={Authorization?.value} />
      <LoginForm />
    </>
  );
}
