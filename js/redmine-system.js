var status_map = {
  '新規': 'New',
  '進行中': 'In Progress',
  '解決': 'Solved',
  'フィードバック': 'Feedback',
  '終了': 'Closed',
  '却下': 'Dismissed'
}
var tracker_map = {
  'バグ': 'Bug',
  '機能': 'Function',
  'サポート': 'Support',
  'タスク': 'Task'
}
var priority_map = {
  '低め': 'low',
  '通常': 'nomal',
  '高め': 'height',
  '急いで': 'Urgent',
  '今すぐ': 'imediate'
}
var activity_map = {
  '設計作業': 'Design',
  '開発作業': 'Develop'
}
function translate() {
  $("td, i, option").each(function() {
    var value = $(this).text();
    if(status_map[value]) {
      $(this).text(status_map[value]);
    } else if(tracker_map[value]) {
      $(this).text(tracker_map[value]);
    } else if(priority_map[value]) {
      $(this).text(priority_map[value]);
    } else if(activity_map[value]) {
      $(this).text(activity_map[value]);
    }
  });
}
translate();

$(document).on("change", "select", function() {
  my_interval(translate, 500, 10);
});


function my_interval(func, time, count) {
  var time;
  var i = 0;
  function change() {
    func();
    i += 1;
    console.log(i);
    if(i > count) {
      clearInterval(time);
    }
  }
  time = setInterval(change, 500);
}