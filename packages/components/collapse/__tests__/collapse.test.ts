import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Collapse from "../src/collapse.vue";
import CollapseGroup from "../src/collapse-group.vue";

describe("Collapse 组件", () => {
  // 基础渲染测试
  describe("基础渲染", () => {
    it("正确渲染基础结构", () => {
      const wrapper = mount(Collapse);
      expect(wrapper.classes()).toContain("x-collapse");
      expect(wrapper.find(".x-collapse__trigger").exists()).toBe(true);
      expect(wrapper.find(".x-collapse__wrapper").exists()).toBe(true);
    });

    it("正确渲染标题", () => {
      const wrapper = mount(Collapse, {
        props: {
          label: "测试标题"
        }
      });
      expect(wrapper.find(".x-collapse__trigger-label").text()).toBe(
        "测试标题"
      );
    });

    it("正确渲染自定义触发器", () => {
      const wrapper = mount(Collapse, {
        slots: {
          trigger: '<div class="custom-trigger">自定义触发器</div>'
        }
      });
      expect(wrapper.find(".custom-trigger").exists()).toBe(true);
      expect(wrapper.find(".custom-trigger").text()).toBe("自定义触发器");
    });

    it("正确渲染内容插槽", () => {
      const wrapper = mount(Collapse, {
        slots: {
          default: '<div class="test-content">测试内容</div>'
        }
      });
      expect(wrapper.find(".test-content").exists()).toBe(true);
    });
  });

  // 功能测试
  describe("功能测试", () => {
    it("点击触发器切换展开状态", async () => {
      const wrapper = mount(Collapse);
      const trigger = wrapper.find(".x-collapse__trigger");

      await trigger.trigger("click");
      expect(wrapper.emitted("update:visible")).toBeTruthy();
      expect(wrapper.emitted("change")).toBeTruthy();
      expect(wrapper.emitted("update:visible")?.[0]).toEqual([true]);
    });

    it("禁用状态下点击无效", async () => {
      const wrapper = mount(Collapse, {
        props: {
          disabled: true
        }
      });
      const trigger = wrapper.find(".x-collapse__trigger");

      await trigger.trigger("click");
      expect(wrapper.emitted("update:visible")).toBeFalsy();
      expect(wrapper.emitted("change")).toBeFalsy();
    });

    it("正确响应 visible 属性变化", async () => {
      const wrapper = mount(Collapse, {
        props: {
          visible: false
        }
      });

      expect(wrapper.classes()).not.toContain("x-collapse--expanded");

      await wrapper.setProps({ visible: true });
      expect(wrapper.classes()).toContain("x-collapse--expanded");
    });

    it("正确响应 direction 属性", async () => {
      const wrapper = mount(Collapse, {
        props: {
          direction: "horizontal"
        }
      });

      expect(wrapper.classes()).toContain("x-collapse--horizontal");

      await wrapper.setProps({ direction: "vertical" });
      expect(wrapper.classes()).toContain("x-collapse--vertical");
    });
  });
});

describe("CollapseGroup 组件", () => {
  // 基础渲染测试
  describe("基础渲染", () => {
    it("正确渲染基础结构", () => {
      const wrapper = mount(CollapseGroup);
      expect(wrapper.classes()).toContain("x-collapse-group");
    });

    it("正确渲染子面板", () => {
      const wrapper = mount(CollapseGroup, {
        slots: {
          default: [
            '<x-collapse name="1">内容1</x-collapse>',
            '<x-collapse name="2">内容2</x-collapse>'
          ]
        },
        global: {
          stubs: {
            "x-collapse": Collapse
          }
        }
      });
      expect(wrapper.findAllComponents(Collapse)).toHaveLength(2);
    });
  });

  // 功能测试
  describe("功能测试", () => {
    it("手风琴模式下只能展开一个面板", async () => {
      const wrapper = mount(CollapseGroup, {
        props: {
          accordion: true,
          active: ""
        },
        slots: {
          default: [
            '<x-collapse name="1">内容1</x-collapse>',
            '<x-collapse name="2">内容2</x-collapse>'
          ]
        },
        global: {
          stubs: {
            "x-collapse": Collapse
          }
        }
      });

      const panels = wrapper.findAllComponents(Collapse);

      // 点击第一个面板
      await panels[0].find(".x-collapse__trigger").trigger("click");
      expect(wrapper.emitted("update:active")?.[0]).toEqual(["1"]);
      // 更新组件的 active 属性
      await wrapper.setProps({ active: "1" });

      // 点击第二个面板
      await panels[1].find(".x-collapse__trigger").trigger("click");
      expect(wrapper.emitted("update:active")?.[1]).toEqual(["2"]);
      // 更新组件的 active 属性
      await wrapper.setProps({ active: "2" });

      // 再次点击第二个面板关闭
      await panels[1].find(".x-collapse__trigger").trigger("click");
      expect(wrapper.emitted("update:active")?.[2]).toEqual([""]);
    });

    it("多选模式下可以同时展开多个面板", async () => {
      const wrapper = mount(CollapseGroup, {
        props: {
          modelValue: []
        },
        slots: {
          default: [
            '<x-collapse name="1">内容1</x-collapse>',
            '<x-collapse name="2">内容2</x-collapse>'
          ]
        },
        global: {
          stubs: {
            "x-collapse": Collapse
          }
        }
      });

      const panels = wrapper.findAllComponents(Collapse);

      // 点击第一个面板
      await panels[0].find(".x-collapse__trigger").trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["1"]]);
      await wrapper.setProps({ modelValue: ["1"] });

      // 点击第二个面板
      await panels[1].find(".x-collapse__trigger").trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[1]).toEqual([["1", "2"]]);
      await wrapper.setProps({ modelValue: ["1", "2"] });

      // 再次点击第一个面板关闭
      await panels[0].find(".x-collapse__trigger").trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[2]).toEqual([["2"]]);
    });
  });
});
