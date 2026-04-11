import { SideBarButton } from "@/components/ui";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useModal } from "@/context";
import { ParamType } from "@/types/utils";
import { AppNavigator } from "@/constant/types";
import appNavigators from "@/constant/appNavigators";
import { OptimizedMap } from "@/components/module";

function SideBarNavigators() {
  const { openAddCategoryModal } = useModal();

  return (
    <>
      <OptimizedMap
        data={appNavigators}
        Component={SideBarButton}
        injector={sideBarButtonInjector}
      />

      <SideBarButton
        noLink
        buttonProps={{ onClick: openAddCategoryModal }} // * Open Modal <<<<<
        menuItem={{
          icon: <AddCircleOutlineRoundedIcon />,
          text: "دسته بندی جدید",
        }}
      />
    </>
  );
}

export default SideBarNavigators;

function sideBarButtonInjector(
  props: Partial<AppNavigator>,
): ParamType<typeof SideBarButton> {
  return {
    menuItem: {
      icon: props.icon,
      link: props.link,
      text: props.text,
    },
  };
}
