import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface AuthRouteProps extends React.PropsWithChildren {}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/");
    } else {
      setIsVerified(true);
    }
  }, [auth.isAuthenticated, router]);

  if (!isVerified) {
    return null;
  }
  return <>{children}</>;
};

export default AuthRoute;
