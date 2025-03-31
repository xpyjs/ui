# 样式基础

## 介绍

本项目中，使用了 SCSS 作为样式预处理器，默认已经提供了编译后的 css 版本，可以直接使用。

在全局使用时，只需要引入 `@xpyjs/x-ui/index.css` 即可。

## 变量

本项目采用了大量的 css 变量，这样可以方便的定制我们所需要的内容。

我们内置了各种 color、size、border、shadow 等变量，可以直接使用。

## 自定义样式

方法1：直接替换变量名

```scss
:root {
  --x-color-primary-500: #eca710;
}
```

方法2：使用@forward 替换 scss 中的变量（推荐）

```scss
@forward "../../packages/styles/vars.scss" with (
  $base-colors: (
    "primary": #eca710
  )
);

// 先使用 forward 替换变量，再使用 @use 替换变量名
@use "../../packages/styles/index.scss" as *;
```

在变量替换时，可以参考源码中 [vars.scss](https://github.com/xpyjs/ui/blob/main/packages/styles/vars.scss) 文件，根据文件中的格式和结构，根据需要进行替换就可以。

## 更多自定义内容

当然，我们还可以自定义更多样式，这就不属于 UI 的范围，而是属于项目的范围了。原则上，变量只要在使用前被定义过，就可以使用。
