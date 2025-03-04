import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Loading from "../src/loading.vue";

describe("Loading 组件", () => {
  // 基础渲染测试
  describe("基础渲染", () => {
    it("默认不可见", () => {
      const wrapper = mount(Loading);
      expect(wrapper.find(".x-loading").exists()).toBe(false);
    });

    it("可以通过 visible 控制显示", async () => {
      const wrapper = mount(Loading, {
        props: { visible: true }
      });
      expect(wrapper.find(".x-loading").exists()).toBe(true);

      await wrapper.setProps({ visible: false });
      expect(wrapper.find(".x-loading").exists()).toBe(false);
    });

    it("渲染不同类型的动画", () => {
      const types = ["spinner", "dots", "snake", "pulse", "wave"] as const;
      types.forEach(type => {
        const wrapper = mount(Loading, {
          props: { visible: true, type }
        });
        expect(wrapper.find(`.x-loading-animation--${type}`).exists()).toBe(
          true
        );
      });
    });

    it("渲染自定义图标", () => {
      const wrapper = mount(Loading, {
        props: {
          visible: true,
          icon: "test-icon"
        }
      });
      expect(wrapper.find(".x-icon").exists()).toBe(true);
    });

    it("渲染自定义文本", () => {
      const wrapper = mount(Loading, {
        props: {
          visible: true,
          text: "加载中..."
        }
      });
      expect(wrapper.find(".x-loading__text").text()).toBe("加载中...");
    });
  });

  // 遮罩层测试
  describe("遮罩层", () => {
    it("默认显示遮罩层", () => {
      const wrapper = mount(Loading, {
        props: { visible: true }
      });
      expect(wrapper.find(".x-loading__mask").exists()).toBe(true);
    });

    it("可以禁用遮罩层", () => {
      const wrapper = mount(Loading, {
        props: {
          visible: true,
          mask: false
        }
      });
      expect(wrapper.find(".x-loading__mask").exists()).toBe(false);
    });

    it("全屏模式下禁止滚动", async () => {
      const wrapper = mount(Loading, {
        props: {
          visible: true,
          fullscreen: true
        }
      });

      const mask = wrapper.find(".x-loading__mask");
      const preventDefault = vi.fn();
      await mask.trigger("wheel", {
        preventDefault
      });

      // 检查 preventDefault 是否被调用
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  // 样式定制测试
  describe("样式定制", () => {
    it("应用自定义图标样式", () => {
      const wrapper = mount(Loading, {
        props: {
          visible: true,
          icon: "test-icon",
          iconStyle: {
            fontSize: "24px",
            color: "red"
          }
        }
      });
      const icon = wrapper.find(".x-icon");
      expect(icon.attributes("style")).toContain("font-size: 24px");
      expect(icon.attributes("style")).toContain("color: red");
    });
  });

  // 插槽测试
  describe("插槽", () => {
    it("支持自定义图标插槽", () => {
      const wrapper = mount(Loading, {
        props: { visible: true },
        slots: {
          icon: '<div class="custom-icon">Custom Icon</div>'
        }
      });
      expect(wrapper.find(".custom-icon").exists()).toBe(true);
    });
  });
});
