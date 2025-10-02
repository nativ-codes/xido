import { HomeInfoSections } from "@/types/components";

export type HomeInfoBottomSheetPropTypes = {
  infoSection: HomeInfoSections | undefined;
  hideModal: () => void | any;
};
