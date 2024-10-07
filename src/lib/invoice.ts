import prisma from "./prisma"
import { Transaction } from "@prisma/client"
import { xenditClient } from "~/lib/xendit";
import { Invoice } from 'xendit-node/invoice/models'
import { Session } from "next-auth";
import { v4 as uuidv4 } from 'uuid'

export const CheckStatusInvoice = async (session: Session, transaction: Transaction) => {
    const checkInvoice: Invoice = await xenditClient.Invoice.getInvoiceById({
        invoiceId: transaction.invoiceId as string
    })
    
    if ( checkInvoice.status === 'PAID' && !transaction.isPaid ) {
        await prisma.transaction.update({
            data: {
                isPaid: true
            },
            where: {
                transactionId: transaction.transactionId
            }
        })
        const checkInvoiceDb = await prisma.invoice.count({
            where: {
                invoiceId: checkInvoice.id as string
            }
        })
        if ( !checkInvoiceDb ) {
            const checkInvoiceExist = await prisma.invoice.count({
                where: {
                    invoiceId: checkInvoice.id as string,
                }
            })

            if ( !checkInvoiceExist ) {
                await prisma.invoice.create({
                    data: {
                        invoiceId: checkInvoice.id as string,
                        email: session?.user.email,
                        transactionId: transaction.transactionId,
                        amount: transaction.amount,
                        adminAmount: transaction.amount,
                        totalAmount: transaction.totalAmount
                    }
                })
            }
            if ( transaction.emailTo ) {
                const amount = new Intl.NumberFormat(
                    'ID-id',
                    {
                        style: 'currency',
                        currency: 'IDR',
                        maximumSignificantDigits: 3
                    }
                ).format(transaction.amount)

                const checkNotificationExist = await prisma.notification.count({
                    where: {
                        title: transaction.name + ' telah dibayar.',
                        transactionId: transaction.transactionId,
                        to: transaction.emailTo
                    }
                })

                if ( !checkNotificationExist ) {
                    await prisma.notification.create({
                        data: {
                            id: uuidv4(),
                            title: transaction.name + ' telah dibayar.',
                            message: `${transaction.email} telah membayar sebesar ${amount} pada transaksi ${transaction.name}`,
                            transactionId: transaction.transactionId,
                            to: transaction.emailTo
                        }
                    })
                }
            }
        }
    } else if ( checkInvoice.status === 'EXPIRED' && transaction.invoiceId ) {
        await prisma.transaction.update({
            data: {
                invoiceId: null,
                invoiceUrl: null,
                expiryDate: null
            },
            where: {
                transactionId: transaction.transactionId
            }
        })
    }
}