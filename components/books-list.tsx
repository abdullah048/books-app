import { Grid, Typography, Box } from '@mui/material';
import BookCard from '@/components/book-card';
import Pagination from '@/components/pagination';
import NoResults from '@/components/no-results';
import dbConnect from '@/lib/mongoose';
import Book from '@/models/Book';

const ITEMS_PER_PAGE = 4;

interface BooksListProps {
  page: number;
  search: string;
  genre: string;
  author: string;
  fromDate: string;
  toDate: string;
}

export default async function BooksList({
  page,
  search,
  genre,
  author,
  fromDate,
  toDate,
}: BooksListProps) {
  await dbConnect();

  // Build the filter conditions
  const filter: any = {};

  if (search) {
    // Use regex search if text index search isn't available
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (genre) {
    filter.genre = genre;
  }

  if (author) {
    filter.author = { $regex: author, $options: 'i' };
  }

  if (fromDate || toDate) {
    filter.publicationDate = {};

    if (fromDate) {
      filter.publicationDate.$gte = new Date(fromDate);
    }

    if (toDate) {
      filter.publicationDate.$lte = new Date(toDate);
    }
  }

  // Get total count for pagination
  const totalBooks = await Book.countDocuments(filter);
  const totalPages = Math.ceil(totalBooks / ITEMS_PER_PAGE);

  // Get books for current page
  const books = await Book.find(filter)
    .sort({ publicationDate: -1 })
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .lean();

  if (books.length === 0) {
    return <NoResults />;
  }

  return (
    <Box>
      <Typography variant='body2' sx={{ mb: 2 }}>
        Showing {books.length} of {totalBooks} books
      </Typography>

      <Grid container spacing={3}>
        {books.map(book => (
          <Grid item key={book._id.toString()} xs={12} sm={6} md={4} lg={3}>
            <BookCard
              book={{
                id: book._id.toString(),
                title: book.title,
                author: book.author,
                description: book.description,
                coverImage: book.coverImage,
                genre: book.genre,
                publicationDate: book.publicationDate,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination currentPage={page} totalPages={totalPages} />
      </Box>
    </Box>
  );
}
