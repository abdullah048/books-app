'use client';

import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BackButton() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{
          mb: 2,
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'translateX(-4px)',
          },
        }}>
        Back to Books
      </Button>
    </motion.div>
  );
}
