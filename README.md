# 文本表格 @x-drive/txt-table

提供在终端界面使用的文本表格，方便查看某些结构化的数据 (理论上浏览器也应该能用)
```txt
测试表格 - 181db33722d
+-------+------------+-----------+------------+-----------+-----------+
| title | col1       | col2      | col3       | col4      | col5      |
+-------+------------+-----------+------------+-----------+-----------+
| z     | w6!3j      | vojocyo   | gktr       | y4graxy   | r09f      |
| p6    | 4ht2clqn8  | -gb91l    | idhvr      | q5tvdv41c | g8t=hnj   |
| 6f    | ee79nw847  | 59pn6bdb  | 39kbpkue   | fbon0gf   | dpxu3jmc  |
| 2ip   | 0h6        | k3b3l506  | yd         | -myrg     | 40ri      |
| k     | r0lwv=76   | 1p-o!j566 | 7fxm=eizio | ilo68c1   | k-q-8!pl7 |
| jo54  | xzh0x6c=bl | uf5wymu9d | zjry-an    | px18j1h-  | w0t0q9    |
| a9cx  | 8hsxvwvl   | gp32zgkdk | 0n1yj1ur   | j!grjmsmb | 5=bo2y    |
| r     | iu3=zrcn   | t=0o-bd   | je00lr     | vtc61s5   | 32yp604   |
+-------+------------+-----------+------------+-----------+-----------+
```

## 开发
1. clone 项目到本地
1. 安装项目依赖
  ```shell
  yarn
  ```
1. 执行 `yarn dev` 开始开发
1. 执行 `yarn build` 编译模块生产模式

## 使用
1. 将本包添加到项目的开发依赖中 (以开发依赖为例)
1. 按需要使用不同的方法来显示数据

### 直接显示 `render`
调用模块 `render` 方法将直接将数据通过 console 输出到终端界面上
```ts
/**
 * 渲染一个表格到终端界面
 * @param data 表格数据
 * @param title 表格标题
 * @param styles 表格样式
 */
declare function render(data: TableData, title?: string, styles?: IStyles): void;
```
```js
const { render } = require("@x-drive/txt-table");
render(
    [
        {"title": "render-red", "color": "red", "value":999}
        ,{"title": "render-blue", "color": "blue", "value":888}
        ,{"title": "render-yellow", "color": "yellow", "value":777}
    ]
);
```

### 获取表格渲染数据 `table`
调用模块 `table` 方法获取表格渲染数据
```ts
/**
 * 生成一个表格
 * @param data 表格数据
 * @param title 表格标题
 * @param styles 表格样式
 */
declare function table(data: TableData, title?: string, styles?: IStyles): string;
```
```js
const { table } = require("@x-drive/txt-table");
const tableData = table(
    [
        {"title": "render-red", "color": "red", "value":999}
        ,{"title": "render-blue", "color": "blue", "value":888}
        ,{"title": "render-yellow", "color": "yellow", "value":777}
    ]
);
```

### 标题及样式
`table` 与 `render` 函数都接受标题及表格颜色设置
```ts
/**
 * 渲染一个表格到终端界面
 * @param data 表格数据
 * @param title 表格标题
 * @param styles 表格样式
 */
declare function render(data: TableData, title?: string, styles?: IStyles): void;
```
设置颜色需要 `colors` ，请手动将该模块加入到依赖中可直接修改 package.json 或执行 `npm i -D colors`

## 例子
`example` 目录提供了简单的使用例子

```bash
node ./example/table.js
```