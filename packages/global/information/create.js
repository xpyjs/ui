import { defineComponent, h, nextTick, ref, render } from "vue";
import Information from "@/components/information/src/information.vue";
import { generateId } from "@/utils/uuid";
export function createInformation(options) {
    const id = `x-information-${generateId(12)}`;
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
            return () => h(Information, {
                ...props,
                visible: visible.value,
                "onUpdate:visible": (val) => {
                    visible.value = val;
                    if (!val)
                        handleClose();
                },
                onClose: handleAfterLeave
            });
        }
    });
    // 挂载到 body
    document.body.appendChild(container);
    render(h(vnode), container);
}
