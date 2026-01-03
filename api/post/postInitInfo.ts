import type { BadResponse_face } from "@/types/error.types";
import { SetupUserSchemaType } from "@/lib/validations/types";

const postInitInfo = async (
  initInfo: SetupUserSchemaType
): Promise<true | BadResponse_face> => {
  const res = await fetch("/api/init", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(initInfo),
  });

  if (!res.ok) {
    const jsonRes = await res.json();
    throw jsonRes as BadResponse_face;
  }
  return true;
};

export default postInitInfo;
