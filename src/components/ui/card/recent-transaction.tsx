import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Plus } from "lucide-react";
import { Badge } from "~/components/ui/badge"
import { TransactionType } from "~/types/transaction";
import React from 'react'
import { Button } from "../button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "~/lib/axios";

type Props = {}

export default function RecentTransaction({}: Props) {

  const { isLoading, isSuccess, data: transactions } = useQuery({
    queryKey: ['fetch-recent-transactions'],
    queryFn: async () => {
      const response = await Axios.get('/transaction/recent')
      const data = await response.data
      return data?.data
    }
  })

  return (
    <Card
        className="mt-6 xl:col-span-2" x-chunk="dashboard-01-chunk-4"
      >
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
                Transaksi terbaru anda.
            </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/transaction/create">
                <Plus className="h-4 w-4" />
                Buat Transaksi
            </Link>
            </Button>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Detail Transaction</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Status Pembayaran</TableHead>
                    <TableHead>Status Penyerahan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isLoading ? (
                            <TableRow>
                            <TableCell colSpan={5} className='text-center'>Loading...</TableCell>
                            </TableRow>
                        ) : (
                            isSuccess ? (
                            transactions.length ? (
                                transactions.map((value: TransactionType, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Link href={`/transaction/${value.transactionId}`}>
                                                <div
                                                    className="text-limit-1 font-medium"
                                                >
                                                    { value.name }
                                                </div>
                                                <div
                                                    className="text-limit-1 text-sm text-muted-foreground"
                                                >
                                                    { value.emailTo ?? '-' }
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/transaction/${value.transactionId}`}>
                                                {
                                                    new Intl.NumberFormat(
                                                        'ID-id',
                                                        {
                                                            style: 'currency',
                                                            currency: 'IDR',
                                                            maximumSignificantDigits: 3
                                                        }
                                                    ).format(value.amount)
                                                }
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/transaction/${value.transactionId}`}>
                                                <Badge
                                                    className={`text-xs ${['Completed', 'Paid'].includes(value.status) ? 'text-green-400' : (value.status === 'Failed' ? 'text-red-400' : 'text-yellow-400')}`}
                                                    variant="outline"
                                                >
                                                    { value.status }
                                                </Badge>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/transaction/${value.transactionId}`}>
                                                <Badge
                                                    className={`text-xs ${value.isPaid ? 'text-green-400' : 'text-yellow-400'}`}
                                                    variant="outline"
                                                >
                                                    { value.isPaid ? 'dibayar' : 'Proses' }
                                                </Badge>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/transaction/${value.transactionId}`}>
                                                <Badge
                                                    className={`text-xs ${value.isSendTo ? 'text-green-400' : 'text-yellow-400'}`}
                                                    variant="outline"
                                                >
                                                    { value.isSendTo ? 'diserahkan' : 'Proses' }
                                                </Badge>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className='text-center'>Belum ada transaksi terbaru.</TableCell>
                                </TableRow>
                            )
                            ) : (
                            <TableRow>
                                <TableCell colSpan={5} className='text-center'>Something went wrong!</TableCell>
                            </TableRow>
                            )
                        )
                    }
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}