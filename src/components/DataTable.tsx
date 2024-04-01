import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const handleChangeTab = (value: string) => {
    table.getColumn('status')?.setFilterValue(value);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full h-24 pl-6 pr-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger onClick={() => handleChangeTab('')} value="all">
              All invoices
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleChangeTab('pending')}
              value="pending"
            >
              Unpaid invoices
            </TabsTrigger>
            <TabsTrigger onClick={() => handleChangeTab('paid')} value="paid">
              {' '}
              Paid invoices
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleChangeTab('past Due')}
              value="past Due"
            >
              Past Due
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button>
          <Link to="/create-invoice" className="flex ">
            {' '}
            <img
              className="h-4 mr-1"
              src="../../public/AddIcon.png"
              alt="add icon"
            />
            Create New
          </Link>
        </Button>
      </div>
      <div
        className="p-6 bg-slate-100 border"
        style={{
          height: 'calc(100vh - 6rem)',
        }}
      >
        <div
          style={{
            borderRadius: '12px 12px 0 0 ',
            overflow: 'hidden',
          }}
        >
          <Table className="bg-white border">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="p-0 w-[20%] border" key={cell.id}>
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div
          className="flex items-center justify-center gap-2 py-2 bg-white"
          style={{
            borderRadius: '0 0 12px 12px',
            border: '1px solid #e5e7eb',
          }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
