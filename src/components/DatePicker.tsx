import React from "react";
import { getFormattedDate } from "@/utils/getFormattedDate";

interface DatePickerProps {
  selectedDate: string;
  setSelectedDateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker = ({
  selectedDate,
  setSelectedDateHandler,
}: DatePickerProps) => {
  return (
    <div className="text-black flex flex-col gap-2 items-start mb-10">
      <h1 className="w-full text-2xl font-bold mb-4 border-b-2">
        Select Date
      </h1>
      <div className="flex flex-col items-end max-w-md">
        <input
          type="date"
          value={selectedDate}
          onChange={setSelectedDateHandler}
          min={new Date().toISOString().split("T")[0]}
          className="p-2 border rounded text-black focus:outline-none"
        />
      </div>
      <span className="mt-2 text-md font-semibold p-2 flex flex-col">
        <p className="text-lg mb-2">You`re about to reserve the desk for:</p>
        <p className="text-xl rounded-md text-white p-2 bg-[#004CFF] w-fit">{getFormattedDate(selectedDate)}</p>
      </span>
    </div>
  );
};

export default DatePicker;
