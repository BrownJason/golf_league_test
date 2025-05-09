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
            className="max-w-sm bg-[var(--card)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text)]/50"
          />
        </div>
      )}
      
      <div className="rounded-md border border-[var(--border)] overflow-hidden">
        <Table>
          <TableHeader className="bg-[var(--card-foreground)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-[var(--border)] hover:bg-[var(--card-foreground)]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-[var(--text)] text-center">
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
                  className="bg-[var(--card-foreground)] border-b border-[var(--border)] hover:bg-[var(--foreground)]"
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
                  className="h-24 text-center text-[var(--text)]"
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
            className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--card-foreground)]"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--card-foreground)]"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
