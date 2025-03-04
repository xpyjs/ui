import { afterAll, beforeAll, vi } from "vitest";

// 模拟 ResizeObserver
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

// 模拟 MutationObserver
class MutationObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}

// 在测试前设置全局模拟
beforeAll(() => {
  global.ResizeObserver = ResizeObserverMock;
  global.MutationObserver = MutationObserverMock;
});

// 在所有测试后恢复
afterAll(() => {
  // @ts-ignore
  global.ResizeObserver = undefined;
  // @ts-ignore
  global.MutationObserver = undefined;
});
