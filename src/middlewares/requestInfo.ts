import { NextFunction, Request, Response } from "express";

export function requestInfo(req: Request, res: Response, next: NextFunction) {
  const startedAt = performance.now();

  res.on("finish", () => {
    const durationMs = Math.round(performance.now() - startedAt);
    const { method, originalUrl } = req;
    const { statusCode } = res;

    console.log(`${method} ${originalUrl} ${statusCode} ${durationMs}ms`);
  });

  next();
}
