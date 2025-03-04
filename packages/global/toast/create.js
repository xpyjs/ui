import { defineComponent, h, nextTick, ref, render } from "vue";
import Toast from "../../components/toast/src/toast.vue";
import { generateId } from "@/utils/uuid";
export function createToast(options) {
    const id = `x-toast-${generateId(12)}`;
    // 处理字符串形式调用
    const props = typeof options === "string" ? { content: options } : options;
    // 创建容器
    const container = document.createElement("div");
    container.id = id;
    // 创建 vnode
    const vnode = defineComponent({
        setup() {
            const visible = ref(false);
            // 延迟显示以触发进入动画
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
            return () => h(Toast, {
                ...props,
                visible: visible.value,
                "onUpdate:visible": (val) => {
                    visible.value = val;
                    // 当外部改变 visible 为 false 时,也要触发关闭流程
                    if (!val) {
                        handleClose();
                    }
                },
                onClose: handleAfterLeave
            });
        }
    });
    // 挂载到 body
    document.body.appendChild(container);
    render(h(vnode), container);
}
