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

    const search = current.toString().replaceAll('/','')
    const query = search ? `?${search}` : "";
    
    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex items-center justify-center p-2 md:p-4">
      <Select
        value={selectedWeek || "all"}
        onValueChange={handleWeekChange}
      >
        <SelectTrigger className="w-full md:w-[180px] bg-[#243E2A] text-[#9A9540] border-[#9A9540] text-sm md:text-base">
          <SelectValue placeholder="Select Week" />
        </SelectTrigger>
        <SelectContent className="bg-[#243E2A] border-[#9A9540] text-sm md:text-base">
          <SelectItem value="all" className="bg-[#243E2A] text-[#9A9540] hover:text-[#243E2A] hover:cursor-pointer">All Weeks</SelectItem>
          {weeks.map((week) => (
            <SelectItem 
              key={week.week_date} 
              value={week.formatted_date}
              className="bg-[#243E2A] text-[#9A9540] hover:text-[#243E2A] hover:cursor-pointer"
            >
              {week.formatted_date}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
