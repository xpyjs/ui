import { ref, watch } from "vue";

interface MessageElement extends HTMLElement {
  _position?: string | number;
}

class MessageManager {
  private static instance: MessageManager;
  private messages = ref<Record<string, MessageElement[]>>({});
  private gap = 16;
  private defaultOffset = 20;

  public static getInstance(): MessageManager {
    if (!MessageManager.instance) {
      MessageManager.instance = new MessageManager();
    }
    return MessageManager.instance;
  }

  private getPositionList(position?: string | number) {
    const _pos =
      (typeof position !== "string" ? "custom" : position) || "custom";
    if (
      !this.messages.value[_pos] ||
      !Array.isArray(this.messages.value[_pos])
    ) {
      this.messages.value[_pos] = [];
    }

    return this.messages.value[_pos];
  }

  public add(component?: MessageElement, position?: string | number) {
    if (!component) return;

    // 清理无效实例
    this.clear();

    // 保存位置信息
    component._position = position;

    // 添加新实例到对应分组
    const list = this.getPositionList(position);
    if (!list.includes(component)) {
      list.push(component);
    }
  }

  public getDistance(component?: MessageElement) {
    if (!component) return 0;

    const list = this.getPositionList(component._position);
    const index = list.indexOf(component);
    if (index < 1) return 0;

    return (
      this.defaultOffset +
      (index - 1) * this.gap +
      list.slice(0, index).reduce((acc, cur) => acc + cur.offsetHeight, 0)
    );
  }

  public remove(component?: MessageElement) {
    if (!component) return;

    const list = this.getPositionList(component._position);
    const index = list.indexOf(component);
    if (index !== -1) {
      list.splice(index, 1);
    }
  }

  private clear() {
    // 清理所有分组中的无效实例
    Object.keys(this.messages.value).forEach(key => {
      const list = this.messages.value[key as keyof typeof this.messages.value];
      this.messages.value[key as keyof typeof this.messages.value] =
        list.filter(el => document.body.contains(el));
    });
  }

  // 获取指定位置的消息数量
  public getCount(position?: string | number) {
    return this.getPositionList(position).length;
  }

  // 订阅消息列表变化
  public onChange(callback: () => void) {
    watch(
      () => ({
        ...this.messages.value
      }),
      callback,
      { deep: true }
    );
  }
}

// 全局保存消息实例
const MessageMap: Record<string, MessageManager> = {};
export function getMessageInstance(id: string) {
  if (!MessageMap[id]) {
    MessageMap[id] = MessageManager.getInstance();
  }

  return MessageMap[id];
}
