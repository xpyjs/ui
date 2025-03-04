import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import Radio from "../src/radio.vue";

describe("Radio 组件", () => {
  // 基础渲染测试
  describe("基础渲染", () => {
    it("正确渲染基础结构", () => {
      const wrapper = mount(Radio);
      expect(wrapper.classes()).toContain("x-radio");
      expect(wrapper.find(".x-radio__input").exists()).toBe(true);
      expect(wrapper.find(".x-radio__inner").exists()).toBe(true);
    });

    it("渲染标签内容", () => {
      const wrapper = mount(Radio, {
        props: { label: "选项1" }
      });
      expect(wrapper.find(".x-radio__label").text()).toBe("选项1");
    });

    it("优先使用插槽内容", () => {
      const wrapper = mount(Radio, {
        props: { label: "选项1" },
        slots: { default: "插槽内容" }
      });
      expect(wrapper.find(".x-radio__label").text()).toBe("插槽内容");
    });
  });

  // 状态测试
  describe("状态", () => {
    it("未选中状态", () => {
      const wrapper = mount(Radio, {
        props: {
          modelValue: "1",
          value: "2"
        }
      });
      expect(wrapper.classes()).not.toContain("x-radio--checked");
      expect(wrapper.find("input").element.checked).toBe(false);
    });

    it("选中状态", () => {
      const wrapper = mount(Radio, {
        props: {
          modelValue: "1",
          value: "1"
        }
      });
      expect(wrapper.classes()).toContain("x-radio--checked");
      expect(wrapper.find("input").element.checked).toBe(true);
    });

    it("禁用状态", () => {
      const wrapper = mount(Radio, {
        props: { disabled: true }
      });
      expect(wrapper.classes()).toContain("x-radio--disabled");
      expect(wrapper.find("input").element.disabled).toBe(true);
    });
  });

  // 交互测试
  describe("交互", () => {
    it("点击触发选中", async () => {
      const wrapper = mount(Radio, {
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
      const wrapper = mount(Radio, {
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
        const wrapper = mount(Radio, { props: { size } });
        expect(wrapper.classes()).toContain(`x-radio--${size}`);
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
        const wrapper = mount(Radio, { props: { type } });
        expect(wrapper.classes()).toContain(`x-radio--${type}`);
      });
    });
  });

  // 分组测试
  describe("分组", () => {
    it("同一组内互斥选择", async () => {
      const modelValue = ref("1");
      const wrapper = mount({
        components: { Radio },
        template: `
          <div>
            <Radio v-model="value" value="1" />
            <Radio v-model="value" value="2" />
          </div>
        `,
        setup() {
          return { value: modelValue };
        }
      });

      const radios = wrapper.findAllComponents(Radio);

      // 初始状态
      expect(radios[0].classes()).toContain("x-radio--checked");
      expect(radios[1].classes()).not.toContain("x-radio--checked");

      // 点击第二个
      await radios[1].find("input").setValue(true);
      await nextTick();

      // 检查状态变化
      expect(radios[0].classes()).not.toContain("x-radio--checked");
      expect(radios[1].classes()).toContain("x-radio--checked");
      expect(modelValue.value).toBe("2");
    });
  });

  // 可访问性测试
  describe("可访问性", () => {
    it("正确设置 input 属性", () => {
      const wrapper = mount(Radio, {
        props: {
          modelValue: "1",
          value: "1",
          disabled: true
        }
      });

      const input = wrapper.find("input").element;
      expect(input.type).toBe("radio");
      expect(input.checked).toBe(true);
      expect(input.disabled).toBe(true);
    });
  });
});
