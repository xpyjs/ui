import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Menu from "../src/menu.vue";
import type { MenuItem } from "../../../types/menu";

describe("Menu 组件", () => {
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
    it("正确渲染基础菜单", async () => {
      const menu: MenuItem[] = [
        {
          label: "菜单1",
          action: () => {}
        },
        {
          label: "菜单2",
          action: () => {}
        }
      ];

      wrapper = mount(Menu, {
        attachTo: document.body,
        props: {
          menu
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      expect(wrapper.find("button").exists()).toBe(true);

      // 点击触发按钮
      await wrapper.find("button").trigger("click");
      await nextTick();

      const menuItems = document.querySelectorAll(".x-menu-item");
      expect(menuItems.length).toBe(2);
      expect(menuItems[0].textContent).toContain("菜单1");
      expect(menuItems[1].textContent).toContain("菜单2");
    });

    it("正确渲染分隔符", async () => {
      const menu: MenuItem[] = [
        { label: "菜单1" },
        { type: "divider" },
        { label: "菜单2" }
      ];

      wrapper = mount(Menu, {
        attachTo: document.body,
        props: { menu },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find("button").trigger("click");
      await nextTick();

      expect(document.querySelector(".x-menu-divider")).toBeTruthy();
    });

    it("正确渲染子菜单", async () => {
      const menu: MenuItem[] = [
        {
          label: "父菜单",
          children: [{ label: "子菜单1" }, { label: "子菜单2" }]
        }
      ];

      wrapper = mount(Menu, {
        attachTo: document.body,
        props: { menu },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find("button").trigger("click");
      await nextTick();

      const parentItem = document.querySelector(".x-menu-item");
      expect(parentItem?.textContent).toContain("父菜单");
      expect(parentItem?.querySelector(".x-menu-item__arrow")).toBeTruthy();
    });
  });

  // 功能测试
  describe("功能", () => {
    it("点击菜单项触发事件", async () => {
      const onSelect = vi.fn();
      const menu: MenuItem[] = [
        {
          label: "测试菜单",
          action: () => {}
        }
      ];

      wrapper = mount(Menu, {
        attachTo: document.body,
        props: {
          menu,
          onSelect
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find("button").trigger("click");
      await nextTick();

      await document
        .querySelector(".x-menu-item")
        ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledWith(menu[0]);
    });

    it("禁用状态下不可点击", async () => {
      const onSelect = vi.fn();
      const menu: MenuItem[] = [
        {
          label: "禁用菜单",
          disabled: true,
          action: () => {}
        }
      ];

      wrapper = mount(Menu, {
        attachTo: document.body,
        props: {
          menu,
          onSelect
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find("button").trigger("click");
      await nextTick();

      await document
        .querySelector(".x-menu-item")
        ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(onSelect).not.toHaveBeenCalled();
    });

    it("隐藏菜单项不显示", async () => {
      const menu: MenuItem[] = [
        {
          label: "显示菜单",
          action: () => {}
        },
        {
          label: "隐藏菜单",
          hidden: true,
          action: () => {}
        }
      ];

      wrapper = mount(Menu, {
        attachTo: document.body,
        props: { menu },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find("button").trigger("click");
      await nextTick();

      const menuItems = document.querySelectorAll(
        ".x-menu-item:not(.x-menu-item--hidden)"
      );
      expect(menuItems.length).toBe(1);
      expect(menuItems[0].textContent).toContain("显示菜单");
    });
  });

  // 属性测试
  describe("属性", () => {
    it("支持不同触发方式", async () => {
      wrapper = mount(Menu, {
        attachTo: document.body,
        props: {
          menu: [{ label: "测试" }],
          trigger: "contextmenu"
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      // 点击不应该显示菜单
      await wrapper.find("button").trigger("click");
      await nextTick();
      expect(document.querySelector(".x-menu")).toBeFalsy();

      // 右键点击应该显示菜单
      await wrapper.find("button").trigger("contextmenu");
      await nextTick();
      expect(document.querySelector(".x-menu")).toBeTruthy();
    });

    it("支持不同弹出位置", async () => {
      wrapper = mount(Menu, {
        attachTo: document.body,
        props: {
          menu: [{ label: "测试" }],
          placement: "right-start"
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find("button").trigger("click");
      await nextTick();

      expect(document.querySelector(".x-popup--right-start")).toBeTruthy();
    });
  });
});
