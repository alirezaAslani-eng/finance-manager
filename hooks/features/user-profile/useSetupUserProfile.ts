import { postInitInfo } from "@/api/post";
import { SetupUserSchemaType } from "@/lib/validations/types";
import { BadResponse_face } from "@/types/error.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useSetupUserProfile = () => {
  const { replace } = useRouter();
  const { mutateAsync } = useMutation({ mutationFn: postInitInfo });

  const setupUser = async (initInfo: SetupUserSchemaType) => {
    try {
      await mutateAsync(initInfo);
      replace("/my-panel");
    } catch (err) {
      const error = err as BadResponse_face;
      // TODO Show Error to User =============== >
      console.log(error);
    }
  };
  return { setupUser };
};

export default useSetupUserProfile;
