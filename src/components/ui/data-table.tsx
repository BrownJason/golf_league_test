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
            className="max-w-sm bg-[#292929] border-[#B2825E] text-[#EDE6D6] placeholder:text-[#EDE6D6]/50"
          />
        </div>
      )}
      
      <div className="rounded-md border border-[#B2825E] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#305D3C]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-[#B2825E] hover:bg-[#305D3C]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-[#EDE6D6] text-center">
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
                  className="bg-[#305D3C] border-b border-[#B2825E] hover:bg-[#292929]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center text-[#EDE6D6]"
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
            className="border-[#B2825E] text-[#EDE6D6] hover:bg-[#305D3C]"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-[#B2825E] text-[#EDE6D6] hover:bg-[#305D3C]"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
