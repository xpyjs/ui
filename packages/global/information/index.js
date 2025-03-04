import { createInformation } from "./create";
export * from "./types";
export function useInformation() {
    return {
        information: createInformation
    };
}
export default createInformation;
