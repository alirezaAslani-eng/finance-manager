import { Keyframes, keyframes } from "@emotion/react";

const pulse = (scale: number = 2): Keyframes => {
  return keyframes`
from{}
to{
transform:scale(${scale});
background-color:transparent;
}
`;
};

export default pulse;
