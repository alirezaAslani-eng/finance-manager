import type { BadResponse } from "@/lib/utils";
import { InitSchemaType } from "@/lib/validations/initSchema";

const postInitInfo = async (
  initInfo: InitSchemaType
): Promise<true | BadResponse> => {
  const res = await fetch("/api/init", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(initInfo),
  });

  if (!res.ok) {
    const jsonRes = await res.json();
    throw jsonRes as BadResponse;
  }
  return true;
};

export default postInitInfo;
