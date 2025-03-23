'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Link from 'next/link';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    description?: string | null;
    coverImage?: string | null;
    genre: string[];
    publicationDate: Date;
  };
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}>
      <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
              transform: 'translateY(-4px)',
            },
          }}>
          <CardMedia
            component='img'
            height='200'
            image={book.coverImage || `/placeholder.svg?height=200&width=300`}
            alt={book.title}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant='h6' component='h2' gutterBottom noWrap>
              {book.title}
            </Typography>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              by {book.author}
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              display='block'>
              {format(new Date(book.publicationDate), 'MMMM yyyy')}
            </Typography>

            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {book.genre.slice(0, 2).map(g => (
                <Chip
                  key={g}
                  label={g}
                  size='small'
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
              {book.genre.length > 2 && (
                <Chip
                  label={`+${book.genre.length - 2}`}
                  size='small'
                  variant='outlined'
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
