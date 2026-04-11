import { memo } from "react";
import appNavigators from "@/constant/appNavigators";
import BottomNavigationLink from "./BottomNavigationLink";
import BottomNavigationButton from "./BottomNavigationButton";
import BottomNavigationText from "./BottomNavigationText";
import { Grid } from "@mui/material";

interface NavigatorsProps {
  onNavigate?: () => void;
}
function Navigators({ onNavigate }: NavigatorsProps) {
  return (
    <>
      {appNavigators.map(({ icon, link, text }) => {
        if (link === "/my-panel/transactions/add") return null;
        return (
          <Grid size={3}>
            <BottomNavigationLink href={link} onClick={onNavigate}>
              <BottomNavigationButton>
                {icon}
                <BottomNavigationText>{text}</BottomNavigationText>
              </BottomNavigationButton>
            </BottomNavigationLink>
          </Grid>
        );
      })}
    </>
  );
}

export default memo(Navigators);
