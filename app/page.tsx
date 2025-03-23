import { Suspense } from 'react';
import { Container, Typography, Box } from '@mui/material';
import BooksList from '@/components/books-list';
import SearchFilters from '@/components/search-filters';
import Loading from '@/components/loading';

export default function Home({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    genre?: string;
    author?: string;
    fromDate?: string;
    toDate?: string;
  };
}) {
  // Ensure page is a number and defaults to 1
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;
  const search = searchParams.search || '';
  const genre = searchParams.genre || '';
  const author = searchParams.author || '';
  const fromDate = searchParams.fromDate || '';
  const toDate = searchParams.toDate || '';

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h1' component='h1' gutterBottom>
        Books Library
      </Typography>

      <SearchFilters
        initialSearch={search}
        initialGenre={genre}
        initialAuthor={author}
        initialFromDate={fromDate}
        initialToDate={toDate}
      />

      <Box sx={{ mt: 4 }}>
        <Suspense fallback={<Loading />}>
          <BooksList
            page={page}
            search={search}
            genre={genre}
            author={author}
            fromDate={fromDate}
            toDate={toDate}
          />
        </Suspense>
      </Box>
    </Container>
  );
}
