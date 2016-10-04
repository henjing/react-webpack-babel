export default function (string) {
    var length = string.length;
    var single;
    var strLength = 0;
    for ( var i = 0; i < length; i++) {
        single = string.charAt(i);
        if (escape(single).length > 4) {
            strLength++;
        } else {
            return false;
        }
    }
    return strLength;
}

// 仅统计中文字符

// 毫秒数转成日期
export function milisecToDate(miliseconds) {
    return (new Date(miliseconds * 1000)).toLocaleDateString()
}

