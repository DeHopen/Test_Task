import React from 'react';

type Props = {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
};

const DateRangeFilter: React.FC<Props> = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
      <div className="flex space-x-2">
        <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded w-full"
        />
        <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-full"
        />
      </div>
  );
};

export default DateRangeFilter;
