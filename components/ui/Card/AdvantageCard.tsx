import { Typography } from "@mui/material";
import BlurPaper from "../Paper/BlurPaper";
import Pulse from "../Animation/Pulse";

export default function AdvantageCard({ text }: { text: string }) {
  return (
    <BlurPaper
      p={{ xs: "12px", sm: "20px" }}
      gap={{ xs: "8px", sm: "12px" }}
      display={"flex"}
      alignItems={"center"}
    >
      <Pulse animatedSize={3} size="20px" />
      <Typography fontSize={{ xs: "16px" }}>{text}</Typography>
    </BlurPaper>
  );
}
