import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Tabs from "../src/tabs.vue";
import TabNavItem from "../src/tab-nav-item.vue";

describe("Tabs 组件", () => {
  const items = [
    { id: "1", label: "标签1" },
    { id: "2", label: "标签2" },
    { id: "3", label: "标签3" }
  ];

  beforeEach(() => {
    // 清理 DOM
    document.body.innerHTML = "";
  });

  it("基础渲染", () => {
    const wrapper = mount(Tabs, {
      props: {
        modelValue: "1",
        items
      }
    });

    expect(wrapper.find(".x-tabs").exists()).toBe(true);
    expect(wrapper.findAll(".x-tabs__nav-item").length).toBe(3);
    expect(wrapper.find(".x-tabs__nav-item--active").text()).toBe("标签1");
  });

  it("切换标签页", async () => {
    const wrapper = mount(Tabs, {
      props: {
        modelValue: "1",
        items
      }
    });

    await wrapper.findAll(".x-tabs__nav-item")[1].trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["2"]);
    expect(wrapper.emitted("change")?.[0]).toEqual(["2"]);
  });

  it("禁用标签页", async () => {
    const disabledItems = [
      { id: "1", label: "标签1" },
      { id: "2", label: "标签2", disabled: true }
    ];

    const wrapper = mount(Tabs, {
      props: {
        modelValue: "1",
        items: disabledItems
      }
    });

    await wrapper.findAll(".x-tabs__nav-item")[1].trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });

  it("关闭标签页", async () => {
    const wrapper = mount(Tabs, {
      props: {
        modelValue: "1",
        items,
        closable: true
      }
    });

    await wrapper.find(".x-tabs__nav-item-close").trigger("click");
    expect(wrapper.emitted("close")?.[0]).toEqual(["1"]);
  });

  it("新增标签页", async () => {
    const wrapper = mount(Tabs, {
      props: {
        modelValue: "1",
        items,
        addable: true
      }
    });

    await wrapper.find(".x-tabs__add").trigger("click");
    expect(wrapper.emitted("add")).toBeTruthy();
  });

  it("beforeChange 钩子", async () => {
    const beforeChange = vi.fn().mockResolvedValue(false);
    const wrapper = mount(Tabs, {
      props: {
        modelValue: "1",
        items,
        beforeChange
      }
    });

    await wrapper.findAll(".x-tabs__nav-item")[1].trigger("click");
    expect(beforeChange).toHaveBeenCalledWith("2");
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });

  it("不同类型的标签页", () => {
    const types = ["line", "card", "round"] as const;

    types.forEach(type => {
      const wrapper = mount(Tabs, {
        props: {
          modelValue: "1",
          items,
          type
        }
      });

      expect(wrapper.find(`.x-tabs--${type}`).exists()).toBe(true);
    });
  });

  it("垂直方向的标签页", () => {
    const wrapper = mount(Tabs, {
      props: {
        modelValue: "1",
        items,
        direction: "vertical"
      }
    });

    expect(wrapper.find(".x-tabs--vertical").exists()).toBe(true);
  });

  it("带图标的标签页", () => {
    const iconItems = [{ id: "1", label: "标签1", icon: "test-icon" }];

    const wrapper = mount(Tabs, {
      props: {
        modelValue: "1",
        items: iconItems
      }
    });

    expect(wrapper.find(".x-tabs__nav-item-icon").exists()).toBe(true);
  });
});
