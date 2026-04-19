import { Landing } from "@/components/module";
import { AdvantageCard, Pulse } from "@/components/ui";
import { Grid } from "@mui/system";
import peyda_bold from "@/constant/font/peyda_bold";
import { Box, Container, Typography } from "@mui/material";
import LightBlurTop from "@/components/ui/BlurEffect/LightBlurTop";
import BlurPaper from "@/components/ui/Paper/BlurPaper";
import DecoratePaper from "@/components/ui/DecorativeShape/DecoratePaper";
import staticData from "@/constant/static-data/staticData";

function PublicHome() {
  return (
    <Box className={peyda_bold.variable}>
      <LightBlurTop />

      <Landing />

      <Container>
        <Typography variant="xl-title" textAlign={"center"}>
          {"ویژه گی های هزینه یار"}
        </Typography>
        <Box
          mt={{ xs: "40px", sm: "80px" }}
          gap={{ xs: "12px", sm: "40px" }}
          display={"grid"}
          gridTemplateColumns={{ sm: "repeat(2,1fr)", md: "repeat(3,1fr)" }}
        >
          {staticData.advantages.map((advantage) => {
            return <AdvantageCard text={advantage} />;
          })}
        </Box>
      </Container>

      <Box pt={{ xs: "100px", sm: "200px" }} pb={"80px"}>
        <Container>
          <DecoratePaper>
            <BlurPaper
              p={"24px"}
              position={"relative"}
              sx={{ backdropFilter: "blur(20px)" }}
            >
              <Typography variant="xl-title">{"درباره هزینه یار"}</Typography>
              <Box mt={"12px"}>
                <Typography color="text.secondary">
                  {staticData.aboutUs}
                </Typography>
              </Box>
            </BlurPaper>
          </DecoratePaper>
        </Container>
      </Box>
    </Box>
  );
}

export default PublicHome;
