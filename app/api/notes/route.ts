import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Note from '@/models/Notes'
import { notesInputSchema } from '@/lib/notesSchema'

export async function GET() {
    try {
        await connectDB()
        const notes = await Note.find().sort({ createdAt: -1 })
        return NextResponse.json(
            { success: true, data: notes },
            { status: 200 }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Failed to fetch notes' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        await connectDB()
        const body = await request.json()
        const parsed = notesInputSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { message: parsed.error.issues[0]?.message ?? 'Invalid input' },
                { status: 400 }
            )
        }

        const newNote = await Note.create(parsed.data)
        return NextResponse.json(
            { success: true, data: newNote },
            { status: 201 }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Failed to create note' },
            { status: 500 }
        )
    }
}
