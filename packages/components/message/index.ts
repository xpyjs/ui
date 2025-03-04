import { withInstall } from "../../utils/install";
import Message from "./src/message.vue";
import type { MessageProps } from "./src/props";
import "./src/style";

export const XMessage = withInstall<MessageProps>(Message);

export type { MessageProps };
export default XMessage;
