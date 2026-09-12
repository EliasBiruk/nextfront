import Link from 'next/link';

interface RecommendedItemProps {
  type: 'course' | 'lesson' | 'challenge' | 'skill' | 'exam' | 'story';
  title: string;
  reason: string;
  icon: string;
  link: string;
}

export default function RecommendedItem({
  type,
  title,
  reason,
  icon,
  link
}: RecommendedItemProps) {
  return (
    <Link 
      href={link}
      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
    >
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-xs text-gray-600">{reason}</div>
      </div>
      <div className="text-blue-600">→</div>
    </Link>
  );
}