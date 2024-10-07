import React from 'react'
import Link from 'next/link';

type Props = {}

export default function Footer({}: Props) {
  return (
    <div>
        <div
            className='mt-2 w-full flex justify-center gap-4 items-center'>
                <Link href={'/kebijakan-privasi'} className='underline text-xs'>Syarat & Ketentuan</Link>
                <Link href={'/kebijakan-privasi'} className='underline text-xs'>Kebijakan Privasi</Link>
        </div>
    </div>
  )
}