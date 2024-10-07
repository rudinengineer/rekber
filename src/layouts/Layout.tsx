"use client"
import React from 'react'
import Link from "next/link"
import {
  Card,
  CardContent,
} from "~/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from '~/components/ui/button'
import { appName } from '~/constants/app'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { Skeleton } from '~/components/ui/skeleton'
import Footer from '~/components/ui/puzzle/footer';

type Props = {
    children: React.ReactNode
}

export default function Layout({children}: Props) {
  const { status, data: session } = useSession()

  return (
    <div className='p-7'>
        <Card className="hidden-scrollbar py-6 w-[400px] max-h-[95vh] ss:max-h-[85vh] overflow-y-auto">
            <CardContent className='w-full'>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='text-xl font-semibold'>{ appName }</h1>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            {
                                status === 'loading' ? (
                                    <Skeleton className='size-5 rounded-full' />
                                ) : (
                                    status === 'authenticated' && (
                                        <Image
                                            src={String(session?.user.image)}
                                            alt={String(session?.user.name)}
                                            width={100}
                                            height={100}
                                            className='size-6 rounded-full'
                                        />
                                    )
                                )
                            }
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {signOut()}}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='w-full mt-3 flex gap-4 items-center'>
                    <Link
                        href="/"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/transaction"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Transaction
                    </Link>
                    <Link
                        href="/history"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        History
                    </Link>
                </div>

                <div className='w-full mt-6'>
                    { children }
                </div>
            </CardContent>
        </Card>
        <Footer />
    </div>
  )
}