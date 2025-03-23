import { notFound } from "next/navigation"
import { Container, Typography, Box, Chip, Paper, Grid, Divider } from "@mui/material"
import Image from "next/image"
import { format } from "date-fns"
import dbConnect from "@/lib/mongoose"
import Book from "@/models/Book"
import BackButton from "@/components/back-button"
import mongoose from "mongoose"

interface BookPageProps {
  params: {
    id: string
  }
}

export default async function BookPage({ params }: BookPageProps) {
  await dbConnect()

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound()
  }

  const book = await Book.findById(params.id).lean()

  if (!book) {
    notFound()
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton />

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Image
              src={book.coverImage || `/placeholder.svg?height=500&width=350`}
              alt={book.title}
              width={350}
              height={500}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h2" component="h1" gutterBottom>
            {book.title}
          </Typography>

          <Typography variant="h5" color="text.secondary" gutterBottom>
            by {book.author}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
            {book.genre.map((g) => (
              <Chip key={g} label={g} />
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="text.secondary">
                Published
              </Typography>
              <Typography variant="body1">{format(new Date(book.publicationDate), "MMMM d, yyyy")}</Typography>
            </Grid>

            {book.isbn && (
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  ISBN
                </Typography>
                <Typography variant="body1">{book.isbn}</Typography>
              </Grid>
            )}

            {book.pageCount && (
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Pages
                </Typography>
                <Typography variant="body1">{book.pageCount}</Typography>
              </Grid>
            )}
          </Grid>

          <Divider sx={{ my: 3 }} />

          {book.description && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {book.description}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

