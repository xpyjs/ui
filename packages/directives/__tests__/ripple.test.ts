import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { vRipple } from "../ripple";
import { vi } from "vitest";

// 创建测试组件
const TestComponent = defineComponent({
  template: `
    <div class="test-element" v-ripple="rippleOptions">
      Click me
    </div>
  `,
  props: {
    rippleOptions: {
      type: Object,
      default: () => ({})
    }
  }
});

describe("水波纹指令", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    // 每次测试前重置 DOM
    document.body.innerHTML = "";
  });

  it("挂载时添加水波纹容器类", () => {
    wrapper = mount(TestComponent, {
      global: {
        directives: { ripple: vRipple }
      }
    });
    expect(wrapper.classes()).toContain("x-ripple-container");
  });

  it("鼠标按下时创建水波纹效果", async () => {
    wrapper = mount(TestComponent, {
      global: {
        directives: { ripple: vRipple }
      }
    });

    await wrapper.trigger("mousedown", {
      clientX: 100,
      clientY: 100
    });

    const ripple = wrapper.element.querySelector(".x-ripple");
    expect(ripple).toBeTruthy();
  });

  it("动画结束后移除水波纹", async () => {
    wrapper = mount(TestComponent, {
      global: {
        directives: { ripple: vRipple }
      }
    });

    await wrapper.trigger("mousedown", {
      clientX: 100,
      clientY: 100
    });

    const ripple = wrapper.element.querySelector(".x-ripple");
    ripple?.dispatchEvent(new Event("animationend"));
    expect(wrapper.element.querySelector(".x-ripple")).toBeFalsy();
  });

  it("禁用选项生效", async () => {
    wrapper = mount(TestComponent, {
      props: {
        rippleOptions: { disabled: true }
      },
      global: {
        directives: { ripple: vRipple }
      }
    });

    await wrapper.trigger("mousedown");
    expect(wrapper.element.querySelector(".x-ripple")).toBeFalsy();
  });

  it("应用自定义颜色", async () => {
    const customColor = "rgb(255, 0, 0)";
    wrapper = mount(TestComponent, {
      props: {
        rippleOptions: { color: customColor }
      },
      global: {
        directives: { ripple: vRipple }
      }
    });

    await wrapper.trigger("mousedown", {
      clientX: 100,
      clientY: 100
    });

    const ripple = wrapper.element.querySelector(".x-ripple");
    expect(ripple?.style.backgroundColor).toBe(customColor);
  });

  it("元素为静态定位时设置相对定位", async () => {
    wrapper = mount(
      defineComponent({
        template: `
          <div class="test-element" v-ripple="rippleOptions" style="position: static;">
            Click me
          </div>
        `,
        props: {
          rippleOptions: {
            type: Object,
            default: () => ({})
          }
        }
      }),
      {
        global: {
          directives: { ripple: vRipple }
        }
      }
    );

    expect(wrapper.element.style.position).toBe("relative");
  });

  it("保留原始点击事件处理器", async () => {
    const onClick = vi.fn();
    wrapper = mount(TestComponent, {
      attrs: { onClick },
      global: {
        directives: { ripple: vRipple }
      }
    });

    await wrapper.trigger("click");
    expect(onClick).toHaveBeenCalled();
  });
});
