import type { App, Component, DefineComponent, Plugin } from "vue";

export type SFCWithInstall<T, E, S> = DefineComponent<T, E, S> & Plugin;

export const withInstall = <T = {}, E = {}, S = {}>(comp: Component) => {
  const c = comp as SFCWithInstall<T, E, S>;
  c.install = function (app: App) {
    app.component(c.name!, c);
  };
  return c as SFCWithInstall<T, E, S>;
};
