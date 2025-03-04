import { defineComponent, h, ref, render, nextTick } from "vue";
import XDialogInstance from "@/components/dialog";
import { omit } from "@/utils/object";
import { generateId } from "@/utils/uuid";
/**
 * 创建对话框
 * @param content 对话框内容组件
 * @param options 对话框配置项
 *
 * @example
 * const { dialog } = useDialog();
 * dialog(MyDialog, {
 *   title: "对话框标题",
 *   width: "500px",
 *   height: "300px"
 * });
 *
 * // MyDialog 组件
 * <template>
 *   <div>
 *     <h1>对话框标题</h1>
 *   </div>
 * </template>
 *
 * <script lang="ts">
 * import { defineComponent } from "vue";
 * import { XButton } from "@/components/button";
 *
 * export default defineComponent({
 *   setup(props, { emit }) {
 *     const handleConfirm = () => {
 *       // confirm 会将结果传递给 dialog 方法的 then 回调
 *       emit("confirm", { status: "success", data: "some data" });
 *     };
 *
 *     const handleCancel = () => {
 *       // cancel 会将原因传递给 dialog 方法的 catch 回调
 *       emit("cancel", "user cancelled");
 *     };
 *   }
 * });
 * </script>
 */
export function createDialog(content, options = {}) {
    const { ...dialogProps } = options;
    const id = "x-dialog-" + generateId(12);
    // 创建容器
    const container = document.createElement("div");
    container.id = id;
    document.body.appendChild(container);
    const removeContainer = () => {
        if (container) {
            document.body.querySelector(`#${id}`)?.remove();
        }
    };
    let resolvePromise;
    let rejectPromise;
    // 创建包装组件
    const visible = ref(false);
    const Wrapper = defineComponent({
        setup() {
            // 处理确认
            const handleConfirm = (value) => {
                visible.value = false;
                resolvePromise(value);
                nextTick(() => {
                    removeContainer();
                });
            };
            // 处理取消
            const handleCancel = (reason) => {
                visible.value = false;
                rejectPromise(reason);
                nextTick(() => {
                    removeContainer();
                });
            };
            // 处理关闭
            const handleClose = () => {
                visible.value = false;
                rejectPromise("closed");
                nextTick(() => {
                    removeContainer();
                });
            };
            return () => h(content, {
                ...omit(dialogProps, ["visible"]),
                visible: visible.value,
                "onUpdate:visible": (val) => {
                    visible.value = val;
                    if (!val)
                        handleClose();
                },
                onConfirm: handleConfirm,
                onCancel: handleCancel,
                onClose: handleClose
            });
        }
    });
    const dialogInstance = {
        // 提供手动关闭方法
        close: (value) => {
            resolvePromise(value);
        },
        // 提供更新配置方法
        update: (newOptions) => {
            Object.assign(options, newOptions);
        }
    };
    // 创建Promise
    const promise = new Promise((resolve, reject) => {
        resolvePromise = resolve;
        rejectPromise = reject;
        // 渲染对话框
        render(h(Wrapper), container);
        visible.value = true;
    });
    // 附加实例方法到Promise
    promise.instance = dialogInstance;
    return promise;
}
