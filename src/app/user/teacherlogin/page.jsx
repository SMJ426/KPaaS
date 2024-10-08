import MainNavigation from '@compoents/components/layout/main-navigation';
import TeacherLoginForm from '@compoents/components/login/TeacherLoginForm';
import { cookies } from 'next/headers';

export default function TeacherLoginPage() {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  return (
    <>
      <MainNavigation accessToken={Authorization?.value} />
      <TeacherLoginForm />
    </>
  );
}
