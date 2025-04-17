"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface Week {
  formatted_date: string;
  week_date: string;
}

interface WeekFilterProps {
  weeks: Week[];
  selectedWeek: string | null;
}

export default function WeekFilter({ weeks, selectedWeek }: WeekFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleWeekChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (value === "all") {
      current.delete("week");
    } else {
      current.set("week", value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    
    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex items-center justify-center p-2 md:p-4">
      <Select
        value={selectedWeek || "all"}
        onValueChange={handleWeekChange}
      >
        <SelectTrigger className="w-full md:w-[180px] bg-[#FFFFFF] text-[#333333] border-[#CCCCCC] text-sm md:text-base">
          <SelectValue placeholder="Select Week" />
        </SelectTrigger>
        <SelectContent className="bg-[#FFFFFF] text-[#333333] border-[#CCCCCC] text-sm md:text-base">
          <SelectItem value="all">All Weeks</SelectItem>
          {weeks.map((week) => (
            <SelectItem 
              key={week.week_date} 
              value={week.formatted_date}
              className="text-sm md:text-base"
            >
              {week.formatted_date}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
