import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import ColorPicker from "../src/color-picker.vue";
import { formatColor, parseColor } from "../../../utils/color";

describe("ColorPicker 组件", () => {
  // 渲染测试
  describe("渲染", () => {
    it("正确渲染默认颜色选择器", () => {
      const wrapper = mount(ColorPicker);
      expect(wrapper.classes()).toContain("x-color-picker");
    });

    it("使用不同尺寸渲染", () => {
      const sizes = ["small", "medium", "large"] as const;
      sizes.forEach(size => {
        const wrapper = mount(ColorPicker, { props: { size } });
        expect(wrapper.find(".x-color-picker__trigger").classes()).toContain(
          `x-color-picker__trigger--${size}`
        );
      });
    });

    it("内联模式渲染", () => {
      const wrapper = mount(ColorPicker, {
        props: {
          inline: true
        }
      });
      expect(wrapper.classes()).toContain("x-color-picker--inline");
    });
  });

  // 功能测试
  describe("功能", () => {
    it("正确显示预览颜色", async () => {
      const color = "#ff0000";
      const wrapper = mount(ColorPicker, {
        props: {
          modelValue: color
        }
      });

      const preview = wrapper.find(".x-color-picker__preview");
      expect(preview.attributes("style")).toContain(
        `background-color: ${formatColor(parseColor(color), "rgb")}`
      );
    });

    it("支持透明度选择", async () => {
      const wrapper = mount(ColorPicker, {
        props: {
          modelValue: "#ff0000",
          showAlpha: true,
          inline: true
        }
      });

      const alphaSlider = wrapper.find(".x-alpha-slider");
      expect(alphaSlider.exists()).toBe(true);
    });

    it("支持不同颜色格式", async () => {
      const color = "#ff0000";
      const wrapper = mount(ColorPicker, {
        props: {
          modelValue: color,
          format: "rgb"
        }
      });

      const rgb = parseColor(color);
      await wrapper.find(".x-color-picker__trigger").trigger("click");
      await nextTick();

      expect(wrapper.emitted("update:modelValue")?.[0][0]).toMatch(
        /^rgb\(\d+,\s*\d+,\s*\d+\)$/
      );
    });
  });

  // 事件测试
  describe("事件", () => {
    it("触发 change 事件", async () => {
      const wrapper = mount(ColorPicker);
      const color = "#ff0000";

      await wrapper.setProps({ modelValue: color });
      expect(wrapper.emitted("change")?.[0]).toEqual([color]);
    });

    it("颜色面板选择触发更新", async () => {
      const wrapper = mount(ColorPicker, {
        props: {
          modelValue: "#ff0000",
          inline: true
        }
      });

      const panel = wrapper.find(".x-color-panel-hsv");
      await panel.trigger("mousedown", {
        clientX: 100,
        clientY: 100
      });

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });
  });
});
