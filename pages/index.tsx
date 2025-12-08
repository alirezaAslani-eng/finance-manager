import React from "react";
import { Footer, Landing } from "@/components/module";
import { Box, Container, Typography } from "@mui/material";
const container_sx = { mt: { xs: "50px", sm: "100px", lg: "150px" } };
const footer_container = { mt: { xs: "50px", sm: "100px", lg: "150px" } };
function PublicHome() {
  return (
    <Box>
      <Landing />
      <Container sx={container_sx}>
        <MuiTitleText
          title="چرا باید به تراکنش ها اهمیت داد"
          text="کنترل تراکنش‌های روزانه یعنی اینکه دقیقاً بدونیم پول‌مون کجا میره، چه زمانی خرج میشه و چرا خرج میشه. خیلی وقت‌ها آخر ماه می‌بینیم حساب خالی شده، اما هیچ ردّی از خرج‌ها یادمون نمیاد. همین بی‌توجهی باعث میشه پول‌هامون بی‌صدا از دست برن، بدون اینکه چیزی نصیب‌مون بشه. وقتی تراکنش‌ها رو کنترل می‌کنیم، هم جلوی خرج‌های بیهوده گرفته میشه، هم متوجه میشیم عادت‌های مالی‌مون چه‌طور روی زندگی‌مون اثر میذارن. این کار به ما امکان میده برنامه‌ریزی کنیم، پس‌انداز داشته باشیم و به اهداف مالی‌مون نزدیک‌تر بشیم. در واقع، اگر خرج‌ها رو کنترل نکنیم، پول ما رو کنترل می‌کنه؛ اما وقتی حساب و کتاب‌مون شفاف باشه، خودمون مدیر واقعی زندگی مالی‌مون میشیم."
        />
      </Container>
      <Container sx={container_sx}>
        <MuiTitleText
          title="حالا چرا هزینه یار"
          text="چون هزینه‌یار بهت کمک می‌کنه همیشه بدونی پولت کجا میره، چرا خرج میشه و چه وقت باید خرج بشه. خیلی وقتا خرج‌های کوچیک و بی‌برنامه جمع میشن و تبدیل به یه عدد بزرگ میشن بدون اینکه متوجه بشیم. هزینه‌یار مثل یه همراه مالیه که تمام تراکنش‌های روزانه، واریزی‌ها و دلیل هزینه‌ها رو یک‌جا نشون میده و اینطوری باعث میشه بتونی خرج‌هات رو مدیریت کنی، جلوی خرج‌های اضافی رو بگیری و برای آینده‌ات برنامه‌ریزی دقیق‌تری داشته باشی."
        />
      </Container>
      <Box sx={footer_container}>
        <Footer />
      </Box>
    </Box>
  );
}

export default PublicHome;

function MuiTitleText({ text, title }: { text?: string; title?: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Title =================== > */}
      <Typography
        fontFamily={"var(--peyda-md)"}
        sx={{
          fontSize: {
            xs: "32px",
            md: "40px",
            lg: "45px",
          },
        }}
      >
        {title}
      </Typography>
      {/* Text =============== > */}
      <Typography
        sx={{
          fontSize: {
            xs: "18px",
            md: "20px",
          },
          mt: "20px",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
