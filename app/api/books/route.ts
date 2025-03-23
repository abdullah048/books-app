import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import Book from "@/models/Book"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")
  const search = searchParams.get("search") || ""
  const genre = searchParams.get("genre") || ""
  const author = searchParams.get("author") || ""
  const fromDate = searchParams.get("fromDate") || ""
  const toDate = searchParams.get("toDate") || ""

  // Build the filter conditions
  const filter: any = {}

  if (search) {
    filter.$text = { $search: search }
  }

  if (genre) {
    filter.genre = genre
  }

  if (author) {
    filter.author = { $regex: author, $options: "i" }
  }

  if (fromDate || toDate) {
    filter.publicationDate = {}

    if (fromDate) {
      filter.publicationDate.$gte = new Date(fromDate)
    }

    if (toDate) {
      filter.publicationDate.$lte = new Date(toDate)
    }
  }

  try {
    await dbConnect()

    // Get total count for pagination
    const totalBooks = await Book.countDocuments(filter)

    // Get books for current page
    const books = await Book.find(filter)
      .sort({ publicationDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return NextResponse.json({
      books: books.map((book) => ({
        ...book,
        id: book._id.toString(),
      })),
      pagination: {
        total: totalBooks,
        pages: Math.ceil(totalBooks / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()

    const book = await Book.create({
      title: body.title,
      author: body.author,
      description: body.description,
      coverImage: body.coverImage,
      genre: body.genre,
      publicationDate: new Date(body.publicationDate),
      isbn: body.isbn,
      pageCount: body.pageCount ? Number.parseInt(body.pageCount) : null,
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 })
  }
}

