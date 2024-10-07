import { NextRequest, NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
    const formData = await req.json()

    const check = await prisma.user.findFirst({
        where: {
            email: formData.email
        }
    })

    if ( !check ) {
        if ( formData.name && formData.email && formData.image && formData.provider && formData.providerAccountId ) {
            const data = {
                id: uuidv4(),
                name: formData.name,
                email: formData.email,
                image: formData.image,
                provider: formData.provider,
                providerAccountId: formData.providerAccountId
            }
    
            const response = await prisma.user.create({
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
            message: 'User is already registered!'
        }, { status: 200 })
    }
}