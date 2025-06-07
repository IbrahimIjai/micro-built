"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download } from "lucide-react";
import type { RepaymentHistory } from "./dummy-data";

interface RepaymentHistoryProps {
  history: RepaymentHistory[];
  customerName: string;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Success":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Success
        </Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      );
    case "Failed":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const columns: ColumnDef<RepaymentHistory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "loanId",
    header: "Loan ID",
    cell: ({ row }) => (
      <div className="font-medium text-green-700">{row.getValue("loanId")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-gray-600">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("amountPaid")}</div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => (
      <div className="text-gray-600">{row.getValue("paymentMethod")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
  },
];

export function RepaymentHistoryTable({
  history,
  customerName,
}: RepaymentHistoryProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: history,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportToPDF = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const dataToExport =
      selectedRows.length > 0
        ? selectedRows.map((row) => row.original)
        : history;

    // Create PDF content
    const pdfContent = `
      REPAYMENT HISTORY REPORT
      Customer: ${customerName}
      Generated: ${new Date().toLocaleDateString()}
      Records: ${dataToExport.length} ${
      selectedRows.length > 0 ? "(Selected)" : "(All)"
    }
      
      ${dataToExport
        .map(
          (item, index) => `
      ${index + 1}. Loan ID: ${item.loanId}
         Date: ${item.date}
         Amount: ${item.amountPaid}
         Method: ${item.paymentMethod}
         Status: ${item.status}
      `
        )
        .join("\n")}
    `;

    // Create and download the file
    const blob = new Blob([pdfContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${customerName.replace(/\s+/g, "_")}_repayment_history.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Repayment History
          </CardTitle>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={
                (table.getColumn("loanId")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("loanId")?.setFilterValue(event.target.value)
              }
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button
            onClick={exportToPDF}
            className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="font-medium text-gray-600"
                      >
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
                    className="border-b hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
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
                    className="h-24 text-center text-gray-500"
                  >
                    No repayment history found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination and Selection Info */}
        <div className="flex items-center justify-between space-x-2 py-4 px-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`${
                !table.getCanPreviousPage()
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Prev
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {table.getPageOptions().map((page, index) => {
                const pageNumber = page + 1;
                const isCurrentPage =
                  table.getState().pagination.pageIndex === page;

                return (
                  <Button
                    key={page}
                    variant={isCurrentPage ? "default" : "ghost"}
                    size="sm"
                    onClick={() => table.setPageIndex(page)}
                    className={
                      isCurrentPage
                        ? "bg-gray-900 text-white hover:bg-gray-800 min-w-[32px]"
                        : "text-gray-600 hover:bg-gray-100 min-w-[32px]"
                    }
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            {/* Next Button */}
            <Button
              variant={table.getCanNextPage() ? "default" : "ghost"}
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={
                table.getCanNextPage()
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "text-gray-400 cursor-not-allowed"
              }
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
