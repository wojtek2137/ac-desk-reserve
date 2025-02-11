import { useState } from 'react';
import { useSession } from 'next-auth/react';
import TopBar from '@/components/Topbar';
import Desk from '@/components/Desk';
import { trpc } from '@/utils/trpc';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { data: session } = useSession();
  const {data: desks } = trpc.getDesks.useQuery();  
  const userId = session?.user?.email || '';
  const userName = session?.user?.name || '';

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayNumber = date.getDate(); 
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `You're about to reserve the desk for ${dayOfWeek}, ${dayNumber} ${month} ${year}`;
  };

  return (
    <>
      <TopBar />
      <div className="p-4">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Select Day</h1>
          <div className="flex flex-col items-end  max-w-md">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 border rounded text-black "
            />
          </div>
        </div>
        <span className="mt-2 text-xl text-gray-700 font-semibold text-right w-full">
              {formatDateString(selectedDate)}
        </span>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {desks?.map((deskId) => (
            <Desk
              key={deskId}
              deskId={deskId}
              selectedDate={selectedDate}
              userId={userId}
              userName={userName}
            />
          ))}
        </div>
      </div>
    </>
  );
}