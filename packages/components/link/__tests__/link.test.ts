import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Link from "../src/link.vue";

describe("Link 组件", () => {
  describe("渲染", () => {
    it("正确渲染默认链接", () => {
      const wrapper = mount(Link, {
        slots: {
          default: "Link"
        }
      });
      expect(wrapper.text()).toBe("Link");
      expect(wrapper.classes()).toContain("x-link");
      expect(wrapper.classes()).toContain("x-link--default");
    });

    it("使用自定义类型渲染链接", () => {
      const types = [
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info"
      ] as const;
      types.forEach(type => {
        const wrapper = mount(Link, { props: { type } });
        expect(wrapper.classes()).toContain(`x-link--${type}`);
      });
    });

    it("渲染带图标的链接", () => {
      const wrapper = mount(Link, {
        slots: {
          icon: '<span class="icon">icon</span>'
        }
      });
      expect(wrapper.find(".x-link__icon").exists()).toBe(true);
    });
  });

  describe("属性", () => {
    it("正确设置 href", () => {
      const wrapper = mount(Link, {
        props: {
          href: "https://example.com"
        }
      });
      expect(wrapper.attributes("href")).toBe("https://example.com");
    });

    it("正确设置 target", () => {
      const wrapper = mount(Link, {
        props: {
          target: "_blank"
        }
      });
      expect(wrapper.attributes("target")).toBe("_blank");
    });

    it("处理下划线状态", () => {
      const wrapper = mount(Link, {
        props: {
          underline: true
        }
      });
      expect(wrapper.classes()).toContain("x-link--underline");
    });
  });

  describe("状态", () => {
    it("处理禁用状态", async () => {
      const wrapper = mount(Link, {
        props: {
          disabled: true
        }
      });
      expect(wrapper.classes()).toContain("x-link--disabled");
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });
  });

  describe("事件", () => {
    it("点击时触发 click 事件", async () => {
      const wrapper = mount(Link);
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
      expect(wrapper.emitted("click")?.length).toBe(1);
    });
  });
});
