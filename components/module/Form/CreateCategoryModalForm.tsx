import {
  ShadowScrollContainer,
  InputError,
  ModalToolBar,
} from "@/components/ui";
import { createCategorySchema } from "@/lib/validations";
import dana_md from "@/constant/font/dana_md";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ArrowBackRounded } from "@mui/icons-material";
import CategoryChipList from "../CategoryLists/CategoryChipList";
import { useAddCategory } from "@/hooks";
import { CreateCategorySchemaType } from "@/lib/validations/types";

interface MyProps {
  onClose?: () => void;
}

const formSchema = createCategorySchema();
function CreateCategoryModalForm({ onClose }: MyProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) });

  const { addCategory } = useAddCategory();
  const submiter = async (category: CreateCategorySchemaType) => {
    await addCategory(category);
  };
  return (
    <>
      <Box
        className={dana_md.className}
        onSubmit={handleSubmit(submiter)}
        component={"form"}
      >
        <Stack alignItems={"center"} width={"100%"} gap={"24px"}>
          <ModalToolBar>
            <ModalToolBar.Title variant="xl">
              {"دسته بندی جدید"}
            </ModalToolBar.Title>
            ‌
            <ArrowBackRounded color="action" onClick={onClose} />
          </ModalToolBar>

          <Box width={"100%"}>
            <TextField
              autoFocus
              disabled={isSubmitting}
              error={!!errors?.["name"]?.message}
              placeholder="دسته بندی (هزینه منزل, تفریح, سلامت)"
              label="دسته بندی جدید"
              {...register("name")}
            />
            <InputError errorText={errors?.["name"]?.message} />
          </Box>

          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            sx={{ alignSelf: "start" }}
          >
            {"ایجاد دسته بندی"}
          </Button>
        </Stack>

        <ShadowScrollContainer mt={"20px"}>
          <ShadowScrollContainer.Scroll
            maxHeight={"200px"}
            sx={(tm) => tm.custom!.noScroll as object}
          >
            <CategoryChipList pb={"32px"} />
          </ShadowScrollContainer.Scroll>

          <ShadowScrollContainer.Shadow
            position="bottom"
            gradient={{ deg: "to top" }}
            size="32px"
          />
        </ShadowScrollContainer>
      </Box>
    </>
  );
}

export default CreateCategoryModalForm;
