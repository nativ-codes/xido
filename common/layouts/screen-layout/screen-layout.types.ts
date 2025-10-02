import { HeaderPropTypes } from "@/common/components/header/header";

export type ScreenLayoutPropTypes = {
  isEmpty?: boolean;
  children: React.ReactNode;
  emptyPlaceholder?: React.ReactNode;
} & HeaderPropTypes;
