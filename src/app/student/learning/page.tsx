'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentLearning() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to tools tab instead of bookmarks
    router.replace('/student/learning/in-progress');
  }, [router]);

  return null;
}