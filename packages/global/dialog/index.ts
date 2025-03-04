import { createDialog } from "./create";

export * from "./types";

export function useDialog() {
  return {
    dialog: createDialog
  };
}

export default createDialog;
