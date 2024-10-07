import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {
    CreditCard,
} from 'lucide-react'
import { Separator } from "~/components/ui/separator"
import { Skeleton } from "~/components/ui/skeleton";

type Props = {}

export default function TransactionDetailSkeleton({}: Props) {
  return (
    <Card
        className="w-full overflow-hidden" x-chunk="dashboard-05-chunk-4"
    >
        <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
                <Skeleton className="w-1/2 h-10" />
            </CardTitle>
            <CardDescription>
                <Skeleton className="w-3/4 h-4" />
            </CardDescription>
        </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
            <div className="font-semibold">Detail Transaksi</div>
            <ul className="grid gap-3">
                <li className="flex gap-4 items-center justify-between">
                    <Skeleton className="w-1/2 h-10" />
                    <Skeleton className="w-1/2 h-10" />
                </li>
                <li>
                    <span className="text-muted-foreground">
                        Deskripsi
                    </span>
                    <div className='mt-1'>
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="mt-2 w-1/2 h-4" />
                    </div>
                </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
            <li className="flex gap-4 items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <Skeleton className="w-3/4 h-6" />
            </li>
            <li className="flex gap-4 items-center justify-between">
                <span className="text-muted-foreground">Biaya Admin</span>
                <Skeleton className="w-3/4 h-6" />
            </li>
            <li className="flex gap-4 items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <Skeleton className="w-3/4 h-6" />
            </li>
            </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
            <div className="font-semibold">Informasi Penjual</div>
            <dl className="grid gap-3">
            <div className="flex gap-4 items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <Skeleton className="w-3/4 h-6" />
            </div>
            <div className="flex gap-4 items-center justify-between">
                <dt className="text-muted-foreground">Status Barang</dt>
                <Skeleton className="w-3/4 h-6" />
            </div>
            <div className="flex gap-4 items-center justify-between">
                <dt className="text-muted-foreground">Status Transaksi</dt>
                <Skeleton className="w-3/4 h-6" />
            </div>
            </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
            <div className="font-semibold">Informasi Pembeli</div>
            <dl className="grid gap-3">
            <div className="flex gap-4 items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <Skeleton className="w-3/4 h-6" />
            </div>
            <div className="flex gap-4 items-center justify-between">
                <dt className="text-muted-foreground">Status Pembayaran</dt>
                <Skeleton className="w-3/4 h-6" />
            </div>
            <div className="flex gap-4 items-center justify-between">
                <dt className="text-muted-foreground">Status Transaksi</dt>
                <Skeleton className="w-3/4 h-6" />
            </div>
            </dl>
        </div>
        <div className="mt-8">
            <Skeleton className="w-full h-10" />
            <Skeleton className="mt-2 w-full h-10" />
        </div>
        </CardContent>
    </Card>
  )
}