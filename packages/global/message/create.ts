import { defineComponent, h, nextTick, ref, render } from "vue";
import type { MessageProps } from "../../components/message/src/props";
import Message from "@/components/message/src/message.vue";
import { generateId } from "@/utils/uuid";

export function createMessage(
  options: Partial<Omit<MessageProps, "visible">> | string
) {
  const id = `x-message-${generateId(12)}`;

  // 处理字符串形式调用
  const props = typeof options === "string" ? { content: options } : options;

  // 创建容器
  const container = document.createElement("div");
  container.id = id;

  // 创建 vnode
  const vnode = defineComponent({
    setup: () => {
      const visible = ref(false);
      nextTick(() => {
        visible.value = true;
      });

      const handleClose = () => {
        // 先触发关闭动画
        visible.value = false;
      };

      const handleAfterLeave = () => {
        // 动画结束后移除 DOM
        nextTick(() => {
          render(null, container);
          document.body.removeChild(container);
        });
      };

      return () =>
        h(Message, {
          ...props,
          visible: visible.value,
          "onUpdate:visible": (val: boolean) => {
            visible.value = val;
            if (!val) handleClose();
          },
          onClose: handleAfterLeave
        });
    }
  });

  // 挂载到 body
  document.body.appendChild(container);
  render(h(vnode), container);
}
