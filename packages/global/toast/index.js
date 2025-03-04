import { createToast } from "./create";
export function useToast() {
    return {
        toast: createToast
    };
}
export default createToast;
