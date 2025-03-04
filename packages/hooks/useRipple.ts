import "../styles/base/_ripple.scss";

interface RippleOptions {
  color?: string;
  disabled?: boolean;
}

export function useRipple() {
  const createRipple = (
    event: MouseEvent,
    el: HTMLElement,
    options: RippleOptions = {}
  ) => {
    if (options.disabled) return;

    const ripple = document.createElement("span");
    const rect = el.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ripple.className = "x-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // 设置 ripple 的大小
    ripple.style.setProperty(
      "--x-ripple-size",
      `${Math.max(rect.width, rect.height) * 2}px`
    );

    if (options.color) {
      ripple.style.backgroundColor = options.color;
    }

    el.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };

  return {
    createRipple
  };
}
