import React from 'react';

const Alert = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    role="alert"
    className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${className}`}
    {...props}
  />
);

const AlertDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <div className={`text-sm [&_p]:leading-relaxed ml-8 ${className}`} {...props} />
);

export { Alert, AlertDescription };