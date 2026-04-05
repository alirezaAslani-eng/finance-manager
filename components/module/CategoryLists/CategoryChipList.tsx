import { useAuth } from "@/context";
import { Box, BoxProps, Chip, Fade } from "@mui/material";

function CategoryChipList(props: BoxProps) {
  // * Context to use user's caterories =========== >
  const {
    userInfo: { categories },
    isAuthing,
  } = useAuth();
  return (
    <>
      {!isAuthing && !!categories?.length && (
        <Box display={"flex"} flexWrap={"wrap"} gap={"4px"} {...props}>
          {categories.map((item) => {
            return (
              <Fade in key={item._id}>
                <Chip label={item.name} />
              </Fade>
            );
          })}
        </Box>
      )}
    </>
  );
}

export default CategoryChipList;
