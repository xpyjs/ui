import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Dialog from "../src/dialog.vue";

describe("Dialog 组件", () => {
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
    it("正确渲染基础对话框", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true,
          title: "测试标题"
        },
        slots: {
          default: "<div>对话框内容</div>"
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-dialog");

      // 检查标题
      expect(dialog?.querySelector(".x-dialog__title")?.textContent).toBe(
        "测试标题"
      );
      // 检查内容
      expect(dialog?.querySelector(".x-dialog__body")?.textContent).toBe(
        "对话框内容"
      );
      // 检查关闭按钮
      expect(dialog?.querySelector(".x-dialog__close")).toBeTruthy();
    });

    it("支持自定义宽度", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true,
          width: "600px"
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-dialog");
      expect(dialog?.attributes.getNamedItem("style")?.textContent).toContain(
        "width: 600px"
      );
    });

    it("支持全屏模式", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true,
          fullscreen: true
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-dialog");
      expect(dialog?.classList.contains("x-dialog--fullscreen")).toBe(true);
    });
  });

  // 属性测试
  describe("属性", () => {
    it("showClose 属性控制关闭按钮显示", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true,
          showClose: false
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-dialog");
      expect(dialog?.querySelector(".x-dialog__close")).toBeFalsy();
    });

    it("center 属性控制内容居中", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true,
          center: true
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-dialog");
      expect(dialog?.classList.contains("x-dialog--center")).toBe(true);
    });

    it("vertical 属性控制垂直对齐", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true,
          vertical: "top"
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-dialog");
      expect(dialog?.attributes.getNamedItem("style")?.textContent).toContain(
        "top: 0px"
      );
    });

    it("bodyHeight 属性控制内容区域高度", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true,
          bodyHeight: "300px"
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-dialog__body");
      expect(dialog?.attributes.getNamedItem("style")?.textContent).toContain(
        "height: 300px"
      );
    });
  });

  // 事件测试
  describe("事件", () => {
    it("正确显示/隐藏", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: false
        }
      });

      // 显示对话框
      await wrapper.setProps({ visible: true });
      await nextTick();

      let dialog = document.querySelector(".x-dialog");
      expect(dialog).toBeTruthy();

      // 隐藏对话框
      await wrapper.setProps({ visible: false });
      await nextTick();
      dialog = document.querySelector(".x-dialog");
      expect(dialog).toBeFalsy();
    });

    it("点击关闭按钮触发关闭", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-dialog");
      dialog
        ?.querySelector(".x-dialog__close")
        ?.dispatchEvent(new Event("click"));
      await nextTick();
      expect(wrapper.emitted("update:visible")?.[0]).toEqual([false]);
    });

    it("点击遮罩层关闭", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true,
          mask: true,
          maskClosable: true
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-modal");
      dialog?.dispatchEvent(new Event("click"));
      await nextTick();
      expect(wrapper.emitted("update:visible")?.[0]).toEqual([false]);
    });
  });

  // 插槽测试
  describe("插槽", () => {
    it("支持自定义标题插槽", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true
        },
        slots: {
          title: "<h1>自定义标题</h1>"
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-dialog");
      expect(dialog?.querySelector(".x-dialog__header h1")?.textContent).toBe(
        "自定义标题"
      );
    });

    it("支持自定义页脚插槽", async () => {
      wrapper = mount(Dialog, {
        attachTo: document.body,
        props: {
          visible: true,
          showFooter: true
        },
        slots: {
          footer: "<button>自定义按钮</button>"
        }
      });

      await nextTick();
      const dialog = document.querySelector(".x-dialog");
      expect(
        dialog?.querySelector(".x-dialog__footer button")?.textContent
      ).toBe("自定义按钮");
    });
  });
});
