import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const withAuthProtection = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<P> = (props) => {
    const router = useRouter();
    const auth = getAuth();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/auth");
        } else {
          setIsLoading(false);
        }
      });

      return () => unsubscribe();
    }, []);

    if (isLoading) {
      return (
        <div className="min-h-screen ">
        <div className="mx-auto p-4">
          <div className="rounded p-6">
            <div className="animate-pulse">
              {Array.from({ length: 10 }, (_, index) => (
                <div key={index} className="h-4 bg-gray-300 rounded mb-2"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      );
    }

    return <WrappedComponent {...props} />
  };

  return HOC;
};

export default withAuthProtection;
