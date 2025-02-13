interface Reservation {
        deskId: number;
        userName: string;
        userId: string;
        id: number;
        dateFrom: string;
        dateTo: string;
}

interface NewDeskProps {
  deskId: number;
  userId: string;
  userName: string;
  onClickReserve: () => void;
  onClickUnreserve: () => void;
  reservation?: Reservation;
}

const NewDesk: React.FC<NewDeskProps> = ({ deskId, onClickReserve, onClickUnreserve, reservation, userName, userId }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-between relative">
      <div className="absolute right-10 top-0 bg-blue-500 w-5 h-64 rounded-sm text-white text-xs flex justify-center items-center">
        <span className="rotate-90">window</span>
      </div>
      <div className="absolute right-10 top-[30%] bg-blue-500 w-5 h-64 rounded-sm text-white text-xs flex justify-center items-center">
        <span className="rotate-90">window</span>
      </div>
      <div className="absolute right-10 top-[60%] bg-blue-500 w-5 h-64 rounded-sm text-white text-xs flex justify-center items-center">
        <span className="rotate-90">window</span>
      </div>

      <div className="flex flex-col gap-16 w-full items-end mr-36">
        <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 20 }).map((_, index) => {
            const deskNumber = index + 1;
            let marginBottom = 0;
            if (deskNumber <= 4 || (deskNumber > 8 && deskNumber <= 12)) {
                marginBottom = 100;
            }
            return (
                <div
                key={deskNumber}
                className={`p-6 w-64 hover:scale-105 shadow-xl border-4 border-[#a4a9b0] bg-[#dadee5] rounded-sm transform transition-all 
                 
                
                `}
                style={{
                    marginBottom: `${marginBottom}px`,
                }}
              >
                <h3 className="text-xl font-bold text-gray-700">Desk {deskId}</h3>
                {reservation ? (
                    <>
                        <p className="mt-2 text-md text-gray-600">
                            {reservation.userId === userId
                            ? 'Reserved by you'
                            : `Reserved by ${userName}`}
                        </p>
                        <span className="text-xs text-red-500 " onClick={onClickUnreserve}>x release desk</span>
                  </>
                ) : (
                  <button
                    onClick={onClickReserve}
                    className="mt-4 cursor-pointer px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Reserve
                  </button>
                )}
              </div>
            );
            })}
        </div>
        
</div>

    </div>
  );
};

export default NewDesk;
