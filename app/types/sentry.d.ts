declare module '@sentry/nextjs' {
  export function startSpan<T>(options: { name: string; op: string }, callback: () => Promise<T>): Promise<T>;
  export function diagnoseSdkConnectivity(): Promise<string>;
} 