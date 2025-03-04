import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Tag from "../src/tag.vue";

describe("Tag 组件", () => {
  describe("渲染", () => {
    it("正确渲染默认标签", () => {
      const wrapper = mount(Tag, {
        slots: {
          default: "Tag"
        }
      });
      expect(wrapper.text()).toBe("Tag");
      expect(wrapper.classes()).toContain("x-tag");
      expect(wrapper.classes()).toContain("x-tag--default");
      expect(wrapper.classes()).toContain("x-tag--medium");
      expect(wrapper.classes()).toContain("x-tag--filled");
    });

    it("使用自定义类型渲染标签", () => {
      const types = [
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info"
      ] as const;

      types.forEach(type => {
        const wrapper = mount(Tag, {
          props: { type }
        });
        expect(wrapper.classes()).toContain(`x-tag--${type}`);
      });
    });

    it("使用不同尺寸渲染标签", () => {
      const sizes = ["small", "medium", "large"] as const;

      sizes.forEach(size => {
        const wrapper = mount(Tag, {
          props: { size }
        });
        expect(wrapper.classes()).toContain(`x-tag--${size}`);
      });
    });

    it("使用不同变体渲染标签", () => {
      const variants = ["filled", "outlined"] as const;

      variants.forEach(variant => {
        const wrapper = mount(Tag, {
          props: { variant }
        });
        expect(wrapper.classes()).toContain(`x-tag--${variant}`);
      });
    });
  });

  describe("关闭功能", () => {
    it("默认不显示关闭按钮", () => {
      const wrapper = mount(Tag);
      expect(wrapper.find(".x-tag__close").exists()).toBe(false);
    });

    it("设置 closable 时显示关闭按钮", async () => {
      const wrapper = mount(Tag, {
        props: {
          closable: true,
          closeShowType: "always"
        }
      });
      expect(wrapper.find(".x-tag__close").exists()).toBe(true);
    });

    it("点击关闭按钮触发 close 事件", async () => {
      const wrapper = mount(Tag, {
        props: {
          closable: true,
          closeShowType: "always"
        }
      });
      await wrapper.find(".x-tag__close").trigger("click");
      expect(wrapper.emitted("close")).toBeTruthy();
      expect(wrapper.emitted("close")?.length).toBe(1);
    });

    it("closeShowType 为 hover 时鼠标悬停才显示关闭按钮", async () => {
      const wrapper = mount(Tag, {
        props: {
          closable: true,
          closeShowType: "hover"
        }
      });

      // 初始不显示
      expect(wrapper.find(".x-tag__close").exists()).toBe(false);

      // 鼠标进入显示
      await wrapper.trigger("mouseenter");
      expect(wrapper.find(".x-tag__close").exists()).toBe(true);

      // 鼠标离开隐藏
      await wrapper.trigger("mouseleave");
      expect(wrapper.find(".x-tag__close").exists()).toBe(false);
    });
  });

  describe("插槽", () => {
    it("默认插槽", () => {
      const wrapper = mount(Tag, {
        slots: {
          default: "标签内容"
        }
      });
      expect(wrapper.text()).toBe("标签内容");
    });

    it("关闭按钮插槽", () => {
      const wrapper = mount(Tag, {
        props: {
          closable: true,
          closeShowType: "always"
        },
        slots: {
          close: "关闭"
        }
      });
      expect(wrapper.find(".x-tag__close").text()).toBe("关闭");
    });
  });
});
