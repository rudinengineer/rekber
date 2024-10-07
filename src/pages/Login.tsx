"use client"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React from "react"
import Spinner from "../components/loading/Spinner"
import { appName } from "~/constants/app"
import { useToast } from "~/hooks/use-toast"
import Footer from '~/components/ui/puzzle/footer';

export default function Login() {
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleLoginGoogle = async () => {
    setLoading(true)
    try {
        const response = await signIn("google")

        console.log(response)
        console.log(session)

        if ( response?.ok ) {
            router.refresh()
        } else {
            toast({
                title: "Something went wrong.",
                description: "There was a problem with your request.",
                variant: 'destructive'
            })
        }
    } catch(e: any) {
        toast({
            title: "Something went wrong.",
            description: "There was a problem with your request.",
            variant: 'destructive'
        })
    } finally {
        setLoading(false)
    }
  }

  return (
    <div>
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className='leading-4'>
                    <h1 className='text-base'>Selamat Datang</h1>
                    <h1 className="text-3xl">di { appName }!</h1>
                </CardTitle>
                <CardDescription>
                    Harap login terlebih dahulu untuk menyimpan history transaksi anda.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                <Button
                    variant="outline"
                    className="w-full flex justify-center items-center"
                    onClick={handleLoginGoogle}
                    disabled={loading}
                    >
                        {
                            loading ? (
                                <Spinner />
                            ) : (
                                <div className="w-full flex gap-2 justify-center items-center">
                                    <svg
                                        role="img"
                                        viewBox="0 0 24 24"
                                        className="size-4"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z">
                                        </path>
                                    </svg>
                                    <span>Login with Google</span>
                                </div>
                            )
                        }
                </Button>
                </div>
            </CardContent>
        </Card>
        <Footer />
    </div>
  )
}