import { redirect } from 'next/navigation';

export default function NotStartedRedirect() {
  redirect('/student/learning');
}