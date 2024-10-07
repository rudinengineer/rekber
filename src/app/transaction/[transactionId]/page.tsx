"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {
    Copy,
} from 'lucide-react'
import { Separator } from "~/components/ui/separator"
import { Button } from '~/components/ui/button';
import Layout from '~/layouts/Layout'
import React from 'react'
import { useQuery } from "@tanstack/react-query"
import { Axios } from "~/lib/axios"
import TransactionDetailSkeleton from "~/components/ui/skeleton/transaction-detail";
import TransactionDetailAction from "~/components/ui/puzzle/transaction-detail-action";
import { useToast } from '~/hooks/use-toast'
import copy from 'clipboard-copy';

type Props = {
    params: {
        transactionId: string
    }
}

export default function page({params}: Props) {
  const { toast } = useToast()

  const { isLoading, isSuccess, data: transaction } = useQuery({
    queryKey: ['fetch-transaction-detail'],
    queryFn: async () => {
        const response = await Axios.get('/transaction/' + params.transactionId)
        const data = await response.data

        if ( data?.status ) {
            return data?.data
        } else {
            return null
        }
    }
  })

  const copyClipBoard = async () => {
    try {
        await copy(transaction.transactionId)
        toast({
            description: 'ID transaksi disalin ke clipboard.'
        })
    } catch(e: any) {
        toast({
            description: "Gagal menyalin ID transaksi.",
            variant: 'destructive'
        })
    }
  }

  return (
    <Layout>
        {
            isLoading ? (
                <TransactionDetailSkeleton />
            ) : (
                isSuccess ? (
                    <Card
                        className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                Transaksi {transaction.transactionId}
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy
                                    className="h-3 w-3"
                                    onClick={copyClipBoard}
                                />
                                <span className="sr-only">Salin ID Tranksaksi</span>
                            </Button>
                            </CardTitle>
                            <CardDescription>
                                Date: {
                                    new Date(transaction.createdAt).getDate()
                                }-{
                                    new Date(transaction.createdAt).getMonth()
                                }-{
                                    new Date(transaction.createdAt).getFullYear()
                                }&nbsp;{
                                    new Date(transaction.createdAt).getHours()
                                }:{
                                    new Date(transaction.createdAt).getMinutes()
                                }
                            </CardDescription>
                        </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                            <div className="font-semibold">Detail Transaksi</div>
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                    { transaction.name }
                                    </span>
                                    <span>
                                        {
                                            new Intl.NumberFormat(
                                                'ID-id',
                                                {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    maximumSignificantDigits: 3
                                                }
                                            ).format(transaction.amount)
                                        }
                                    </span>
                                </li>
                                <li>
                                    <span className="text-muted-foreground">
                                        Deskripsi
                                    </span>
                                    <div className='mt-1'>
                                        <p>{ transaction.description }</p>
                                    </div>
                                </li>
                            </ul>
                            <Separator className="my-2" />
                            <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>
                                    {
                                        new Intl.NumberFormat(
                                            'ID-id',
                                            {
                                                style: 'currency',
                                                currency: 'IDR',
                                                maximumSignificantDigits: 3
                                            }
                                        ).format(transaction.amount)
                                    }
                                </span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Biaya Admin</span>
                                <span>
                                    {
                                        new Intl.NumberFormat(
                                            'ID-id',
                                            {
                                                style: 'currency',
                                                currency: 'IDR',
                                                maximumSignificantDigits: 3
                                            }
                                        ).format(transaction.adminAmount)
                                    }
                                </span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                                <span className="text-muted-foreground">Total</span>
                                <span>
                                    {
                                        new Intl.NumberFormat(
                                            'ID-id',
                                            {
                                                style: 'currency',
                                                currency: 'IDR',
                                                maximumSignificantDigits: 3
                                            }
                                        ).format(transaction.totalAmount)
                                    }
                                </span>
                            </li>
                            </ul>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-3">
                            <div className="font-semibold">Informasi Penjual</div>
                            <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Email</dt>
                                <dd>
                                <dd>{
                                    transaction.emailTo ?? (
                                        <Button>Tambah penjual</Button>
                                    )
                                }</dd>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Status Barang</dt>
                                <dd>
                                <dd
                                    className={`${transaction.isSendTo ? 'text-green-400' : 'text-yellow-400'}`}
                                >
                                    {
                                        transaction.isSendTo ? "Sudah diserahkan" : "Belum diserahkan"
                                    }
                                </dd>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Status Transaksi</dt>
                                <dd>
                                <dd>{ transaction.statusTo }</dd>
                                </dd>
                            </div>
                            </dl>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-3">
                            <div className="font-semibold">Informasi Pembeli</div>
                            <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Email</dt>
                                <dd>
                                <dd>{
                                    transaction.email ?? (
                                        <Button>Tambah pembeli</Button>
                                    )
                                }</dd>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Status Pembayaran</dt>
                                <dd>
                                <dd
                                    className={`${transaction.isPaid ? 'text-green-400' : 'text-yellow-400'}`}
                                >
                                    {
                                        transaction.isPaid ? "Sudah dibayar" : "Belum dibayar"
                                    }
                                </dd>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Status Transaksi</dt>
                                <dd>
                                <dd>{ transaction.status }</dd>
                                </dd>
                            </div>
                            </dl>
                        </div>
                        <div className="mt-8">
                            <TransactionDetailAction
                                transaction={transaction}
                            />
                        </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div></div>
                )
            )
        }
    </Layout>
  )
}