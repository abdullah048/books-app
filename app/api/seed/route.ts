import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import Book from "@/models/Book"

// Sample data for seeding the database
const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Classic"],
    publicationDate: new Date("1925-04-10"),
    isbn: "9780743273565",
    pageCount: 180,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "The story of young Scout Finch, her brother Jem, and their father Atticus, as they navigate issues of race and class in their small Southern town during the Great Depression.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Classic", "Coming-of-age"],
    publicationDate: new Date("1960-07-11"),
    isbn: "9780061120084",
    pageCount: 281,
  },
  {
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel set in a totalitarian society where critical thought is suppressed under a regime of surveillance and propaganda.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Dystopian", "Science Fiction"],
    publicationDate: new Date("1949-06-08"),
    isbn: "9780451524935",
    pageCount: 328,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "The adventure of Bilbo Baggins, a hobbit who embarks on an unexpected journey to reclaim the Lonely Mountain from the dragon Smaug.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Fantasy", "Adventure"],
    publicationDate: new Date("1937-09-21"),
    isbn: "9780547928227",
    pageCount: 310,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Romance", "Classic"],
    publicationDate: new Date("1813-01-28"),
    isbn: "9780141439518",
    pageCount: 432,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "The story of Holden Caulfield, a teenage boy who has been expelled from prep school and is wandering around New York City before returning home.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Coming-of-age"],
    publicationDate: new Date("1951-07-16"),
    isbn: "9780316769488",
    pageCount: 277,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "An epic high-fantasy novel that follows the quest to destroy the One Ring, which was created by the Dark Lord Sauron.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Fantasy", "Adventure"],
    publicationDate: new Date("1954-07-29"),
    isbn: "9780618640157",
    pageCount: 1178,
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description:
      "The first novel in the Harry Potter series, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Fantasy", "Young Adult"],
    publicationDate: new Date("1997-06-26"),
    isbn: "9780747532743",
    pageCount: 223,
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    description:
      "In a dystopian future, the nation of Panem forces each of its twelve districts to send a teenage boy and girl to compete in the Hunger Games, a televised fight to the death.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Dystopian", "Young Adult"],
    publicationDate: new Date("2008-09-14"),
    isbn: "9780439023481",
    pageCount: 374,
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    description:
      "A mystery thriller novel that follows symbologist Robert Langdon as he investigates a murder in Paris's Louvre Museum and discovers a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ having been married to Mary Magdalene.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Mystery", "Thriller"],
    publicationDate: new Date("2003-03-18"),
    isbn: "9780307474278",
    pageCount: 454,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A philosophical novel about a young Andalusian shepherd named Santiago who dreams of finding a worldly treasure and embarks on a journey to find it.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Fantasy", "Philosophy"],
    publicationDate: new Date("1988-01-01"),
    isbn: "9780062315007",
    pageCount: 197,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    description:
      "A dystopian novel set in a futuristic World State, inhabited by genetically modified citizens and an intelligence-based social hierarchy.",
    coverImage: "/placeholder.svg?height=500&width=350",
    genre: ["Fiction", "Dystopian", "Science Fiction"],
    publicationDate: new Date("1932-01-01"),
    isbn: "9780060850524",
    pageCount: 288,
  },
]

export async function GET() {
  try {
    await dbConnect()

    // Clear existing data
    await Book.deleteMany({})

    // Insert sample books
    const books = await Book.insertMany(sampleBooks)

    return NextResponse.json({
      success: true,
      message: `Successfully seeded database with ${books.length} books`,
      books,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}

