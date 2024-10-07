"use client"
import { Activity, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton"
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { Axios } from "~/lib/axios";

type Props = {}

export default function ItemsCard({}: Props) {

  const {
    isLoading: loadSaldo,
    isSuccess: succSaldo,
    data: saldo
  } = useQuery({
    queryKey: ['fetch-saldo'],
    queryFn: async () => {
        const response = await Axios.get('/user/saldo')
        const data = await response.data

        if ( data?.status ) {
            return data?.saldo
        } else {
            return null
        }
    }
  })

  const {
    isLoading: loadTotalTransaction,
    isSuccess: succTotalTransaction,
    data: totalTransaction
  } = useQuery({
    queryKey: ['fetch-total-transaction'],
    queryFn: async () => {
        const response = await Axios.get('/transaction/total')
        const data = await response.data

        if ( data?.status ) {
            return data?.total
        } else {
            return null
        }
    }
  })

  return (
    <div className="grid grid-cols-2 gap-8">
        <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Saldo
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {
                    loadSaldo ? (
                        <Skeleton className="w-full h-10" />
                    ) : (
                        succSaldo ? (
                            <div
                                className="text-2xl font-bold"
                            >
                                {
                                    new Intl.NumberFormat(
                                        'ID-id',
                                        {
                                            style: 'currency',
                                            currency: 'IDR',
                                            maximumSignificantDigits: 3
                                        }
                                    ).format(saldo)
                                }
                            </div>
                        ) : (
                            <div>
                                Error
                            </div>
                        )
                    )
                }
            </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Transaksi
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {
                    loadTotalTransaction ? (
                        <Skeleton className="w-full h-10" />
                    ) : (
                        succTotalTransaction ? (
                            <div
                                className="text-2xl font-bold"
                            >
                                +{ totalTransaction }
                            </div>
                        ) : (
                            <div>
                                Error
                            </div>
                        )
                    )
                }
            </CardContent>
        </Card>
    </div>
  )
}