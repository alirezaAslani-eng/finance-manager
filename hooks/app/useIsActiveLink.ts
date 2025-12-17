import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// * in order to avoid mismatch Error ================== >
function useIsActiveLink(link: string): { isActive: boolean } {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { asPath } = useRouter();
  // after mounted element apply the state
  useEffect(() => {
    setIsActive(asPath == link);
  }, [asPath]);
  return { isActive };
}

export default useIsActiveLink;
