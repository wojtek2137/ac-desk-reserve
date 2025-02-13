import { trpc } from '../utils/trpc';

interface DeskProps {
  deskId: number;
  selectedDate: string;
  userId: string;
  userName: string;
}

const Desk: React.FC<DeskProps> = ({ deskId, selectedDate, userId }) => {
  const { data: reservations, refetch } = trpc.getReservations.useQuery();
  const reserveDesk = trpc.reserveDesk.useMutation({
    onSuccess: () => refetch(),
  });

  const handleReserve = () => {
    const dateFrom = `${selectedDate}T09:00`; 
    const dateTo = `${selectedDate}T17:00`; 
    reserveDesk.mutate({ deskId, dateFrom, dateTo });
  };

  const reservation = reservations?.find(
    (res) => res.deskId === deskId && res.dateFrom.startsWith(selectedDate)
  );

  return (
    <div
      className={`p-6 shadow-xl rounded-lg transform transition-all ${
        reservation
          ? reservation.userId === userId
            ? 'bg-green-100 border-l-4 border-green-500'
            : 'bg-gray-200 border-l-4 border-gray-500'
          : 'bg-white border-l-4 border-blue-500 hover:scale-105'
      }`}
    >
      <h3 className="text-xl font-bold text-gray-700">Desk {deskId}</h3>
      {reservation ? (
        <p className="mt-2 text-md text-gray-600">
          {reservation.userId === userId
            ? 'Reserved by you'
            : `Reserved by ${reservation.userName}`}
        </p>
      ) : (
        <button
          onClick={handleReserve}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Reserve
        </button>
      )}
    </div>
  );
};

export default Desk;
