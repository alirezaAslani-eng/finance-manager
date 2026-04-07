import { useEffect } from "react";

function useSetFontVarsToBody(...font_variables: string[]) {
  useEffect(() => {
    document.body.classList.add(...font_variables);
  }, [font_variables]);

  return { serialized_font_vars: font_variables.join(" ") };
}

export default useSetFontVarsToBody;
