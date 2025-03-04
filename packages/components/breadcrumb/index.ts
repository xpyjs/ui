import { withInstall } from "../../utils/install";
import Breadcrumb from "./src/breadcrumb.vue";
import type { BreadcrumbProps, BreadcrumbEmits } from "./src/props";
import "./src/style";

export const XBreadcrumb = withInstall<BreadcrumbProps, BreadcrumbEmits>(
  Breadcrumb
);

export type {
  BreadcrumbProps,
  BreadcrumbEmits,
  BreadcrumbItem
} from "./src/props";

export default XBreadcrumb;
