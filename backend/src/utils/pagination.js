export function paginate(page = 1, limit = 20) {
  const p = Math.max(parseInt(page, 10) || 1, 1);
  const l = Math.max(parseInt(limit, 10) || 20, 1);

  return {
    page: p,
    limit: l,
    offset: (p - 1) * l
  };
}
