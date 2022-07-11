import { isArray, isUndefined } from "@x-drive/utils";
import type * as Colors from "colors/safe";

/**基础数据类型 */
type CommonVal = string | boolean | number;
/**基础 Json 类型 */
type CommonJson = Record<string, CommonVal | CommonArray>;
/**基础数组 */
type CommonArray = Array<CommonVal | CommonArray>;
/**表格输入数据类型 */
type InputDataItemValue = string | boolean | number | CommonArray | CommonJson;
/**表格行数据类型 */
interface InputDataItem {
    [key: string]: InputDataItemValue;
}
/**表格数据类型 */
type TableData = InputDataItem[];
/**每列长度数据 */
type ColsData = Record<string, number>;

/**支持的颜色类型 */
type ColorsType = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey";

/**表格样式 */
interface IStyles {
    /**标题 */
    $title?: ColorsType;

    /**其他列名 */
    [col: string]: ColorsType;
}

/**颜色样式渲染模块 */
var safeColor: typeof Colors;

/**尝试获取带样式的文本 */
function getTxtIfHasStyle(txt: string, style: ColorsType) {
    if (style) {
        if (isUndefined(safeColor)) {
            try {
                safeColor = require("colors/safe");
            } catch (e) {
                console.log("🥲 找不到 colors, 请手动安装 colors 到项目中\n   npm i -D colors");
                return txt;
            }
        }
        return safeColor[style](txt);
    }
    return txt;
}

/**
 * 填充列，保持列宽并显示列样式
 * @param val 原始数据
 * @param width 列宽
 * @param style 列样式
 */
function padding(val: InputDataItemValue, width: number, style: ColorsType) {
    var txt = `${val}`;
    var pad = "";
    while (pad.length < width - txt.length) {
        pad += " ";
    }
    return ` ${getTxtIfHasStyle(txt, style)}${pad}`;
}

/**计算列宽 */
function calc(data: TableData) {
    const map: ColsData = {};
    if (isArray(data)) {
        data.forEach(col => {
            Object.keys(col).forEach(key => {
                const len = JSON.stringify(col[key]).length;
                if (isUndefined(map[key])) {
                    map[key] = Math.max(len, key.length + 1);
                } else {
                    map[key] = Math.max(
                        map[key]
                        , len - 1
                    );
                }
            });
        });
    }
    return map;
}

/**生成行显示数据 */
function row(data: InputDataItem, cols: ColsData, styles?: IStyles) {
    const chars: string[] = [];
    if (!data) {
        chars.push("+");
        Object.keys(cols).forEach(key => {
            const colWidth = cols[key];
            for (let i = 0; i < colWidth + 1; i++) {
                chars.push("-");
            }
            chars.push("+");
        });
    } else {
        chars.push("|");
        Object.keys(data).forEach(key => {
            chars.push(
                padding(data[key], cols[key], styles[key])
            );
            chars.push("|");
        });
    }
    return chars.join("");
}

/**
 * 生成一个表格
 * @param data 表格数据
 * @param title 表格标题
 * @param styles 表格样式
 */
function table(data: TableData, title: string = "", styles: IStyles = {}) {
    const Cols = calc(data);
    const border = row(null, Cols);
    const table: string[] = [
        border
        , row(
            Object.keys(Cols)
                .reduce(
                    (head, key) => (head[key] = key, head)
                    , Object.create(null)
                )
            , Cols
            , styles
        )
        , border
    ];
    data.forEach(dat => {
        table.push(
            row(dat, Cols, styles)
        );
    });
    table.push(border);
    var txt = table.join("\n");
    if (title) {
        txt = `${getTxtIfHasStyle(title, styles["$title"])}\n${txt}`;
    }
    return txt;
}
export { table }

/**
 * 渲染一个表格到终端界面
 * @param data 表格数据
 * @param title 表格标题
 * @param styles 表格样式
 */
function render(data: TableData, title: string = "", styles: IStyles = {}) {
    console.log(
        table(data, title, styles)
    );
}
export { render }