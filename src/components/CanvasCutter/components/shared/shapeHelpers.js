export const getShapeBounds = shape => {
  const { minY, minX, maxX, maxY } = shape.reduce(
    (acc, [x, y]) => {
      if (x > acc.maxX) acc.maxX = x;
      if (x < acc.minX) acc.minX = x;
      if (y > acc.maxY) acc.maxY = y;
      if (y < acc.minY) acc.minY = y;
      return acc;
    },
    {
      minY: Number.POSITIVE_INFINITY,
      minX: Number.POSITIVE_INFINITY,
      maxX: Number.NEGATIVE_INFINITY,
      maxY: Number.NEGATIVE_INFINITY
    }
  );
  return {
    offset: [minX, minY],
    dimensions: [maxX - minX, maxY - minY],
    area: (maxX - minX) * (maxY - minY)
  };
};
