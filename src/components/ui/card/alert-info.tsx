"use client"
import React from 'react'
import { Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useQuery } from '@tanstack/react-query';
import { Axios } from '~/lib/axios';

type Props = {}

export default function AlertInfo({}: Props) {

  const { data } = useQuery({
    queryKey: ['fetch-alert-info'],
    queryFn: async () => {
        const response = await Axios.get('/info')
        const data = await response.data
        if ( data?.status ) {
            return data?.data
        } else {
            return null
        }
    }
  })

  return (
    data?.title && (
        <Alert className='mb-6'>
            <Sparkles className="size-4" />
            <AlertTitle>{ data.title }</AlertTitle>
            <AlertDescription>
                { data.message }
            </AlertDescription>
        </Alert>
    )
  )
}