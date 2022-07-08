const { render } = require("../dist");
const { getTestData } = require("./data");

render([
    { "title": Date.now().toString(32), "color": "red", "value": 999 }
    , { "title": Date.now().toString(32), "color": "blue", "value": 888 }
    , { "title": Date.now().toString(32), "color": "yellow", "value": 777 }
]);
console.log("");

render(
    getTestData(8)
    , `测试表格 - ${Date.now().toString(16)}`
);
console.log("");

render(
    getTestData(9)
    , `带颜色测试表格 - ${Date.now().toString(16)}`
    , {
        "$title": "red"
        , "title": "yellow"
        , "col3": "blue"
    }
);