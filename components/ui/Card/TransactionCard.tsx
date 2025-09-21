import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { MuiButton } from "@/components/ui";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

const TransactionCard = () => {
  const theme = useTheme();
  return (
    <Card variant="outlined" sx={{ width: "auto", borderRadius: "20px" }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography gutterBottom variant="h5" component="div">
            خرید میوه
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            20,000
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          امروز دو کیلو میوه برای مهمونی خریدم که اینم یک مت طولانی و تستی هست
          برا تست این ui پنل مدیریت خرج های خونه
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "10px",
        }}
      >
        <Link href={""}>
          <MuiButton
            buttonProps={{
              sx: {
                ...theme.custom.resetButton,
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                p: "10px",
              },
            }}
          >
            <ArrowOutwardRoundedIcon />
            {"مشاهده"}
          </MuiButton>
        </Link>
        {/* Date ===================== > */}
        <Typography>22:18----1404/12/01</Typography>
      </Box>
    </Card>
  );
};

export default TransactionCard;
