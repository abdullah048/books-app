'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
      }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}>
        <CircularProgress size={60} />
        <Typography variant='h6' sx={{ mt: 2 }}>
          Loading books...
        </Typography>
      </motion.div>
    </Box>
  );
}
