import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "../src/button.vue";

describe("Button 组件", () => {
  // 渲染测试
  describe("渲染", () => {
    it("正确渲染默认按钮", () => {
      const wrapper = mount(Button, {
        slots: {
          default: "Button"
        }
      });
      expect(wrapper.text()).toBe("Button");
      expect(wrapper.classes()).toContain("x-button");
      expect(wrapper.classes()).toContain("x-button--default");
      expect(wrapper.classes()).toContain("x-button--filled");
      expect(wrapper.classes()).toContain("x-button--medium");
    });

    it("使用自定义类型渲染按钮", () => {
      const types = [
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info"
      ] as const;
      types.forEach(type => {
        const wrapper = mount(Button, { props: { type } });
        expect(wrapper.classes()).toContain(`x-button--${type}`);
      });
    });

    it("使用不同变体渲染按钮", () => {
      const variants = ["filled", "light", "outlined", "text"] as const;
      variants.forEach(variant => {
        const wrapper = mount(Button, { props: { variant } });
        expect(wrapper.classes()).toContain(`x-button--${variant}`);
      });
    });

    it("使用不同尺寸渲染按钮", () => {
      const sizes = ["small", "medium", "large"] as const;
      sizes.forEach(size => {
        const wrapper = mount(Button, { props: { size } });
        expect(wrapper.classes()).toContain(`x-button--${size}`);
      });
    });

    it("使用不同形状渲染按钮", () => {
      const shapes = ["default", "round", "circle", "square"] as const;
      shapes.forEach(shape => {
        const wrapper = mount(Button, { props: { shape } });
        expect(wrapper.classes()).toContain(`x-button--${shape}`);
      });
    });

    it("渲染带图标的按钮", () => {
      const wrapper = mount(Button, {
        slots: {
          icon: '<span class="icon">icon</span>'
        }
      });
      expect(wrapper.find(".x-button__icon").exists()).toBe(true);
    });
  });

  // 状态测试
  describe("状态", () => {
    it("处理禁用状态", () => {
      const wrapper = mount(Button, { props: { disabled: true } });
      expect(wrapper.classes()).toContain("x-button--disabled");
      expect(wrapper.attributes("disabled")).toBeDefined();
    });

    it("处理加载状态", () => {
      const wrapper = mount(Button, { props: { loading: true } });
      expect(wrapper.classes()).toContain("x-button--loading");
      expect(wrapper.find(".x-loading-wrapper").exists()).toBe(true);
      expect(wrapper.attributes("disabled")).toBeDefined();
    });

    it("处理扁平状态", () => {
      const wrapper = mount(Button, { props: { flat: true } });
      expect(wrapper.classes()).toContain("x-button--flat");
    });
  });

  // 事件测试
  describe("事件", () => {
    it("点击时触发 click 事件", async () => {
      const wrapper = mount(Button);
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
      expect(wrapper.emitted("click")?.length).toBe(1);
    });

    it("禁用状态下不触发 click 事件", async () => {
      const wrapper = mount(Button, { props: { disabled: true } });
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("加载状态下不触发 click 事件", async () => {
      const wrapper = mount(Button, { props: { loading: true } });
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("长按时触发 longpress 事件", async () => {
      const wrapper = mount(Button);
      await wrapper.trigger("mousedown");
      await new Promise(resolve => setTimeout(resolve, 500));
      expect(wrapper.emitted("longpress")).toBeTruthy();
    });

    it("提前释放不触发 longpress 事件", async () => {
      const wrapper = mount(Button);
      await wrapper.trigger("mousedown");
      await wrapper.trigger("mouseup");
      await new Promise(resolve => setTimeout(resolve, 500));
      expect(wrapper.emitted("longpress")).toBeFalsy();
    });

    it("禁用状态下不触发 longpress 事件", async () => {
      const wrapper = mount(Button, { props: { disabled: true } });
      await wrapper.trigger("mousedown");
      await new Promise(resolve => setTimeout(resolve, 500));
      expect(wrapper.emitted("longpress")).toBeFalsy();
    });

    it("加载状态下不触发 longpress 事件", async () => {
      const wrapper = mount(Button, { props: { loading: true } });
      await wrapper.trigger("mousedown");
      await new Promise(resolve => setTimeout(resolve, 500));
      expect(wrapper.emitted("longpress")).toBeFalsy();
    });
  });

  // 水波纹测试
  describe("水波纹效果", () => {
    it("默认启用水波纹效果", async () => {
      const wrapper = mount(Button);
      expect(wrapper.vm.ripple).toBe(true);
      await wrapper.trigger("click");
      expect(wrapper.find(".x-ripple-container").exists()).toBe(true);
    });

    it("ripple 属性为 false 时禁用水波纹", async () => {
      const wrapper = mount(Button, { props: { ripple: false } });
      expect(wrapper.vm.ripple).toBe(false);
      await wrapper.trigger("click");
      expect(wrapper.find(".x-ripple-container").exists()).toBe(false);
    });

    it("文本变体按钮禁用水波纹效果", async () => {
      const wrapper = mount(Button, { props: { variant: "text" } });
      await wrapper.trigger("click");
      expect(wrapper.find(".x-ripple-container").exists()).toBe(false);
    });
  });
});
