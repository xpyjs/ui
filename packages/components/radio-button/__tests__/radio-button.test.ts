import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import RadioButton from "../src/radio-button.vue";
import RadioButtonGroup from "../src/radio-button-group.vue";

describe("RadioButton 组件", () => {
  // 基础渲染测试
  describe("基础渲染", () => {
    it("正确渲染基础结构", () => {
      const wrapper = mount(RadioButton);
      expect(wrapper.classes()).toContain("x-radio-button");
      expect(wrapper.find(".x-radio-button__input").exists()).toBe(true);
      expect(wrapper.find(".x-radio-button__inner").exists()).toBe(true);
    });

    it("渲染插槽内容", () => {
      const wrapper = mount(RadioButton, {
        slots: {
          default: "选项1"
        }
      });
      expect(wrapper.find(".x-radio-button__inner").text()).toBe("选项1");
    });
  });

  // 状态测试
  describe("状态", () => {
    it("未选中状态", () => {
      const wrapper = mount(RadioButton, {
        props: {
          modelValue: "1",
          value: "2"
        }
      });
      expect(wrapper.classes()).not.toContain("x-radio-button--checked");
      expect(wrapper.find("input").element.checked).toBe(false);
    });

    it("选中状态", () => {
      const wrapper = mount(RadioButton, {
        props: {
          modelValue: "1",
          value: "1"
        }
      });
      expect(wrapper.classes()).toContain("x-radio-button--checked");
      expect(wrapper.find("input").element.checked).toBe(true);
    });

    it("禁用状态", () => {
      const wrapper = mount(RadioButton, {
        props: { disabled: true }
      });
      expect(wrapper.classes()).toContain("x-radio-button--disabled");
      expect(wrapper.find("input").element.disabled).toBe(true);
    });
  });

  // 交互测试
  describe("交互", () => {
    it("点击触发选中", async () => {
      const wrapper = mount(RadioButton, {
        props: {
          modelValue: "1",
          value: "2"
        }
      });

      await wrapper.find("input").setValue(true);

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")![0]).toEqual(["2"]);
      expect(wrapper.emitted("change")![0]).toEqual(["2"]);
    });

    it("禁用状态下不可点击", async () => {
      const wrapper = mount(RadioButton, {
        props: {
          modelValue: "1",
          value: "2",
          disabled: true
        }
      });

      await wrapper.find("input").setValue(true);

      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      expect(wrapper.emitted("change")).toBeFalsy();
    });
  });

  // 样式测试
  describe("样式", () => {
    it("支持不同尺寸", () => {
      const sizes = ["small", "medium", "large"] as const;
      sizes.forEach(size => {
        const wrapper = mount(RadioButton, { props: { size } });
        expect(wrapper.classes()).toContain(`x-radio-button--${size}`);
      });
    });

    it("支持不同类型", () => {
      const types = [
        "default",
        "primary",
        "success",
        "warning",
        "error"
      ] as const;
      types.forEach(type => {
        const wrapper = mount(RadioButton, { props: { type } });
        expect(wrapper.classes()).toContain(`x-radio-button--${type}`);
      });
    });
  });
});

// RadioButtonGroup 测试
describe("RadioButtonGroup 组件", () => {
  it("正确渲染基础结构", () => {
    const wrapper = mount(RadioButtonGroup);
    expect(wrapper.classes()).toContain("x-radio-button-group");
  });

  it("可以控制子按钮状态", async () => {
    const value = ref("1");
    const wrapper = mount({
      components: { RadioButtonGroup, RadioButton },
      template: `
        <RadioButtonGroup v-model="value">
          <RadioButton value="1">选项1</RadioButton>
          <RadioButton value="2">选项2</RadioButton>
        </RadioButtonGroup>
      `,
      setup() {
        return { value };
      }
    });

    const buttons = wrapper.findAllComponents(RadioButton);
    expect(buttons[0].classes()).toContain("x-radio-button--checked");
    expect(buttons[1].classes()).not.toContain("x-radio-button--checked");

    await buttons[1].find("input").setValue(true);
    await nextTick();

    expect(buttons[0].classes()).not.toContain("x-radio-button--checked");
    expect(buttons[1].classes()).toContain("x-radio-button--checked");
    expect(value.value).toBe("2");
  });

  it("可以统一设置尺寸", () => {
    const wrapper = mount({
      components: { RadioButtonGroup, RadioButton },
      template: `
        <RadioButtonGroup size="small">
          <RadioButton value="1">选项1</RadioButton>
          <RadioButton value="2">选项2</RadioButton>
        </RadioButtonGroup>
      `
    });

    const buttons = wrapper.findAllComponents(RadioButton);
    buttons.forEach(button => {
      expect(button.classes()).toContain("x-radio-button--small");
    });
  });

  it("可以统一设置类型", () => {
    const wrapper = mount({
      components: { RadioButtonGroup, RadioButton },
      template: `
        <RadioButtonGroup type="primary">
          <RadioButton value="1">选项1</RadioButton>
          <RadioButton value="2">选项2</RadioButton>
        </RadioButtonGroup>
      `
    });

    const buttons = wrapper.findAllComponents(RadioButton);
    buttons.forEach(button => {
      expect(button.classes()).toContain("x-radio-button--primary");
    });
  });

  it("可以统一禁用", () => {
    const wrapper = mount({
      components: { RadioButtonGroup, RadioButton },
      template: `
        <RadioButtonGroup disabled>
          <RadioButton value="1">选项1</RadioButton>
          <RadioButton value="2">选项2</RadioButton>
        </RadioButtonGroup>
      `
    });

    expect(wrapper.classes()).toContain("x-radio-button-group--disabled");
    const buttons = wrapper.findAllComponents(RadioButton);
    buttons.forEach(button => {
      expect(button.classes()).toContain("x-radio-button--disabled");
    });
  });
});
