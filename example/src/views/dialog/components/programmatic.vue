<template>
  <x-button @click="showDialog">打开对话框</x-button>
</template>

<script setup lang="ts">
import { defineComponent, getCurrentInstance, h } from "vue";
import { useDialog, XButton, XDialog } from "../../../../../packages";

// const { dialog } = useDialog();
const { proxy } = getCurrentInstance()!;
const showDialog = () => {
  proxy
    ?.$dialog(
      defineComponent({
        setup(props: any, { emit }) {
          const handleConfirm = () => {
            // 确认时可以传递任何值
            emit("confirm", { status: "success", data: "some data" });
          };

          const handleCancel = () => {
            // 取消时可以传递原因
            emit("cancel", "user cancelled");
          };

          return () =>
            h(
              XDialog,
              {
                title: "命令式对话框"
              },
              {
                default: () => [
                  h("p", "这是一个通过命令式创建的对话框"),
                  h("div", { style: "text-align: right; margin-top: 20px" }, [
                    h(
                      XButton,
                      {
                        onClick: handleCancel,
                        style: "margin-right: 8px"
                      },
                      () => "取消"
                    ),
                    h(
                      XButton,
                      {
                        type: "primary",
                        onClick: handleConfirm
                      },
                      () => "确认"
                    )
                  ])
                ]
              }
            );
        }
      }),
      {
        title: "命令式对话框",
        width: "500px",
        showFooter: false
      }
    )
    .then(result => {
      console.log("对话框确认:", result);
    })
    .catch(reason => {
      console.log("对话框取消/关闭:", reason);
    });
};
</script>
