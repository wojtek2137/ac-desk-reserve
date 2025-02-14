import React from 'react';

const RoomWindows: React.FC = () => {
    return (
        <>
            <div className="absolute right-10 top-0 bg-blue-300 w-5 h-64 rounded-sm text-white text-xs flex justify-center items-center">
                <span className="rotate-90 text-nowrap text-black">room window</span>
            </div>
            <div className="absolute right-10 top-[35%] bg-blue-300 w-5 h-64 rounded-sm text-white text-xs flex justify-center items-center">
                <span className="rotate-90 text-nowrap text-black">room window</span>
            </div>
            <div className="absolute right-10 top-[70%] bg-blue-300 w-5 h-64 rounded-sm text-white text-xs flex justify-center items-center">
                <span className="rotate-90 text-nowrap text-black">room window</span>
            </div>
        </>
    );
};

export default RoomWindows;