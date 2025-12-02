import { TransactionCard } from "@/components/ui";
import React, { memo } from "react";

interface MyProps {
  count?: number;
}
function GenerateSkeleton({ count = 4 }: MyProps) {
  const arrayOfCount = Array.from({ length: count }, (_, index) => {
    return index;
  });
  return (
    <>
      {arrayOfCount.map((_) => {
        return <TransactionCard isPending key={crypto.randomUUID()} />;
      })}
    </>
  );
}

export default memo(GenerateSkeleton);
