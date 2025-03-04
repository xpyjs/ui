import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { XCheckbox } from "../index";
import { XCheckboxGroup } from "../../checkbox-group";
import Checkbox from "../src/checkbox.vue";

describe("Checkbox 复选框", () => {
  // 基础功能测试
  describe("基础功能", () => {
    it("创建", () => {
      const wrapper = mount(XCheckbox);
      expect(wrapper.classes()).toContain("x-checkbox");
    });

    it("支持 v-model", async () => {
      const wrapper = mount(XCheckbox, {
        props: {
          modelValue: false
        }
      });

      await wrapper.find("input").setValue({ checked: true });
      await wrapper.find("input").trigger("change");
      expect(wrapper.emitted()["update:modelValue"][0]).toEqual([true]);

      await wrapper.setProps({ modelValue: true });
      expect(wrapper.classes()).toContain("x-checkbox--checked");
    });

    it("渲染文本内容", () => {
      const wrapper = mount(XCheckbox, {
        slots: {
          default: "Test"
        }
      });
      expect(wrapper.text()).toBe("Test");
    });
  });

  // 禁用状态测试
  describe("禁用状态", () => {
    it("禁用时不可操作", async () => {
      const wrapper = mount(XCheckbox, {
        props: {
          modelValue: false,
          disabled: true,
          "onUpdate:modelValue": (value: boolean) =>
            wrapper.setProps({ modelValue: value })
        }
      });

      await wrapper.find("input").trigger("change");
      expect(wrapper.props("modelValue" as never)).toBe(false);
      expect(wrapper.classes()).toContain("x-checkbox--disabled");
    });
  });

  // 不确定状态测试
  describe("不确定状态", () => {
    it("显示不确定状态", () => {
      const wrapper = mount(XCheckbox, {
        props: {
          indeterminate: true
        }
      });
      expect(wrapper.classes()).toContain("x-checkbox--indeterminate");
    });
  });

  // 尺寸测试
  describe("尺寸", () => {
    const sizes = ["small", "medium", "large"] as const;

    sizes.forEach(size => {
      it(`尺寸 ${size}`, () => {
        const wrapper = mount(XCheckbox, {
          props: { size }
        });
        expect(wrapper.classes()).toContain(`x-checkbox--${size}`);
      });
    });
  });

  // 类型测试
  describe("类型", () => {
    const types = [
      "default",
      "primary",
      "success",
      "warning",
      "error"
    ] as const;

    types.forEach(type => {
      it(`类型 ${type}`, () => {
        const wrapper = mount(XCheckbox, {
          props: { type }
        });
        expect(wrapper.classes()).toContain(`x-checkbox--${type}`);
      });
    });
  });

  // 复选框组测试
  describe("复选框组", () => {
    it("组功能正常工作", async () => {
      const wrapper = mount({
        template: `
          <x-checkbox-group v-model="value">
            <x-checkbox value="1">1</x-checkbox>
            <x-checkbox value="2">2</x-checkbox>
          </x-checkbox-group>
        `,
        components: {
          XCheckboxGroup,
          XCheckbox
        },
        data() {
          return {
            value: ["1"]
          };
        }
      });

      const checkboxes = wrapper.findAllComponents(Checkbox);
      expect(checkboxes[0].classes()).toContain("x-checkbox--checked");
      expect(checkboxes[1].classes()).not.toContain("x-checkbox--checked");

      await checkboxes[1].find("input").setValue({ checked: true });
      await checkboxes[1].find("input").trigger("change");
      expect(wrapper.vm.value).toContain("2");
      expect(checkboxes[1].classes()).toContain("x-checkbox--checked");
    });

    it("同步组属性", async () => {
      const wrapper = mount({
        template: `
          <x-checkbox-group v-model="value" disabled size="small" type="primary">
            <x-checkbox value="1">1</x-checkbox>
          </x-checkbox-group>
        `,
        components: {
          XCheckboxGroup,
          XCheckbox
        },
        data() {
          return {
            value: []
          };
        }
      });

      const checkbox = wrapper.findComponent(Checkbox);
      expect(checkbox.classes()).toContain("x-checkbox--disabled");
      expect(checkbox.classes()).toContain("x-checkbox--small");
      expect(checkbox.classes()).toContain("x-checkbox--primary");
    });
  });

  // 全选功能测试
  describe("全选功能", () => {
    it("处理全选状态", async () => {
      const wrapper = mount({
        template: `
          <x-checkbox-group v-model="value" v-model:all="allChecked">
            <x-checkbox value="1">1</x-checkbox>
            <x-checkbox value="2">2</x-checkbox>
          </x-checkbox-group>
        `,
        components: {
          XCheckboxGroup,
          XCheckbox
        },
        data() {
          return {
            value: [],
            allChecked: false
          };
        }
      });

      // 初始状态：全不选
      expect(wrapper.vm.allChecked).toBe(false);

      // 选中一个：部分选中
      await wrapper.setData({ value: ["1"] });
      await nextTick();
      expect(wrapper.vm.allChecked).toBe(null);

      // 全选
      await wrapper.setData({ value: ["1", "2"] });
      await nextTick();
      expect(wrapper.vm.allChecked).toBe(true);

      // 通过 all 控制全选
      await wrapper.setData({ allChecked: false });
      await nextTick();
      expect(wrapper.vm.value).toEqual([]);
    });
  });

  // 自定义内容测试
  describe("自定义内容", () => {
    it("渲染自定义内容插槽", () => {
      const wrapper = mount(XCheckbox, {
        slots: {
          box: "Custom Box"
        }
      });
      expect(wrapper.find(".x-checkbox__inner--custom").exists()).toBe(true);
      expect(wrapper.find(".x-checkbox__inner--custom").text()).toBe(
        "Custom Box"
      );
    });
  });
});
