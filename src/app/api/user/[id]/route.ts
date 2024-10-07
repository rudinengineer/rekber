import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const id = params.id

    const response = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    id: id
                },
                {
                    providerAccountId: id
                }
            ]
        }
    })

    if ( response ) {
        return NextResponse.json({
            status: true,
            data: response
        }, { status: 200 })
    } else {
        return  NextResponse.json({
            status: false,
            message: 'User not found!'
        }, { status: 200 })
    }
}