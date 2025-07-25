import React from "react";
import { getFormattedDate, getShortFormattedDate } from "@/utils/date";
import { CalendarIcon } from '@/Icons/CalendarIcon';
import { PrevIcon } from "@/Icons/PrevIcon";
import { NextIcon } from "@/Icons/NextIcon";

interface DatePickerProps {
  selectedDate: string;
  setSelectedDateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  incrementalDateChangeHandler: (step: number) => void;
}

const DatePicker = ({
  selectedDate,
  setSelectedDateHandler,
  incrementalDateChangeHandler
}: DatePickerProps) => {
  const minDate = getShortFormattedDate(new Date())

  return (
    <div className="text-black flex flex-col gap-2 items-start mb-10">
      <h1 className="w-full text-2xl font-bold mb-4 border-b-2">
        Select Date
      </h1>
      <div className="flex items-center max-w-md">
        <div className="flex-col">
          <button
            className="button p-2 mr-1 border rounded bg-[#004CFF] active:bg-[#001961] disabled:bg-[#EEF0F2] disabled:text-[#7D8799] text-white"
            onClick={() => incrementalDateChangeHandler(-1)}
            disabled={minDate === selectedDate}
          >
            <PrevIcon/>
          </button>
        </div>
        <div className="flex-col">
          <input
            type="date"
            value={selectedDate}
            onChange={setSelectedDateHandler}
            min={minDate}
            className="p-2 border rounded text-black focus:outline-none"
          />
        </div>
        <div className="flex-col">
          <button className="button p-2 ml-1 border rounded bg-[#004CFF] active:bg-[#001961] text-white" onClick={() => incrementalDateChangeHandler(1)}>
            <NextIcon/>
          </button>
        </div>
      </div>
      <span className="mt-2 text-md font-semibold p-2 flex flex-col">
        <p className="text-xl mb-2">You`re about to reserve the desk for:</p>
        <div className='flex flex-row items-center'>
          <CalendarIcon  width={24} height={24} /> <span className='ml-2 text-[#004CFF] text-2xl pt-[4px]'>{getFormattedDate(selectedDate)}</span>
        </div>
      </span>
    </div>
  );
};

export default DatePicker;
