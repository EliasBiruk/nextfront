interface TimetableItemProps {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: string;
}

export default function TimetableItem({
  time,
  subject,
  teacher,
  room,
  status,
  icon
}: TimetableItemProps) {
  return (
    <div 
      className={`flex items-center gap-4 p-4 border rounded-lg ${
        status === 'current' 
          ? 'border-blue-500 bg-blue-50' 
          : status === 'completed'
          ? 'border-gray-200 bg-gray-50'
          : 'border-gray-200'
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="font-semibold text-gray-900">{subject}</div>
        <div className="text-sm text-gray-600">{teacher} • {room}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-gray-900">{time}</div>
        <div className={`text-xs ${
          status === 'current' 
            ? 'text-blue-600 font-medium' 
            : status === 'completed'
            ? 'text-gray-500'
            : 'text-gray-500'
        }`}>
          {status === 'current' ? 'In Progress' : 
           status === 'completed' ? 'Completed' : 'Upcoming'}
        </div>
      </div>
    </div>
  );
}