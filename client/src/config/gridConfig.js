export const gridDots = Array(120)
  .fill(null)
  .map((_, index) => {
    if (index < 12) {
      // First row pattern
      if ([0, 2, 8, 11].includes(index)) return 'correct';
      if ([1, 10].includes(index)) return 'incorrect';
      if ([4, 5, 6, 7].includes(index)) return 'highlighted';
      return '';
    }
    if (index < 24) {
      // Second row pattern
      const rowIndex = index - 12;
      if ([0, 1, 3, 9, 10].includes(rowIndex)) return 'correct';
      if ([2, 8].includes(rowIndex)) return 'incorrect';
      return '';
    }
    if (index < 36) {
      // Third row pattern
      const rowIndex = index - 24;
      if ([1, 2].includes(rowIndex)) return 'correct';
      if ([0].includes(rowIndex)) return 'incorrect';
      return '';
    }
    return '';
  });
