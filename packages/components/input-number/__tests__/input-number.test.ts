import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import InputNumber from "../src/input-number.vue";

describe("InputNumber 组件", () => {
  // 渲染测试
  describe("渲染", () => {
    it("正确渲染默认输入框", () => {
      const wrapper = mount(InputNumber);
      expect(wrapper.classes()).toContain("x-input-number");
    });

    it("使用不同尺寸渲染输入框", () => {
      const sizes = ["small", "medium", "large"] as const;
      sizes.forEach(size => {
        const wrapper = mount(InputNumber, { props: { size } });
        expect(wrapper.find(".x-input").classes()).toContain(
          `x-input--${size}`
        );
      });
    });

    it("渲染带占位符的输入框", () => {
      const placeholder = "请输入数字";
      const wrapper = mount(InputNumber, { props: { placeholder } });
      expect(wrapper.find("input").attributes("placeholder")).toBe(placeholder);
    });
  });

  // 功能测试
  describe("功能", () => {
    it("输入数字正确更新值", async () => {
      const wrapper = mount(InputNumber);
      const input = wrapper.find("input");

      await input.setValue("123");
      await input.trigger("change");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([123]);
    });

    it("输入非数字不更新值", async () => {
      const wrapper = mount(InputNumber);
      const input = wrapper.find("input");

      await input.setValue("abc");
      await input.trigger("change");
      expect(wrapper.emitted("update:modelValue")?.[0]).toBeFalsy();
    });

    it("限制最大最小值", async () => {
      const wrapper = mount(InputNumber, {
        props: {
          min: 0,
          max: 100
        }
      });
      const input = wrapper.find("input");

      await input.setValue("-10");
      await input.trigger("change");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([0]);

      await input.setValue("200");
      await input.trigger("change");
      expect(wrapper.emitted("update:modelValue")?.[1]).toEqual([100]);
    });

    it("精度控制", async () => {
      const wrapper = mount(InputNumber, {
        props: {
          precision: 2
        }
      });
      const input = wrapper.find("input");

      await input.setValue("1.234");
      await input.trigger("change");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([1.23]);
    });

    it("禁用状态", async () => {
      const wrapper = mount(InputNumber, {
        props: {
          disabled: true
        }
      });
      const input = wrapper.find("input");

      expect(input.attributes("disabled")).toBeDefined();
      await input.setValue("123");
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });

    it("只读状态", async () => {
      const wrapper = mount(InputNumber, {
        props: {
          readonly: true
        }
      });
      const input = wrapper.find("input");

      expect(input.attributes("readonly")).toBeDefined();
    });

    it("清除功能", async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 123,
          clearable: true
        }
      });

      await wrapper.find(".x-input__clear").trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([null]);
      expect(wrapper.emitted("clear")).toBeTruthy();
    });
  });

  // 事件测试
  describe("事件", () => {
    it("触发 focus 事件", async () => {
      const wrapper = mount(InputNumber);
      await wrapper.find("input").trigger("focus");
      expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("触发 blur 事件", async () => {
      const wrapper = mount(InputNumber);
      await wrapper.find("input").trigger("blur");
      expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("触发 change 事件", async () => {
      const wrapper = mount(InputNumber);
      const input = wrapper.find("input");

      await input.setValue("123");
      await input.trigger("change");
      expect(wrapper.emitted("change")?.[0]).toEqual([123, expect.any(Event)]);
    });
  });
});
