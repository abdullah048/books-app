'use client';

import type React from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Pagination as MuiPagination } from '@mui/material';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());

    // Update the page parameter
    params.set('page', page.toString());

    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color='primary'
        size='large'
        showFirstButton
        showLastButton
        siblingCount={1}
      />
    </motion.div>
  );
}
