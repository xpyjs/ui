const prefix = "[X-UI]";

/**
 * 系统警告
 */
export const warn = (component: string, ...messages: any[]) => {
  console.warn(`${prefix} ${component}:`, ...messages);
};

/**
 * 系统错误
 */
export const error = (component: string, ...messages: any[]) => {
  console.error(`${prefix} ${component}:`, ...messages);
};
