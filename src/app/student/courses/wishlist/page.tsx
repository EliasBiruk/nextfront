import { redirect } from 'next/navigation';

export default function WishlistRedirect() {
  redirect('/student/learning/saved');
}