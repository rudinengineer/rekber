import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "~/lib/auth";
import prisma from "~/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions)

    if ( session?.user ) {
        const response = await prisma.user.findFirst({
            select: {
                saldo: true
            },
            where: {
                providerAccountId: session.user.id
            }
        })

        return NextResponse.json({
            status: true,
            saldo: response?.saldo
        }, { status: 200 })
    } else {
        return NextResponse.json({
            status: false,
            message: '401 Unauthorized!'
        }, { status: 401 })
    }
}