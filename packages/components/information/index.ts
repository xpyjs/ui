import { withInstall } from "../../utils/install";
import Information from "./src/information.vue";
import type { InformationProps, InformationEmits } from "./src/props";
import "./src/style";

export type InformationInstance = InstanceType<typeof Information>;

export const XInformation = withInstall<InformationProps, InformationEmits>(
  Information
);

export type { InformationProps, InformationEmits };
export default XInformation;
