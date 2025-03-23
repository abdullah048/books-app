'use client';

import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SearchOff } from '@mui/icons-material';

export default function NoResults() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}>
        <SearchOff sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />

        <Typography variant='h4' align='center' gutterBottom>
          No books found
        </Typography>

        <Typography
          variant='body1'
          align='center'
          color='text.secondary'
          sx={{ mb: 4 }}>
          Try adjusting your search or filter criteria
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' onClick={() => router.push('/')}>
            Clear all filters
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
