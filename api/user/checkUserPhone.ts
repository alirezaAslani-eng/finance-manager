import { BadResponse_face } from "@/types/error.types";

const checkUserPhone = async ({ phone }: { phone: string }): Promise<true> => {
  const res = await fetch("/api/verify/phone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });
  const jsonRes = await res.json();
  if (!res.ok) {
    throw jsonRes as BadResponse_face;
  }
  return true;
};

export default checkUserPhone;
