import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "~/lib/auth";
import prisma from "~/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions)

    if ( session?.user ) {
        const response = await prisma.transaction.findMany({
            where: {
                OR: [
                    {
                        email: session.user.email
                    },
                    {
                        emailTo: session.user.email
                    }
                ],
                status: {
                    notIn: ['Selesai', 'Gagal']
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 8
        })

        return NextResponse.json({
            status: true,
            data: response
        }, { status: 200 })
    } else {
        return NextResponse.json({
            status: false,
            message: '401 Unauthorized!'
        }, { status: 401 })
    }
}