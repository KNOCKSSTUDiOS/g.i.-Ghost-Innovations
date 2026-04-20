export const send = (res, payload = {}, status = 200) => {
  res.status(status).json({
    ok: status >= 200 && status < 300,
    ...payload,
    timestamp: Date.now()
  });

