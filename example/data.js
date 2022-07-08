const { random } = require("@x-drive/utils");

const chars = "abcdefghijklmnopqrstuvwxyz1234567890=-!".split("");
function getTestTxt(min, max = 10) {
    var len = random(max, min);
    var txt = "";
    for (let i = 0; i < len; i++) {
        txt += chars[random(chars.length - 1, 0)];
    }
    return txt;
}

function getTextData(min) {
    return {
        "title": getTestTxt(1, 4)
        , "col1": getTestTxt(min)
        , "col2": getTestTxt(min)
        , "col3": getTestTxt(min)
        , "col4": getTestTxt(min)
        , "col5": getTestTxt(min)
    }
}

function getTestData(cols) {
    const testData = [];
    for (let i = 0; i < cols; i++) {
        testData.push(
            getTextData(
                random(
                    random(4, 12)
                    , 2
                )
            )
        );
    }
    return testData;
}

exports.getTestData = getTestData;
