import { redirect } from 'next/navigation';

export default function PlayerRedirect() {
  redirect('/student/courses');
}