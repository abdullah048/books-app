'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { motion } from 'framer-motion';
import { Search, FilterList, Clear } from '@mui/icons-material';

// This would typically come from an API call
const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Children',
];

interface SearchFiltersProps {
  initialSearch: string;
  initialGenre: string;
  initialAuthor: string;
  initialFromDate: string;
  initialToDate: string;
}

export default function SearchFilters({
  initialSearch,
  initialGenre,
  initialAuthor,
  initialFromDate,
  initialToDate,
}: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const [genre, setGenre] = useState(initialGenre);
  const [author, setAuthor] = useState(initialAuthor);
  const [fromDate, setFromDate] = useState<Date | null>(
    initialFromDate ? new Date(initialFromDate) : null
  );
  const [toDate, setToDate] = useState<Date | null>(
    initialToDate ? new Date(initialToDate) : null
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = () => {
    // Create a new URLSearchParams object from the current URL
    const params = new URLSearchParams(searchParams.toString());

    // Reset to page 1 when applying new filters
    params.set('page', '1');

    // Update or remove search parameters
    if (search) params.set('search', search);
    else params.delete('search');

    if (genre) params.set('genre', genre);
    else params.delete('genre');

    if (author) params.set('author', author);
    else params.delete('author');

    if (fromDate) params.set('fromDate', fromDate.toISOString().split('T')[0]);
    else params.delete('fromDate');

    if (toDate) params.set('toDate', toDate.toISOString().split('T')[0]);
    else params.delete('toDate');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch('');
    setGenre('');
    setAuthor('');
    setFromDate(null);
    setToDate(null);
    router.push(pathname);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Search books'
              variant='outlined'
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant='contained'
              onClick={handleSearch}
              sx={{ flexGrow: 1 }}>
              Search
            </Button>

            <Button
              variant='outlined'
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              startIcon={<FilterList />}>
              Filters
            </Button>

            {(search || genre || author || fromDate || toDate) && (
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleReset}
                startIcon={<Clear />}>
                Clear
              </Button>
            )}
          </Grid>

          {isFilterOpen && (
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id='genre-label'>Genre</InputLabel>
                      <Select
                        labelId='genre-label'
                        value={genre}
                        label='Genre'
                        onChange={e => setGenre(e.target.value)}>
                        <MenuItem value=''>All Genres</MenuItem>
                        {GENRES.map(g => (
                          <MenuItem key={g} value={g}>
                            {g}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label='Author'
                      variant='outlined'
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <DatePicker
                            label='From Date'
                            value={fromDate}
                            onChange={date => setFromDate(date)}
                            slotProps={{
                              textField: { fullWidth: true, size: 'medium' },
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <DatePicker
                            label='To Date'
                            value={toDate}
                            onChange={date => setToDate(date)}
                            slotProps={{
                              textField: { fullWidth: true, size: 'medium' },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </motion.div>
    </Paper>
  );
}
