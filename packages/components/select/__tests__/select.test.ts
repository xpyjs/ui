import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Select from "../src/select.vue";
import { nextTick } from "vue";

describe("Select 组件", () => {
  // 基础数据
  const items = [
    { label: "选项1", value: "1" },
    { label: "选项2", value: "2" },
    { label: "选项3", value: "3" },
    { label: "选项4", value: "4" }
  ];

  // 渲染测试
  describe("渲染", () => {
    it("正确渲染默认选择器", () => {
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue: ""
        }
      });
      expect(wrapper.classes()).toContain("x-select");
      expect(wrapper.classes()).toContain("x-select--medium");
    });

    it("使用不同尺寸渲染选择器", () => {
      const sizes = ["small", "medium", "large"] as const;
      sizes.forEach(size => {
        const wrapper = mount(Select, {
          props: {
            items,
            modelValue: "",
            size
          }
        });
        expect(wrapper.classes()).toContain(`x-select--${size}`);
      });
    });

    it("渲染占位符文本", () => {
      const placeholder = "请选择内容";
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue: "",
          placeholder
        }
      });
      expect(wrapper.find("input").attributes("placeholder")).toBe(placeholder);
    });

    it("渲染自定义键名的选项", () => {
      const customItems = [
        { text: "自定义1", id: "1" },
        { text: "自定义2", id: "2" }
      ];
      const wrapper = mount(Select, {
        props: {
          items: customItems,
          modelValue: "",
          options: {
            label: "text",
            value: "id"
          }
        }
      });
      expect(wrapper.vm.getItemValue(customItems[0], "text")).toBe("自定义1");
    });
  });

  // 状态测试
  describe("状态", () => {
    it("处理禁用状态", () => {
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue: "",
          disabled: true
        }
      });
      expect(wrapper.classes()).toContain("x-select--disabled");
      expect(wrapper.find("input").attributes("disabled")).toBeDefined();
    });

    it("处理只读状态", () => {
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue: "",
          readonly: true
        }
      });
      expect(wrapper.classes()).toContain("x-select--readonly");
    });

    it("处理可清除状态", async () => {
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue: "1",
          clearable: true
        }
      });
      expect(wrapper.find(".x-select__clear").exists()).toBe(true);
    });
  });

  // 多选模式测试
  describe("多选模式", () => {
    it("渲染多选标签", () => {
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue: ["1", "2"],
          multiple: true,
          type: "tag"
        }
      });
      const tags = wrapper.findAll(".x-select--multiple-item");
      expect(tags.length).toBe(2);
    });

    it("渲染多选文本", () => {
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue: ["1", "2"],
          multiple: true
        }
      });
      expect(wrapper.text()).toContain("选项1, 选项2");
    });
  });

  // 事件测试
  describe("事件", () => {
    let wrapper: VueWrapper<InstanceType<typeof Select>>;

    beforeEach(() => {
      wrapper = mount(Select, {
        props: {
          items,
          modelValue: "",
          popupProps: {
            appendTo: null,
            transitionName: false
          }
        }
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("选择选项时触发 update:modelValue 事件", async () => {
      await wrapper.find(".x-popup-trigger").trigger("click");
      await nextTick();

      expect(wrapper.find(".x-popup").exists()).toBe(true);

      const firstOption = wrapper.find(".x-select-item");
      await firstOption.trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([items[0]]);
    });

    it("清除时触发 clear 事件", async () => {
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue: "1",
          clearable: true
        }
      });
      await wrapper.find(".x-select__clear").trigger("click");
      expect(wrapper.emitted("clear")).toBeTruthy();
    });

    it("禁用状态下不触发选择事件", async () => {
      expect(wrapper.find(".x-select--disabled").exists()).toBe(false);

      await wrapper.setProps({ disabled: true });
      expect(wrapper.find(".x-select--disabled").exists()).toBe(true);

      await wrapper.find(".x-popup-trigger").trigger("click");
      await nextTick();
      expect(wrapper.find(".x-popup").exists()).toBe(false);
    });

    it("选项禁用时不触发选择事件", async () => {
      const disabledItems = [{ label: "选项1", value: "1", disabled: true }];
      await wrapper.setProps({ items: disabledItems });

      await wrapper.find(".x-popup-trigger").trigger("click");
      await nextTick();
      expect(wrapper.find(".x-popup").exists()).toBe(true);

      await wrapper.find(".x-select-item").trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });

    it("多选事件", async () => {
      await wrapper.setProps({ modelValue: [] });

      await wrapper.find(".x-popup-trigger").trigger("click");
      await nextTick();
      expect(wrapper.find(".x-popup").exists()).toBe(true);

      wrapper.findAll(".x-select-item").forEach((item, i) => {
        if (i > 0 && i < 3) {
          item.trigger("click");
        }
      });

      expect(wrapper.emitted("update:modelValue")?.[0]).toStrictEqual([
        [
          { label: "选项2", value: "2" },
          { label: "选项3", value: "3" }
        ]
      ]);
    });
  });

  // 工具函数测试
  describe("工具函数", () => {
    it("正确获取选项值", () => {
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue: ""
        }
      });
      expect(wrapper.vm.getItemValue(items[0], "label")).toBe("选项1");
      expect(wrapper.vm.getItemValue(items[0], "value")).toBe("1");
    });

    it("检查选项是否选中", () => {
      const wrapper = mount(Select, {
        props: {
          items,
          modelValue: "1"
        }
      });
      expect(wrapper.vm.checkActive(items[0])).toBe(true);
      expect(wrapper.vm.checkActive(items[1])).toBe(false);
    });
  });
});
