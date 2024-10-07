import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "~/lib/auth";
import { generateId } from "~/lib/function";
import prisma from "~/lib/prisma";
import { xenditClient } from "~/lib/xendit";

export async function POST(req: Request, { params }: { params: { transactionId: string } }) {
    const session = await getServerSession(authOptions)

    if ( session?.user ) {
        const transaction = await prisma.transaction.findFirst({
            where: {
                transactionId: params.transactionId
            }
        })

        if ( transaction && transaction.email === session.user.email ) {
            try {
                const response = await xenditClient.Invoice.createInvoice({
                    data: {
                        amount: transaction.totalAmount,
                        externalId: generateId(16),
                        customer: {
                            givenNames: session.user.name,
                            email: session.user.email,
                        },
                        fees: [
                            {
                                type: 'Biaya Admin',
                                value: transaction.adminAmount
                            }
                        ],
                        items: [
                            {
                                name: transaction.name,
                                price: transaction.amount,
                                quantity: 1
                            }
                        ],
                        description: transaction.description ?? '',
                        successRedirectUrl: process.env.APP_BASE_URL + '/transaction/' + transaction.transactionId + '/success',
                        currency: 'IDR',
                    }
                })

                if ( response.invoiceUrl ) {
                    await prisma.transaction.update({
                        where: {
                            transactionId: transaction.transactionId
                        },
                        data: {
                            invoiceId: String(response.id),
                            invoiceUrl: response.invoiceUrl,
                            expiryDate: String(response.expiryDate)
                        }
                    })

                    return NextResponse.json({
                        status: true,
                        id: response.id,
                        invoiceUrl: response.invoiceUrl,
                        expiryDate: response.expiryDate
                    }, { status: 200 })
                } else {
                    return NextResponse.json({
                        status: false,
                        message: '500 Internal Server Error!'
                    }, { status: 500 })
                }
            } catch(e: any) {
                return NextResponse.json({
                    status: false,
                    message: '500 Internal Server Error!'
                }, { status: 500 })
            }
        } else {
            return NextResponse.json({
                status: false,
                message: 'Transaction not found.'
            }, { status: 200 })
        }
    } else {
        return NextResponse.json({
            status: false,
            message: '401 Unauthorized!'
        }, { status: 401 })
    }
}