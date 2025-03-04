import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Fixed from "../src/fixed.vue";

describe("Fixed 组件", () => {
  let wrapper: any;

  beforeEach(() => {
    // 创建挂载点
    const div = document.createElement("div");
    div.id = "app";
    document.body.appendChild(div);
  });

  afterEach(() => {
    // 清理
    document.body.innerHTML = "";
    if (wrapper) {
      wrapper.unmount();
    }
  });

  // 基础渲染测试
  describe("渲染", () => {
    it("正确渲染基础 fixed", async () => {
      wrapper = mount(Fixed, {
        attachTo: document.body,
        slots: {
          default: "<div>Fixed Content</div>"
        }
      });

      await nextTick();
      const fixed = document.querySelector(".x-fixed");
      expect(fixed).toBeTruthy();
      expect(fixed?.textContent).toBe("Fixed Content");
    });

    it("正确应用初始位置", async () => {
      wrapper = mount(Fixed, {
        attachTo: document.body,
        props: {
          position: {
            top: "100px",
            left: "100px"
          }
        }
      });

      await nextTick();
      const fixed = document.querySelector<HTMLElement>(".x-fixed");
      expect(fixed?.style.top).toBe("100px");
      expect(fixed?.style.left).toBe("100px");
    });

    it("正确应用 zIndex", async () => {
      wrapper = mount(Fixed, {
        attachTo: document.body,
        props: {
          zIndex: 1000
        }
      });

      await nextTick();
      const fixed = document.querySelector<HTMLElement>(".x-fixed");
      expect(fixed?.style.zIndex).toBe("1000");
    });
  });

  // 拖拽功能测试
  describe("拖拽", () => {
    it("默认不可拖拽", async () => {
      wrapper = mount(Fixed, {
        attachTo: document.body
      });

      await nextTick();
      const fixed = document.querySelector(".x-fixed");
      expect(fixed?.classList.contains("x-fixed--dragging")).toBe(false);

      await wrapper.trigger("mousedown");
      expect(fixed?.classList.contains("x-fixed--dragging")).toBe(false);
    });

    it("开启拖拽功能后可以拖动", async () => {
      wrapper = mount(Fixed, {
        attachTo: document.body,
        props: {
          draggable: true
        }
      });

      await nextTick();
      const fixed = document.querySelector(".x-fixed");

      // 模拟拖拽
      fixed?.dispatchEvent(new MouseEvent("mousedown"));
      await nextTick();
      expect(fixed?.classList.contains("x-fixed--dragging")).toBe(true);

      // 模拟释放
      document.dispatchEvent(new MouseEvent("mouseup"));
      await nextTick();
      expect(fixed?.classList.contains("x-fixed--dragging")).toBe(false);
    });

    it("拖拽时触发相应事件", async () => {
      wrapper = mount(Fixed, {
        attachTo: document.body,
        props: {
          draggable: true
        }
      });

      const onDragging = vi.fn();
      const onChange = vi.fn();
      wrapper.vm.$emit = vi.fn();

      wrapper.vm.$emit = (event: string, ...args: any[]) => {
        if (event === "dragging") onDragging(...args);
        if (event === "change") onChange(...args);
      };

      await nextTick();

      const fixed = document.querySelector<HTMLElement>(".x-fixed");
      // 模拟拖拽过程
      fixed?.dispatchEvent(new MouseEvent("mousedown"));
      await nextTick();
      document.dispatchEvent(
        new MouseEvent("mousemove", {
          movementX: 10,
          movementY: 10
        })
      );
      await nextTick();
      document.dispatchEvent(new MouseEvent("mouseup"));
      await nextTick();

      expect(wrapper.emitted("dragging")).toBeTruthy();
      expect(wrapper.emitted("change")).toBeTruthy();
    });
  });

  // 可见性测试
  describe("可见性", () => {
    it("通过 visible 控制显示隐藏", async () => {
      wrapper = mount(Fixed, {
        attachTo: document.body,
        props: {
          visible: false
        }
      });

      await nextTick();
      let fixed = document.querySelector<HTMLElement>(".x-fixed");
      expect(fixed?.style.display).toBe("none");

      await wrapper.setProps({ visible: true });
      fixed = document.querySelector<HTMLElement>(".x-fixed");
      expect(fixed?.style.display).toBe("");
    });
  });
});
