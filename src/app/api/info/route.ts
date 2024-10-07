import prisma from "~/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
    const response = await prisma.info.findFirst()

    if ( response ) {
        return NextResponse.json({
            status: true,
            data: response
        }, { status: 200 })
    } else {
        return NextResponse.json({
            status: false,
            message: 'Info not found.'
        }, { status: 200 })
    }
}