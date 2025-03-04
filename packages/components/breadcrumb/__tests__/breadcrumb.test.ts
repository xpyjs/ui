import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Breadcrumb from "../src/breadcrumb.vue";
import { XLink } from "../../link";
import { XIcon } from "../../icon";

describe("Breadcrumb 组件", () => {
  // 基础渲染测试
  describe("渲染", () => {
    it("正确渲染基础面包屑", () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          items: [
            { label: "首页", to: "/" },
            { label: "列表页", to: "/list" },
            { label: "详情页" }
          ]
        }
      });

      expect(wrapper.find(".x-breadcrumb").exists()).toBe(true);
      expect(wrapper.findAllComponents(XLink as any).length).toBe(2);
      expect(wrapper.findAll(".x-breadcrumb__separator").length).toBe(2);
    });

    it("正确渲染分隔符", () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          separator: ">",
          items: [{ label: "首页", to: "/" }, { label: "详情页" }]
        }
      });

      expect(wrapper.find(".x-breadcrumb__separator").text()).toBe(">");
    });

    it("正确渲染图标分隔符", () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          separatorIcon: "test-icon",
          items: [{ label: "首页", to: "/" }, { label: "详情页" }]
        }
      });

      expect(wrapper.findComponent(XIcon as any).props("name")).toBe(
        "test-icon"
      );
    });

    it("正确渲染项目图标", () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          items: [
            { label: "首页", to: "/", icon: "home-icon" },
            { label: "详情页" }
          ]
        }
      });

      expect(wrapper.findComponent(XIcon as any).props("name")).toBe(
        "home-icon"
      );
    });
  });

  // 交互测试
  describe("交互", () => {
    it("点击可跳转项触发点击事件", async () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          items: [{ label: "首页", to: "/" }, { label: "详情页" }]
        }
      });

      await wrapper.findComponent(XLink as any).trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
    });

    it("点击禁用项不触发点击事件", async () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          items: [
            { label: "首页", to: "/", disabled: true },
            { label: "详情页" }
          ]
        }
      });

      await wrapper.find(".x-breadcrumb__text").trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("点击自定义事件项正确执行", async () => {
      let clicked = false;
      const wrapper = mount(Breadcrumb, {
        props: {
          items: [
            {
              label: "首页",
              action: () => {
                clicked = true;
              }
            },
            { label: "详情页" }
          ]
        }
      });

      await wrapper.findComponent(XLink as any).trigger("click");
      expect(clicked).toBe(true);
    });
  });

  // 属性测试
  describe("属性", () => {
    it("正确应用类型", () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          type: "primary",
          items: [{ label: "首页", to: "/" }]
        }
      });

      expect(wrapper.findComponent(XLink as any).props("type")).toBe("primary");
    });

    it("正确应用自定义类名", () => {
      const wrapper = mount(Breadcrumb, {
        props: {
          items: [{ label: "首页", class: "custom-class" }]
        }
      });

      expect(wrapper.find(".x-breadcrumb__item").classes()).toContain(
        "custom-class"
      );
    });
  });
});
