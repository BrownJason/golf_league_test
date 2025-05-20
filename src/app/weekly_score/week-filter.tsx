import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Week {
  week_date: string;
  formatted_date: string;
}

interface WeekFilterProps {
  weeks: Week[];
  selectedWeek: string | null;
  onChange: (week: string) => void;
}

export default function WeekFilter({ weeks, selectedWeek, onChange }: WeekFilterProps) {
    console.log(weeks)
    if (!weeks || weeks.length === 0) {
        return <div className="text-[#B2825E]">No weeks available</div>;
    }
    const maxDate = weeks.reduce((max, week) => {
        const weekDate = new Date(week.week_date);
        return weekDate > max ? weekDate : max;
    }, new Date(0));
    const formattedMaxDate = maxDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
  return (
    <Select value={selectedWeek || formattedMaxDate} onValueChange={onChange}>
      <SelectTrigger className="bg-[#1A3E2A] border-[#B2825E] text-[#B2825E] w-48">
        <SelectValue placeholder="Select Week">
            {selectedWeek ? weeks.find(week => week.week_date === selectedWeek)?.formatted_date : formattedMaxDate}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-[#1A3E2A] border-[#B2825E]">
        {weeks.map((week) => (
          <SelectItem 
          key={week.week_date} 
          value={week.week_date} 
          defaultValue={formattedMaxDate}
          className="text-[#B2825E]">
            {week.formatted_date}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
