import SignupForm from '@compoents/components/signup/SignupForm';
import MainNavigation from '@compoents/components/layout/main-navigation';
import { cookies } from 'next/headers';

export default function SignupPage() {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  return (
    <>
      <MainNavigation accessToken={Authorization?.value} />
      <SignupForm />
    </>
  );
}
