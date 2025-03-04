import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "../src/input.vue";

describe("Input 组件", () => {
  // 渲染测试
  describe("渲染", () => {
    it("正确渲染默认输入框", () => {
      const wrapper = mount(Input);
      expect(wrapper.classes()).toContain("x-input");
      expect(wrapper.find(".x-input__inner").exists()).toBe(true);
      expect(wrapper.classes()).toContain("x-input--medium");
    });

    it("使用不同尺寸渲染输入框", () => {
      const sizes = ["small", "medium", "large"] as const;
      sizes.forEach(size => {
        const wrapper = mount(Input, { props: { size } });
        expect(wrapper.classes()).toContain(`x-input--${size}`);
      });
    });

    it("渲染带占位符的输入框", () => {
      const placeholder = "请输入";
      const wrapper = mount(Input, { props: { placeholder } });
      expect(wrapper.find("input").attributes("placeholder")).toBe(placeholder);
    });

    it("渲染不同类型的输入框", () => {
      const types = [
        "text",
        "password",
        "number",
        "tel",
        "email",
        "url"
      ] as const;
      types.forEach(type => {
        const wrapper = mount(Input, { props: { type } });
        expect(wrapper.find("input").attributes("type")).toBe(type);
      });
    });

    it("渲染带插槽的输入框", () => {
      const wrapper = mount(Input, {
        slots: {
          prefix: '<span class="prefix">prefix</span>',
          suffix: '<span class="suffix">suffix</span>',
          prepend: '<span class="prepend">prepend</span>',
          append: '<span class="append">append</span>'
        }
      });
      expect(wrapper.find(".x-input__prefix").exists()).toBe(true);
      expect(wrapper.find(".x-input__suffix").exists()).toBe(true);
      expect(wrapper.find(".x-input__prepend").exists()).toBe(true);
      expect(wrapper.find(".x-input__append").exists()).toBe(true);
    });
  });

  // 状态测试
  describe("状态", () => {
    it("处理禁用状态", () => {
      const wrapper = mount(Input, { props: { disabled: true } });
      expect(wrapper.classes()).toContain("x-input--disabled");
      expect(wrapper.find("input").attributes("disabled")).toBeDefined();
    });

    it("处理只读状态", () => {
      const wrapper = mount(Input, { props: { readonly: true } });
      expect(wrapper.classes()).toContain("x-input--readonly");
      expect(wrapper.find("input").attributes("readonly")).toBeDefined();
    });

    it("处理不同状态样式", () => {
      const statuses = ["success", "warning", "error"] as const;
      statuses.forEach(status => {
        const wrapper = mount(Input, { props: { status } });
        expect(wrapper.classes()).toContain(`x-input--${status}`);
      });
    });
  });

  // 功能测试
  describe("功能", () => {
    it("支持双向绑定", async () => {
      const wrapper = mount(Input, {
        props: {
          modelValue: "",
          "onUpdate:modelValue": (e: string | number) =>
            wrapper.setProps({ modelValue: String(e) })
        }
      });
      const input = wrapper.find("input");
      await input.setValue("test");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["test"]);
    });

    it("处理最大长度限制", async () => {
      const wrapper = mount(Input, {
        props: {
          maxLength: 5,
          modelValue: "",
          "onUpdate:modelValue": (e: string | number) =>
            wrapper.setProps({ modelValue: String(e) })
        }
      });
      const input = wrapper.find("input");
      expect(input.attributes("maxlength")).toBe("5");
      await input.setValue("123456");
      expect(
        wrapper.emitted<string>("update:modelValue")?.[0][0].length
      ).toBeLessThanOrEqual(5);
    });

    it("支持清除功能", async () => {
      const wrapper = mount(Input, {
        props: {
          clearable: true,
          modelValue: "test",
          "onUpdate:modelValue": (e: string | number) =>
            wrapper.setProps({ modelValue: String(e) })
        }
      });

      // 显示清除按钮
      expect(wrapper.find(".x-input__clear").exists()).toBe(true);

      // 点击清除按钮
      await wrapper.find(".x-input__clear").trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([""]);
      expect(wrapper.emitted("clear")).toBeTruthy();
    });
  });

  // 事件测试
  describe("事件", () => {
    it("触发 focus 事件", async () => {
      const wrapper = mount(Input);
      await wrapper.find("input").trigger("focus");
      expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("触发 blur 事件", async () => {
      const wrapper = mount(Input);
      await wrapper.find("input").trigger("blur");
      expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("触发 input 事件", async () => {
      const wrapper = mount(Input);
      await wrapper.find("input").setValue("test");
      expect(wrapper.emitted("input")?.[0][0]).toBe("test");
    });

    it("触发 change 事件", async () => {
      const wrapper = mount(Input);
      await wrapper.find("input").setValue("test");
      await wrapper.find("input").trigger("change");
      expect(wrapper.emitted("change")?.[0][0]).toBe("test");
    });

    it("禁用状态下不触发事件", async () => {
      const wrapper = mount(Input, { props: { disabled: true } });
      const input = wrapper.find("input");

      await input.trigger("focus");
      await input.trigger("input");
      await input.trigger("change");
      await input.trigger("blur");

      expect(wrapper.emitted("focus")).toBeFalsy();
      expect(wrapper.emitted("input")).toBeFalsy();
      expect(wrapper.emitted("change")).toBeFalsy();
      expect(wrapper.emitted("blur")).toBeFalsy();
    });
  });
});
