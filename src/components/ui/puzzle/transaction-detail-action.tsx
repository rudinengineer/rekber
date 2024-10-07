import { Transaction } from '@prisma/client'
import React from 'react'
import { Button } from '../button'
import Link from 'next/link'
import Spinner from '~/components/loading/Spinner'
import { useRouter } from 'next/navigation'
import { useToast } from '~/hooks/use-toast'
import { Axios } from '~/lib/axios'
import { useSession } from 'next-auth/react'
import { Skeleton } from '../skeleton'

type Props = {
    transaction: Transaction,
}

export default function TransactionDetailAction({transaction}: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const { status, data: session } = useSession()
  const [loadingPay, setLoadingPay] = React.useState<boolean>(false)

  const handlePay = async (transactionId: string) => {
    setLoadingPay(true)
    try {
        const response = await Axios.post(`/transaction/${transactionId}/pay`, {
            amount: transaction.amount
        })
        const data = await response.data

        if ( data?.invoiceUrl ) {
            toast({
                description: "Pembayaran berhasil diproses. Tunggu beberapa saat anda akan diarahkan ke halaman pembayaran."
            })
            router.push(data.invoiceUrl)
        } else {
            toast({
                description: "Gagal menyiapkan pembayaran. Silahkan coba lagi!",
                variant: "destructive"
            })
        }
    } catch(e: any) {
        toast({
            description: "Somenthing went wrong. Please try again!",
            variant: "destructive"
        })
    } finally {
        setLoadingPay(false)
    }
  }

  return (
    status === 'loading' ? (
        <div>
            <Skeleton className="w-full h-10" />
            <Skeleton className="mt-2 w-full h-10" />
        </div>
    ) : (
        status === 'authenticated' && (
            <div>
                {
                    (session?.user.email === transaction.email && !transaction.isPaid && transaction.invoiceUrl) && (
                        <Link
                            href={transaction.invoiceUrl}
                        >
                            <Button
                                className='w-full flex-center'
                                disabled={loadingPay}
                            >
                                {
                                    loadingPay ? (
                                        <Spinner />
                                    ) : ('Bayar')
                                }
                            </Button>
                        </Link>
                    )
                }
                {
                    (session?.user?.email === transaction.email && !transaction.isPaid && !transaction.invoiceUrl) && (
                        <Button
                            className='w-full flex-center'
                            onClick={() => {handlePay(transaction.transactionId)}}
                            disabled={loadingPay}
                        >
                            {
                                loadingPay ? (
                                    <Spinner />
                                ) : ('Bayar')
                            }
                        </Button>
                    )
                }
                {
                    (transaction.emailTo === session?.user.email && !transaction.isSendTo && transaction.isPaid) && (
                        <Button className='mt-2 w-full'>
                            Serahkan Barang
                        </Button>
                    )
                }
                {
                    (transaction.isSendTo && transaction.isPaid) && (
                        <Button className='mt-2 w-full'>
                            Selesaikan Pesanan
                        </Button>
                    )
                }
                {
                    (session?.user.email === transaction.email && transaction.isPaid) && (
                        <Button className='mt-2 w-full'>
                            Ajukan Pengembalian
                        </Button>
                    )
                }
                {
                    (session?.user.email === transaction.emailTo && transaction.isSendTo) && (
                        <Button className='mt-2 w-full'>
                            Ajukan Banding
                        </Button>
                    )
                }
                {
                    (session?.user.email === transaction.email && transaction.status === 'Proses' && !transaction.isPaid && !transaction.isSendTo) && (
                        <Button className='mt-2 w-full'>
                            Batalkan Pesanan
                        </Button>
                    )
                }
            </div>
        )
    )
  )
}