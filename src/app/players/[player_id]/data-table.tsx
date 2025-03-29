"use client";

import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

interface PlayerScoreDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PlayerScoreDataTable<TData, TValue>({ columns, data }: PlayerScoreDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col m-4 rounded-lg text-[#9A9540]">
      <div className="rounded-xl border text-[#9A9540] bg-[#1A3E2A] border-[#9A9540] shadow-lg shadow-black lg:max-h-128 overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={clsx(header.id.includes("week_date") ? "sticky left-0 text-left text-[#9A9540] border border-[#9A9540] bg-[#1A3E2A] text-xl" : "text-center text-xl text-[#9A9540] border border-[#9A9540]")}>
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
                    <TableCell key={cell.id} className={clsx(cell.id.includes("week_date") ? "sticky left-0 text-left bg-[#1A3E2A] border border-[#9A9540] text-xl" : "text-center text-xl border border-[#9A9540]")}>
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
