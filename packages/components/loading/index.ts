import { withInstall } from "../../utils/install";
import Loading from "./src/loading.vue";
import type { LoadingProps } from "./src/props";
import { useLoading } from "./src/hooks/useLoading";
import "./src/style";

export const XLoading = withInstall<LoadingProps>(Loading);

// 导出组件实例类型
export type LoadingInstance = InstanceType<typeof Loading>;

// 导出 Props 类型
export type { LoadingProps };

// 导出服务
export { useLoading };

// 默认导出
export default XLoading;
