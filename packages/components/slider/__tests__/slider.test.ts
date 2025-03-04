import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Slider from "../src/slider.vue";

describe("Slider 滑块", () => {
  // 基础功能测试
  describe("基础功能", () => {
    it("创建", () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: 0
        }
      });
      expect(wrapper.classes()).toContain("x-slider");
    });

    it("支持单值模式", async () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: 50,
          step: 10
        }
      });

      // 检查按钮位置
      const button = wrapper.find(".x-slider__button-wrapper");
      expect(button.attributes("style")).toContain("left: 50%");

      // 检查选中区域
      const bar = wrapper.find(".x-slider__bar");
      expect(bar.attributes("style")).toContain("width: 50%");
    });

    it("支持区间值模式", async () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: [20, 60],
          step: 10
        }
      });

      // 检查两个按钮是否存在
      const buttons = wrapper.findAll(".x-slider__button-wrapper");
      expect(buttons.length).toBe(2);

      // 检查按钮位置
      expect(buttons[0].attributes("style")).toContain("left: 20%");
      expect(buttons[1].attributes("style")).toContain("left: 60%");

      // 检查选中区域
      const bar = wrapper.find(".x-slider__bar");
      expect(bar.attributes("style")).toContain("left: 20%");
      expect(bar.attributes("style")).toContain("width: 40%");
    });
  });

  // 功能特性测试
  describe("功能特性", () => {
    it("步进按钮仅在单值模式下可用", async () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: 50,
          showButtons: true,
          step: 10
        }
      });

      expect(wrapper.find(".x-slider__increase").exists()).toBe(true);
      expect(wrapper.find(".x-slider__decrease").exists()).toBe(true);

      await wrapper.setProps({ modelValue: [20, 60] });
      expect(wrapper.find(".x-slider__increase").exists()).toBe(false);
      expect(wrapper.find(".x-slider__decrease").exists()).toBe(false);
    });

    it("区间值自动排序", async () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: [50, 20],
          step: 10
        }
      });

      // 值应该自动排序
      await nextTick();
      expect(wrapper.vm.normalizedValue).toEqual([20, 50]);
    });

    it("支持垂直方向", () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: [20, 60],
          vertical: true
        }
      });

      const buttons = wrapper.findAll(".x-slider__button-wrapper");
      expect(buttons[0].attributes("style")).toContain("bottom: 20%");
      expect(buttons[1].attributes("style")).toContain("bottom: 60%");
    });

    it("支持刻度显示", () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: 50,
          showTicks: true,
          step: 10
        }
      });

      const ticks = wrapper.findAll(".x-slider__tick");
      expect(ticks.length).toBe(11); // 0-100,步长10,共11个刻度
    });

    it("支持禁用状态", () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: 50,
          disabled: true
        }
      });

      expect(wrapper.classes()).toContain("x-slider--disabled");
    });
  });

  // 事件测试
  describe("事件", () => {
    it("拖拽结束时触发 drag-end 事件", async () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: 50
        }
      });

      const button = wrapper.find(".x-slider__button-wrapper");
      await button.trigger("mousedown");
      document.dispatchEvent(new MouseEvent("mouseup"));

      expect(wrapper.emitted()["drag-end"]).toBeTruthy();
    });

    it("值变化时触发相应事件", async () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: 50,
          step: 10
        }
      });

      // 模拟点击事件的位置信息
      await wrapper.find(".x-slider__track").trigger("click", {
        clientX: 100, // 模拟点击位置
        getBoundingClientRect: () => ({
          left: 0,
          width: 200,
          // 其他必要的属性
          right: 200,
          top: 0,
          bottom: 0,
          height: 0,
          x: 0,
          y: 0,
          toJSON: () => {}
        })
      });

      expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
      expect(wrapper.emitted()["input"]).toBeTruthy();
      expect(wrapper.emitted()["change"]).toBeTruthy();
    });
  });

  // 样式特性测试
  describe("样式特性", () => {
    it("支持不同尺寸", () => {
      const sizes = ["small", "medium", "large"] as const;
      sizes.forEach(size => {
        const wrapper = mount(Slider, {
          props: {
            modelValue: 0,
            size
          }
        });
        expect(wrapper.classes()).toContain(`x-slider--${size}`);
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
        const wrapper = mount(Slider, {
          props: {
            modelValue: 0,
            type
          }
        });
        expect(wrapper.classes()).toContain(`x-slider--${type}`);
      });
    });

    it("显示数值", () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: 50,
          showValue: true
        }
      });

      expect(wrapper.find(".x-slider__value").exists()).toBe(true);
      expect(wrapper.find(".x-slider__value").text()).toBe("50");
    });
  });

  // 插槽测试
  describe("插槽", () => {
    it("自定义按钮", () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: 50
        },
        slots: {
          button: '<div class="custom-button">Custom</div>'
        }
      });

      expect(wrapper.find(".custom-button").exists()).toBe(true);
      expect(wrapper.find(".custom-button").text()).toBe("Custom");
    });

    it("自定义数值显示", () => {
      const wrapper = mount(Slider, {
        props: {
          modelValue: 50,
          showValue: true
        },
        slots: {
          value: '<div class="custom-value">{{ value }}%</div>'
        }
      });

      expect(wrapper.find(".custom-value").exists()).toBe(true);
      expect(wrapper.find(".custom-value").text()).toBe("50%");
    });
  });
});
