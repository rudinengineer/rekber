export type TransactionType = {
    transactionId: string,
    email: string,
    emailTo: string,
    name: string,
    description: string,
    adminAmount: number,
    amount: number,
    status: string,
    isPaid: boolean,
    isSendTo: boolean,
    createdAt: Date
    updatedAt: Date
}