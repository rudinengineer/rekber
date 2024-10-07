"use client"
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
import Layout from '~/layouts/Layout'
import { Axios } from '~/lib/axios'

type Props = {
    params: {
        transactionId: string
    }
}

export default function page({params}: Props) {
  useQuery({
    queryKey: ['update-status-transaction'],
    queryFn: async () => {
        const response = await Axios.get('/transaction/' + params.transactionId)
        const data = await response.data
        
        if ( data?.status ) {
            return data
        } else {
            return null
        }
    }
  })

  return (
    <Layout>
        <div
            className='mt-12'
            >
                <div
                    className="flex flex-col items-center justify-center space-y-6"
                    >
                        <div
                            className="bg-green-500 text-white rounded-full p-3"
                            >
                                <svg
                                    className="size-8"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                        </div>
                        
                    <h1
                        className="text-3xl font-bold text-gray-900 dark:text-gray-50"
                    >
                        Pembayaran Berhasil
                    </h1>
                    <div
                        className="space-y-2 text-center"
                    >
                        <p
                            className="text-gray-500 dark:text-gray-400"
                        >
                            Transaksi telah dibayar! kembali ke halaman detail transaksi untuk melihat status transaksi.
                        </p>
                    </div>

                    <Link
                        href={`/transaction/${params.transactionId}`}
                        // className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    >
                        <Button>
                            Kembali
                        </Button>
                    </Link>
                </div>
        </div>
    </Layout>
  )
}