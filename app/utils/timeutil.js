
// 根据时间戳格式化时间为**分钟前，**天前这种格式
function getFormattedTime(timestamp) {
  let curTime = Date.parse(new Date()) / 1000;
  let delta = curTime - timestamp;
  const hour = 60 * 60;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 12 * month;
  if (delta < hour) {
    // 显示多少分钟前
    let n = parseInt(delta / 60);
    if (n == 0) {
      return "刚刚";
    }
    return n + '分钟前';
  } else if (delta >= hour && delta < day) {
    return parseInt(delta / hour) + '小时前';
  } else if (delta >= day && delta < month) {
    return parseInt(delta / day) + '天前';
  } else if (delta >= month && delta < year) {
    return parseInt(delta / month) + '个月前';
  }
}

module.exports = {
  getFormattedTime: getFormattedTime
}
