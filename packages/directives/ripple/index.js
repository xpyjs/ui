import {} from "vue";
import { useRipple } from "@/hooks/useRipple";
import "@/styles/base/_ripple.scss";
export const vRipple = {
    mounted(el, binding) {
        if (binding.value?.disabled)
            return;
        const { createRipple } = useRipple();
        // 确保元素有定位属性
        if (getComputedStyle(el).position === "static") {
            el.style.position = "relative";
        }
        el.classList.add("x-ripple-container");
        // 使用 mousedown 而不是 click
        const onMouseDown = (event) => {
            createRipple(event, el, binding.value);
        };
        // 保存原始的点击事件处理器
        const originalClick = el.onclick;
        // 重写点击事件
        el.onclick = null; // 移除原始点击事件
        el.addEventListener("mousedown", onMouseDown);
        if (originalClick) {
            el.addEventListener("click", originalClick);
        }
        // 存储清理函数
        el._rippleCleanup = () => {
            el.removeEventListener("mousedown", onMouseDown);
            if (originalClick) {
                el.removeEventListener("click", originalClick);
            }
        };
    },
    unmounted(el) {
        // 清理事件监听
        if (el._rippleCleanup) {
            el._rippleCleanup();
        }
    }
};
