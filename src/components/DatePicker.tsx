import React from "react";

interface DatePickerProps {
  selectedDate: string;
  setSelectedDateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formattedDate: (selectedDate: string) => string;
}

const DatePicker = ({
  selectedDate,
  setSelectedDateHandler,
  formattedDate,
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
      <span className="mt-2 text-md text-white font-semibold bg-[#004CFF] p-2 rounded-md inline-block text-wrap">
        {formattedDate(selectedDate)}
      </span>
    </div>
  );
};

export default DatePicker;
