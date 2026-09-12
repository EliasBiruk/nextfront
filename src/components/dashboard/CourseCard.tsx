import Link from 'next/link';
import ProgressBar from '@/components/shared/ProgressBar';

interface CourseCardProps {
  title: string;
  chapter: string;
  lesson?: string;
  progress: number;
  image: string;
  lastActivity?: string;
  timeLeft?: string;
  href: string;
}

export default function CourseCard({
  title,
  chapter,
  lesson,
  progress,
  image,
  lastActivity,
  timeLeft,
  href
}: CourseCardProps) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
    >
      <div className="text-3xl group-hover:scale-110 transition">{image}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{title}</h3>
        <p className="text-sm text-gray-600">{chapter}</p>
        {lesson && (
          <p className="text-xs text-gray-500 mt-1">{lesson}</p>
        )}
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          {timeLeft && <span>⏱️ {timeLeft} remaining</span>}
          {lastActivity && <span>🕐 {lastActivity}</span>}
        </div>
      </div>
      <div className="text-right min-w-[100px]">
        <div className="text-sm font-medium text-blue-600 mb-1">{progress}%</div>
        <ProgressBar progress={progress} />
        <Link 
          href={href}
          className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
        >
          Continue
        </Link>
      </div>
    </Link>
  );
}