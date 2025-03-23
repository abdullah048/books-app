import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import Book from "@/models/Book"
import mongoose from "mongoose"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 })
    }

    const book = await Book.findById(params.id).lean()

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...book,
      id: book._id.toString(),
    })
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 })
    }

    const body = await request.json()

    const book = await Book.findById(params.id)

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    const updatedBook = await Book.findByIdAndUpdate(
      params.id,
      {
        title: body.title,
        author: body.author,
        description: body.description,
        coverImage: body.coverImage,
        genre: body.genre,
        publicationDate: new Date(body.publicationDate),
        isbn: body.isbn,
        pageCount: body.pageCount ? Number.parseInt(body.pageCount) : null,
      },
      { new: true },
    ).lean()

    return NextResponse.json({
      ...updatedBook,
      id: updatedBook._id.toString(),
    })
  } catch (error) {
    console.error("Error updating book:", error)
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 })
    }

    const book = await Book.findById(params.id)

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    await Book.findByIdAndDelete(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting book:", error)
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 })
  }
}

