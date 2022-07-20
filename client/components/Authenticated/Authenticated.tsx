import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface AuthenticatedProps extends React.PropsWithChildren {}

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!auth.isAuthenticated) {
      router.push({
        pathname: "/auth/login",
        query: { backTo: router.asPath },
      });
    } else {
      setVerified(true);
    }
  }, [router.isReady, auth.isAuthenticated, router]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};
