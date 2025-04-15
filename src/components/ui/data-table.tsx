/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  header: string;
  filterItem: string;
}

export function DataTable<TData, TValue>({ columns, data, header, filterItem }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      {filterItem && (
        <div className="flex items-center mb-4">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn(filterItem)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filterItem)?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-[#1A3E2A] border-[#9A9540] text-[#9A9540] placeholder:text-[#9A9540]/50"
          />
        </div>
      )}
      
      <div className="rounded-md border border-[#9A9540] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#1A3E2A]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-[#9A9540] hover:bg-[#243E2A]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-[#9A9540]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-[#9A9540] hover:bg-[#243E2A]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-[#9A9540]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-[#9A9540]"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-[#9A9540] text-[#9A9540] hover:bg-[#243E2A]"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-[#9A9540] text-[#9A9540] hover:bg-[#243E2A]"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
