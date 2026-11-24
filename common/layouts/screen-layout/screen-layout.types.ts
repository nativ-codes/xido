import { HeaderPropTypes } from "@/common/components/header/header";

export type ScreenLayoutPropTypes = {
	isEmpty?: boolean;
	children: React.ReactNode;
	emptyPlaceholder?: React.ReactNode;
	/** Pinned below the scroll area, at the safe-area bottom edge */
	footer?: React.ReactNode;
} & HeaderPropTypes;
