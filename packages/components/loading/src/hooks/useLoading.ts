import Loading from "../loading.vue";
import { type MaybeElementRef, unrefElement } from "@/utils/dom/unrefElement";
import type { LoadingProps } from "../props";
import { warn } from "@/utils/console";
import { type Ref, watch, h, render, computed, nextTick } from "vue";

// 创建 loading 实例
const createLoadingInstance = (
  el: MaybeElementRef,
  visible?: Ref<boolean>,
  options?: Ref<Partial<LoadingProps>>
) => {
  const element = computed(() => {
    if (options?.value.fullscreen) {
      return document.body;
    }
    return unrefElement(el) as HTMLElement;
  });

  const close = () => {
    if ((element.value as any)?.__loadingInstance) {
      const vnode = (element.value as any).__loadingInstance;
      vnode.component && (vnode.component.exposed!.show.value = false);
      (element.value as any).__loadingInstance = null;
      delete (element.value as any).__loadingInstance;
    }
  };

  if (!element.value) {
    warn("loading", "The element is not found.");
    return { close };
  }

  // 确保元素有定位属性
  if (getComputedStyle(element.value).position === "static") {
    element.value.style.position = "relative";
  }

  // 创建 loading 容器
  const loadingEl = document.createElement("div");
  loadingEl.className = "x-loading-wrapper";
  loadingEl.style.position = "absolute";
  loadingEl.style.top = "0";
  loadingEl.style.left = "0";
  loadingEl.style.width = "100%";
  loadingEl.style.height = "100%";
  loadingEl.style.overflow = "hidden";
  loadingEl.style.zIndex = "9999";

  if (options?.value.fullscreen) {
    loadingEl.style.position = "fixed";
    loadingEl.style.width = "100vw";
    loadingEl.style.height = "100vh";
  }

  watch(
    [() => element.value, () => visible?.value, () => options?.value],
    () => {
      if (visible?.value) {
        if ((element.value as any)?.__loadingInstance) {
          return;
        }

        // 挂载 loading 容器
        element.value?.appendChild(loadingEl);

        // 渲染 loading 组件
        const vnode = h(Loading, {
          ...options?.value,
          visible: false,
          "onAfter-leave": () => {
            // 监听 after-leave 事件
            nextTick(() => {
              loadingEl.parentNode?.removeChild(loadingEl);
            });
          }
        });

        (element.value as any).__loadingInstance = vnode;
        render(vnode, loadingEl);

        // 等待下一帧再显示，以触发过渡效果
        nextTick(() => {
          vnode.component && (vnode.component.exposed!.show.value = true);
        });
      } else {
        close();
      }
    },
    {
      immediate: true
      // deep: true
    }
  );

  return { close };
};

export function useLoading(
  elRef?: MaybeElementRef,
  visible?: Ref<boolean>,
  options?: Ref<LoadingProps>
) {
  return createLoadingInstance(elRef, visible, options);
}
