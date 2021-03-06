export function formatTime(timestamp) {
  // 单位 ms
  let second = 1000;
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;

  let now = Date.now();
  timestamp = new Date(timestamp);
  let diffValue = now - timestamp;

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
    return "刚刚";
  }

  // 计算差异时间的量级
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let secondC = diffValue / second;

  // 数值补0方法
  let zero = function(value) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };

  // 使用
  if (monthC > 12) {
    // 超过1年，直接显示年月日
    let date = new Date(timestamp);
    return (
      date.getFullYear() +
      "年" +
      zero(date.getMonth() + 1) +
      "月" +
      zero(date.getDate()) +
      "日"
    );
  } else if (monthC >= 1) {
    return parseInt(monthC) + "个月前";
  } else if (weekC >= 1) {
    return parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    return parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    return parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    return parseInt(minC) + "分钟前";
  } else if (secondC >= 1) {
    return parseInt(secondC) + "秒前";
  } else {
    return "刚刚";
  }
}

export function test() {
  alert('test')
}