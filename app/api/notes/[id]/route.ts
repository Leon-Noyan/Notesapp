import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Note from "@/models/Notes"
import { notesInputSchema } from "@/lib/notesSchema"

interface Params { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB()
    const note = await Note.findById((await params).id)
    if (!note) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { success: true, data: note },
      { status: 200 }
    )
  } catch (error) {
    console.error('ERROR: Failed to fetch note', error)
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    )
  }
}

  export async function PUT(request: Request, { params }: Params) {
    try {
      await connectDB()
      const body = await request.json()
      const parsed = notesInputSchema.safeParse(body)
      if (!parsed.success) {
        return NextResponse.json(
          { message: parsed.error.issues[0]?.message ?? "Invalid input" },
          { status: 400 }
        )
      }
      const updateNote = await Note.findByIdAndUpdate((await params).id, parsed.data, { new: true, runValidators: true,})

        if (!updateNote) {
          return NextResponse.json(
            { error: "Note not found" },
            { status: 404 })
        }
          return NextResponse.json(
            { success: true, data: updateNote },
            { status: 200 }
          )
        } catch (error) {
        console.error('ERROR: Failed to update note', error)
        return NextResponse.json(
          { error: "Failed to update note" },
          { status: 500 })
        }
      }

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectDB()
    const deletedNote = await Note.findByIdAndDelete((await params).id)
    if (!deletedNote) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { success: true, data: deletedNote },
      { status: 200 }
    )
  } catch (error) {
    console.error('ERROR: Failed to delete note', error)
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    )
  }
}
