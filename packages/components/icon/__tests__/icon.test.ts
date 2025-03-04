import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { XIcon } from "../index";
import { Icon } from "@iconify/vue";

describe("Icon 组件", () => {
  // 基础渲染测试
  it("应该正确渲染默认图标", () => {
    const wrapper = mount(XIcon, {
      props: {
        name: "mdi:home"
      }
    });
    expect(wrapper.findComponent(Icon).exists()).toBe(true);
    expect(wrapper.classes()).toContain("x-icon");
  });

  // 测试自定义大小
  it("应该正确应用自定义大小", () => {
    const wrapper = mount(XIcon, {
      props: {
        name: "mdi:home",
        size: "24px"
      }
    });
    expect(wrapper.attributes("style")).toContain("font-size: 24px");
  });

  // 测试自定义颜色
  it("应该正确应用自定义颜色", () => {
    const wrapper = mount(XIcon, {
      props: {
        name: "mdi:home",
        color: "#ff0000"
      }
    });
    expect(wrapper.attributes("style")).toContain("color: rgb(255, 0, 0)");
  });

  // 测试 URL 图标
  it("应该正确渲染 URL 图标", () => {
    const wrapper = mount(XIcon, {
      props: {
        name: "url:https://example.com/icon.png"
      }
    });
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("https://example.com/icon.png");
  });

  // 测试 SVG 内容
  it("应该正确渲染 SVG 内容", () => {
    const svgContent = '<svg><path d="M10 10"></path></svg>';
    const wrapper = mount(XIcon, {
      props: {
        content: svgContent,
        color: "#ff0000",
        size: "24px"
      }
    });
    expect(wrapper.html()).toContain("svg");
    expect(wrapper.html()).toContain('fill="#ff0000"');
  });

  // 测试优先级：content > name
  it("当同时提供 content 和 name 时，应该优先使用 content", () => {
    const svgContent = '<svg><path d="M10 10"></path></svg>';
    const wrapper = mount(XIcon, {
      props: {
        content: svgContent,
        name: "mdi:home"
      }
    });
    expect(wrapper.html()).toContain("svg");
    expect(wrapper.findComponent(Icon).exists()).toBe(false);
  });
});
