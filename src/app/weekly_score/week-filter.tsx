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
  return (
    <Select value={selectedWeek || ''} onValueChange={onChange}>
      <SelectTrigger className="bg-[#1A3E2A] border-[#B2825E] text-[#B2825E] w-48">
        <SelectValue placeholder="Select Week" />
      </SelectTrigger>
      <SelectContent className="bg-[#1A3E2A] border-[#B2825E]">
        {weeks.map((week) => (
          <SelectItem key={week.week_date} value={week.week_date} className="text-[#B2825E]">
            {week.formatted_date}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
