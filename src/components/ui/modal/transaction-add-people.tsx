"use client"
import React from 'react'
import { CopyIcon } from "@radix-ui/react-icons"
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import copy from 'clipboard-copy';
import { useToast } from '~/hooks/use-toast';

type Props = {
    label: string
    url: string,
}

export default function TransactionAddPeople({label, url}: Props) {
  const { toast } = useToast()
  const [baseUrl, setBaseUrl] = React.useState<string>("")

  const copyClipBoard = async () => {
    try {
        await copy(baseUrl + url)
        toast({
            description: 'Url disalin ke clipboard.'
        })
    } catch(e: any) {
        toast({
            description: "Gagal menyalin url.",
            variant: 'destructive'
        })
    }
  }

  React.useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  return (
    <div>
        <Dialog>
        <DialogTrigger asChild>
            <Button>Tambah { label }</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
                Bagikan link untuk menambahkan { label }.
            </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                Link
                </Label>
                <Input
                id="link"
                defaultValue={baseUrl ? (baseUrl + url) : 'Loading...'}
                readOnly
                />
            </div>
            <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={copyClipBoard}
            >
                <span className="sr-only">Copy</span>
                <CopyIcon className="h-4 w-4" />
            </Button>
            </div>
        </DialogContent>
        </Dialog>
    </div>
  )
}