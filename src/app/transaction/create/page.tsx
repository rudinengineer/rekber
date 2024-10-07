"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import Spinner from '~/components/loading/Spinner'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { useToast } from '~/hooks/use-toast'
import Layout from '~/layouts/Layout'
import { Axios } from '~/lib/axios'
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

type Props = {}

const schema = yup
  .object({
    name: yup.string().required('Nama transaksi tidak boleh kosong.').max(50, 'Nama transaksi tidak boleh lebih dari 50 karakter.'),
    description: yup.string(),
    amount: yup.number().typeError('Total pembayaran harus berisi angka.').required('Total pembayaran tidak boleh kosong.').test('count-amount', 'Total pembayaran minimal 1000 rupiah.', function(value) {
      return value >= 1000
    }),
    type: yup.string().required('Harap pilih peran transaksi.').max(10, 'Peran transaksi tidak bole lebih dari 10 karakter').label('Peran transaksi')
  })
  .required()

export default function page({}: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const ref: any = React.useRef()
  const [loading, setLoading] = React.useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const createTransaction = async (formData: any) => {
    setLoading(true)

    try {
        const response = await Axios.post('/transaction', formData)
        const data = response.data

        if ( data?.status ) {
          toast({
            description: 'Transaksi berhasil dibuat.',
          })
          router.push('/')
        } else {
          if ( data?.error ) {
            toast({
              description: data.error,
              variant: 'destructive'
            })
          } else {
            toast({
              description: "Transaksi gagal dibuat.",
              variant: 'destructive'
            })
          }
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

  const handlePrice = async (e: any) => {
    if ( e.currentTarget.value !== '' ) {
      ref.value = new Intl.NumberFormat(
        'ID-id',
          {
              maximumSignificantDigits: 3
          }
      ).format(Number(e.currentTarget.value))
    }
  }

  return (
    <Layout>
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Buat Transaksi</CardTitle>
                <CardDescription>
                    Buat transaksi anda dengan mengisi form dibawah ini.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(createTransaction)}>
                    <div className="grid gap-3">
                        <Label htmlFor="name">Nama Transaksi</Label>
                        <Input
                            id="name"
                            type="text"
                            className="w-full"
                            autoComplete='off'
                            {...register("name")}
                        />
                        {
                          errors?.name && (
                            <span className='text-xs text-red-500'>{ errors.name.message }</span>
                          )
                        }
                    </div>

                    <div className="mt-6 grid gap-3">
                      <Label htmlFor="description">Deskripsi (optional)</Label>
                      <Textarea
                        id="description"
                        placeholder='Tulis sesuatu...'
                        className="min-h-32 resize-none"
                        rows={6}
                        {...register("description")}
                      />
                    </div>

                    <div className="mt-6 grid gap-3">
                      <Label htmlFor="subcategory">
                        Peran Transaksi
                      </Label>
                      <Select onValueChange={(value) => {setValue('type', value)}}>
                        <SelectTrigger
                          id="subcategory"
                          aria-label="Pilih sebagai"
                        >
                          <SelectValue {...register("type")} placeholder="Pilih sebagai" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seller">Penjual</SelectItem>
                          <SelectItem value="buyer">Pembeli</SelectItem>
                        </SelectContent>
                      </Select>
                      {
                        errors?.type && (
                          <span className='text-xs text-red-500'>{ errors.type.message }</span>
                        )
                      }
                    </div>

                    <div className="mt-6 grid gap-3">
                        <Label htmlFor="amount">Total Pembayaran</Label>
                        <Input
                          id="amount"
                          type="text"
                          className="w-full"
                          autoComplete='off'
                          onKeyUp={handlePrice}
                          {...register("amount")}
                        />
                        {
                          errors?.amount && (
                            <span className='text-xs text-red-500'>{ errors.amount.message }</span>
                          )
                        }
                    </div>

                    <Button
                      type='submit'
                      className='mt-6 w-full flex justify-center gap-2 items-center'
                      disabled={loading}
                      >
                          {
                              loading ? (
                                  <Spinner />
                              ) : (
                                  <span>Buat Transaksi</span>
                              )
                          }
                    </Button>
                </form>
            </CardContent>
        </Card>
    </Layout>
  )
}