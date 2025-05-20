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
    if (!weeks || weeks.length === 0) {
        return <div className="text-[#B2825E]">No weeks available</div>;
    }
    // Find the week with the latest date
    const latestWeek = weeks.reduce((latest, week) => {
        return new Date(week.week_date) > new Date(latest.week_date) ? week : latest;
    }, weeks[0]);
    let week_date = "";
    if (latestWeek && latestWeek.week_date) {
        const [year, month, day] = latestWeek.week_date.split("-");
        week_date = `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
    }
  return (
    <Select value={selectedWeek || week_date} onValueChange={onChange}>
      <SelectTrigger className="bg-[#1A3E2A] border-[#B2825E] text-[#B2825E] w-48">
        <SelectValue placeholder="Select Week">
            {selectedWeek ? weeks.find(week => week.week_date === selectedWeek)?.formatted_date : week_date}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-[#1A3E2A] border-[#B2825E]">
        {weeks.map((week) => (
          <SelectItem 
          key={week.week_date} 
          value={week.week_date} 
          className="text-[#B2825E]">
            {week.formatted_date}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
