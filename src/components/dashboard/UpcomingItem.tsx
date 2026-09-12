import Link from 'next/link';

interface UpcomingItemProps {
  type: 'quiz' | 'exercise' | 'exam' | 'assignment';
  title: string;
  course?: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
  icon: string;
  href: string;
}

const typeLabels = {
  quiz: 'quizzes',
  exercise: 'exercises',
  exam: 'exams',
  assignment: 'assignments',
};

export default function UpcomingItem({
  type,
  title,
  course,
  deadline,
  status,
  icon,
  href
}: UpcomingItemProps) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
    >
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{title}</div>
        {course && (
          <div className="text-xs text-gray-600">{course}</div>
        )}
      </div>
      <div className="text-right">
        <div className="text-xs text-gray-500">{deadline}</div>
        <div className={`text-xs ${
          status === 'in_progress' ? 'text-blue-600' : 
          status === 'completed' ? 'text-green-600' : 'text-orange-600'
        }`}>
          {status === 'in_progress' ? 'In Progress' : 
           status === 'completed' ? 'Completed' : 'Due Soon'}
        </div>
      </div>
    </Link>
  );
}