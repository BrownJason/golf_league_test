"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import moment from "moment";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function HandleFilter(props: { week: any[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const data = props.week.map((val) => {
    if (val.week_date == null) {
      return " ";
    } else {
      return moment(val.week_date).add(1, "days").format("MM-DD-YYYY");
    }
  });

  function handleOnChange(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set("week", term);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex justify-start rounded-lg text-[#9A9540] p-4 m-4 bg-[#1A3E2A] md:w-96 border border-[#9A9540] shadow-lg shadow-black">
      <div className="flex text-center items-center w-36">Filter by week of: </div>
      <Select onValueChange={(e) => handleOnChange(e)}>
        <SelectTrigger className="w-[180px] border-[#9A9540] bg-[#1A3E2A] ">
          <SelectValue placeholder={searchParams.get("week")?.toString()} defaultValue={""} className="border-[#9A9540 bg-[#5f5933]" />
        </SelectTrigger>
        <SelectContent className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]">
          {data.map((weeks) => {
            return weeks === " " ? (
              <SelectItem value={weeks} key={weeks} className="h-8">
                {" "}
              </SelectItem>
            ) : (
              <SelectItem value={weeks} key={weeks}>
                {weeks}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
