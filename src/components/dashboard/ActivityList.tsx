import Link from 'next/link';

interface ActivityItem {
  action: string;
  detail: string;
  time: string;
  icon: string;
  link?: string;
}

interface ActivityListProps {
  activities: ActivityItem[];
  title?: string;
  viewAllLink?: string;
}

export default function ActivityList({ activities, title, viewAllLink }: ActivityListProps) {
  return (
    <>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">{title}</h3>
          {viewAllLink && (
            <Link href={viewAllLink} className="text-blue-600 hover:underline text-sm font-medium">
              View all →
            </Link>
          )}
        </div>
      )}
      <div className="space-y-3">
        {activities.map((activity) => (
          activity.link ? (
            <Link 
              key={activity.action}
              href={activity.link}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="text-xl">{activity.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-sm">{activity.action}</div>
                <div className="text-xs text-gray-600">{activity.detail}</div>
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </Link>
          ) : (
            <div key={activity.action} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-xl">{activity.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-sm">{activity.action}</div>
                <div className="text-xs text-gray-600">{activity.detail}</div>
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          )
        ))}
      </div>
    </>
  );
}