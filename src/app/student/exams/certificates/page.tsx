import { redirect } from 'next/navigation';

export default function ExamsCertificatesRedirect() {
  redirect('/student/certificates');
}