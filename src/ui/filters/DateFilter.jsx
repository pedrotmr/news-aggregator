import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFilters } from '../../context/FilterContext';

const DateFilter = () => {
  const { selectedStartDate, handleSelectStartDate, selectedEndDate, handleSelectEndDate } = useFilters();

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <DatePicker
        selected={selectedStartDate}
        onChange={handleSelectStartDate}
        className="w-full rounded border px-4 py-2"
        placeholderText="Start Date"
        maxDate={selectedEndDate || new Date()}
      />
      <DatePicker
        selected={selectedEndDate}
        onChange={handleSelectEndDate}
        className="w-full rounded border px-4 py-2"
        placeholderText="End Date"
        minDate={selectedStartDate}
        maxDate={new Date()}
      />
    </div>
  );
};

export default DateFilter;
