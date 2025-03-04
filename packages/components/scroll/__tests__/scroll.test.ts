import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Scroll from "../src/scroll.vue";

describe("Scroll 组件", () => {
  // 基础渲染测试
  describe("基础渲染", () => {
    it("正确渲染基础结构", () => {
      const wrapper = mount(Scroll);
      expect(wrapper.classes()).toContain("x-scroll");
      expect(wrapper.find(".x-scroll__content").exists()).toBe(true);
    });

    it("正确渲染内容插槽", () => {
      const wrapper = mount(Scroll, {
        slots: {
          default: '<div class="test-content">Test Content</div>'
        }
      });
      expect(wrapper.find(".test-content").exists()).toBe(true);
    });

    it("应用自定义内容样式", () => {
      const wrapper = mount(Scroll, {
        props: {
          contentClass: "custom-class",
          contentStyle: { padding: "20px" }
        }
      });
      const content = wrapper.find(".x-scroll__content");
      expect(content.classes()).toContain("custom-class");
      expect(content.attributes("style")).toContain("padding: 20px");
    });
  });

  // 滚动条配置测试
  describe("滚动条配置", () => {
    it("正确应用滚动条尺寸", () => {
      const wrapper = mount(Scroll, {
        props: { size: 8 }
      });
      expect(wrapper.attributes("style")).toContain("--x-bar-size: 8px");
    });

    it("正确应用滚动条颜色", () => {
      const wrapper = mount(Scroll, {
        props: {
          trackColor: "rgba(0,0,0,0.1)",
          thumbColor: "rgba(0,0,0,0.2)",
          thumbHoverColor: "rgba(0,0,0,0.3)"
        }
      });
      const style = wrapper.attributes("style");
      expect(style).toContain("--x-track-color: rgba(0,0,0,0.1)");
      expect(style).toContain("--x-thumb-color: rgba(0,0,0,0.2)");
      expect(style).toContain("--x-thumb-hover-color: rgba(0,0,0,0.3)");
    });
  });
});
