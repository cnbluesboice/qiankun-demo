// import * as Sentry from '@sentry/nextjs';

export const sentryIntegration = (fn: any, name?: string, op?: string) => {
  // if (process.env.NEXT_PUBLIC_ENABLE_SENTRY === 'true') {
  //   const transaction = Sentry.startSpan({ name, op }, () => {
  //     return fn();
  //   });
  //   try {
  //     fn();
  //   } catch (error: any) {
  //     Sentry.captureException(error);
  //   } finally {
  //     transaction?.finish();
  //   }
  // } else {
  try {
    fn();
  } catch (error: any) {
    throw new Error(error);
  }
  // }
};
