import { HeaderPropTypes } from "@/common/components/header/header";

export type TabScreenLayoutPropTypes = {
  isEmpty?: boolean;
  children: React.ReactNode;
  emptyPlaceholder?: React.ReactNode;
} & HeaderPropTypes;
