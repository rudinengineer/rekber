import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "~/lib/auth";
import { CheckStatusInvoice } from "~/lib/invoice";
import prisma from "~/lib/prisma";

export async function GET(req: Request, { params }: { params: { transactionId: string } }) {
    const session = await getServerSession(authOptions)
    const transactionId = params.transactionId

    if ( session?.user ) {
        const transaction = await prisma.transaction.findFirst({
            where: {
                transactionId: transactionId
            }
        })

        if ( transaction?.email === session.user.email || transaction?.emailTo === session.user.email ) {
            if ( transaction.invoiceId ) {
                CheckStatusInvoice(session, transaction)
            }

            return NextResponse.json({
                status: true,
                data: transaction
            }, { status: 200 })
        } else {
            return NextResponse.json({
                status: false,
                message: '401 Unauthorized!'
            }, { status: 401 })
        }
    } else {
        return NextResponse.json({
            status: false,
            message: '401 Unauthorized!'
        }, { status: 401 })
    }
}