import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { generateId } from '~/lib/function'

export async function GET() {
    const session = await getServerSession(authOptions)

    if ( session?.user ) {
        const response = await prisma.transaction.findMany({
            where: {
                OR: [
                    {
                        email: session?.user.email
                    },
                    {
                        emailTo: session?.user.email
                    }
                ]
            },
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

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    const formData = await req.json()

    if ( session?.user ) {
        if ( formData?.name && formData?.type && formData.amount && Number(formData.amount) >= 1000 ) {
            const data: any = {
                transactionId: generateId(12),
                name: formData.name,
                description: formData.description,
                amount: formData.amount
            }

            const adminAmount = await prisma.adminAmount.findMany({
                select: {
                    maximum: true,
                    total: true
                }
            })

            let adminBefore: number = 0
            adminAmount.map((value) => {
                if ( Number(formData.amount) > adminBefore && Number(formData.amount) <= value.maximum ) {
                    data.adminAmount = value.total
                    data.totalAmount = Number(formData.amount) + value.total
                }
                adminBefore = value.maximum
            })

            if ( !data?.adminAmount ) {
                return NextResponse.json({
                    status: false,
                    error: 'Terjadi kesalahan tidak terduga. Silahkan coba lagi!'
                }, { status: 200 })
            }

            if ( formData.type === 'pembeli' ) {
                data.emailTo = session.user.email
            } else {
                data.email = session.user.email
            }

            const response = await prisma.transaction.create({
                data: data
            })

            if ( response ) {
                return NextResponse.json({
                    status: true,
                    message: '200 OK'
                }, { status: 200 })
            } else {
                return NextResponse.json({
                    status: false,
                    message: '500 Internal Server Error'
                }, { status: 500 })
            }
        } else {
            return NextResponse.json({
                status: false,
                message: 'Invalid credentials!'
            })
        }
    } else {
        return NextResponse.json({
            status: false,
            message: '401 Unauthorized!'
        }, { status: 401 })
    }
}