import { createMessage } from "./create";
export function useMessage() {
    return {
        message: createMessage
    };
}
export default createMessage;
