function getKey(args: unknown[]): string {
  return args.map(String).join('|');
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function memoize<F extends (...args: any[]) => any>(fn: F): F {
  const cache = new Map<string, ReturnType<F>>();

  return ((...args: Parameters<F>): ReturnType<F> => {
    const key = getKey(args);
    if (cache.has(key)) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as F;
}
