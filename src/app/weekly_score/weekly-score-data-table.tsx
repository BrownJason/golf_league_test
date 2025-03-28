"use client";

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface WeeklyScoreDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function WeeklyScoreDataTable<TData, TValue>({ columns, data }: WeeklyScoreDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col m-4 rounded-lg text-[#9A9540]">
      <div className="flex items-center w-full justify-center text-[#9A9540] ">
        <div className="border border-[#9A9540] bg-[#1A3E2A] p-4 rounded-lg shadow-lg shadow-black">Weekly Scores</div>
      </div>
      <div className="flex items-center py-4 text-[#9A9540] border-[#9A9540] bg-none">
        <div className="text-[#9A9540] border-[#9A9540] bg-[#1A3E2A] rounded-lg" title="Filter by player name">
          <Input placeholder="Filter player name..." value={(table.getColumn("player_name")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("player_name")?.setFilterValue(event.target.value)} className="max-w-sm" />
        </div>
      </div>
      <div className="rounded-xl border text-[#9A9540] border-[#9A9540] bg-[#1A3E2A] shadow-lg shadow-black md:max-h-128 overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={clsx(header.id.includes("player_name") ? "sticky left-0 text-left text-[#9A9540] bg-[#1A3E2A]" : "text-center text-[#9A9540]")}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={clsx(cell.id.includes("player_name") ? "sticky left-0 text-left bg-[#1A3E2A]" : "text-center")}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center text-[#9A9540] space-x-2 py-4">
        <Button variant="default" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="text-[#9A9540] bg-[#1A3E2A]">
          Previous
        </Button>
        <Button variant="default" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="text-[#9A9540] bg-[#1A3E2A]">
          Next
        </Button>
      </div>
    </div>
  );
}
