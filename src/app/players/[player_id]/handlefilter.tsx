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
    <div className="flex justify-start rounded-lg text-[#f9e6bf] p-4 m-4 bg-[#6c844c] w-84 border border-[#f9e6bf] shadow-lg shadow-black">
      <div className="flex text-center items-center w-36">Filter by week of: </div>
      <Select onValueChange={(e) => handleOnChange(e)}>
        <SelectTrigger className="w-[180px] border-[#f9e6bf] bg-[#6c844c] ">
          <SelectValue placeholder={searchParams.get("week")?.toString()} defaultValue={""} className="border-[#f9e6bf bg-[#5f5933]" />
        </SelectTrigger>
        <SelectContent className="bg-[#6c844c] border-[#f9e6bf] text-[#f9e6bf]">
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
