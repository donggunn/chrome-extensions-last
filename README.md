# Chrome extension

Chrome là một trong những trình duyệt phổ biến nhất và được nhiều người dùng lựa chọn. Các extension cho Chrome ngày càng nhiều và đa dạng mang lại nhiều tiện ích cho người dùng. Vậy làm một extension cho Chrome có khó không?

Chrome extension là 1 gói phần mềm bao gồm một số file như HTML, CSS, JavaScript, Image … và được dùng như một công cụ cho trình duyệt Chrome. Để tạo một ứng dụng Chrome extension cũng vô cùng đơn giản, bạn chỉ cần biết một chút Html, Javascript như vậy là đủ. Nếu bạn chưa biết chút gì về Html, Javascript, Css cũng không phải quá lo lắng việc học chúng cũng rất dễ dàng.

## 1. Manifest file (manifest.json)

Đây là một file quan trọng và bắt buộc phải có cho mỗi Chrome extension. Nó được viết dưới dạng json, rất dễ đọc và dế chỉnh sửa. File này chỉ ra các thông tin về extension như name, version, description, … hay các thông tin khác như thông tin các file css, javascript nhúng vào trang web và phạm vi các trang web mà chúng nhúng vào.

Ví dụ:
```js
{
  "name": "Hello World!",
  "version": "1.0",
  "description": "My first Chrome extension.",
  "browser_action": {
    "default_icon": "images/icon.png",
    "default_popup": "html/popup.html"
  },
  "content_scripts": [
    {
      "matches": ["https://*/*","http://*/*"],
      "js": ["js/jquery-2.1.3.js"]
    }
  ],
  "manifest_version": 2
}

```
Chú ý: Với phiên bản trình duyệt Chrome mới hiện này thì yêu cầu "manifest_version" là 2.

### Browser action

Thuộc tính `browser_action` sẽ chỉ cho trình duyệt Chrome biết rằng tạo một button trên thanh toolbar với icon và hành vi xảy ra khi click vào icon này.

### Content Scripts
Đây là một thuộc tính rất quan trọng trong file manifest.json, nó chỉ rõ thông tin về các file css, js mà ta sẽ nhúng vào các trang web theo chỉ định.

```js
{
  ...
  "content_scripts": [
    {
      "matches": ["https://*/*","http://*/*"],
      "js": ["js/jquery-2.1.3.js"],
      "css": ["css/common.css"]
    },
    {
      "matches": ["https://redmine-system.tsumikiinc.jp/*"],
      "js": ["js/redmine-system.js"]
    }
  ],
  ...
}
```
Giá trị của thuộc tính `content_scripts` là một phần tử hoặc một mảng (Array) các Hash. Mỗi phần tử này chứa một số thông tin quan trọng sau:

  - `css`: giá trị là một String (1 file css) hoặc một Array (một hoặc nhiều file css) để nhúng vào trang web
  - `js`: giá trị là một String (1 file js) hoặc một Array (một hoặc nhiều file js) để nhúng vào trang web
  - `matches`: giá trị là một String hoặc một Array mô tả các giá trị hợp lệ của trang web được chọn để nhúng mã css, js

Bên cạnh đó có một số trường khác tiện lợi cho việc quy định các trang hợp lệ như: `exclude_matches` (ngoại trừ các trang web trong nhóm này)...

Như trong ví dụ trên thì với tất cả các trang web đều được nhúng jquery (`js/jquery-2.1.3.js`) và css (`css/common.css`). Riêng đối với các trang có dạng `https://redmine-system.tsumikiinc.jp/*` sẽ được nhúng thêm mã js (`js/redmine-system.js`).

Khi nhúng thêm mã js các mã javascript này bạn cũng không phải lo lắng nó sẽ ảnh hưởng đến javascript ban đầu của trang web bởi vì javascript trong extension chạy độc lập với javascript của trang web.

## 2. Cách tạo một Chrome extension HelloWorld đơn giản

### 2.1 Tạo file manifest.json

File `manifest.json` là bắt buộc phải có của tất cả các chrome extension. Bạn tạo một file manifest.json với nội dung như sau:

`chrome-extension/manifest.json`
```json
{
  "name": "Hello World!",
  "version": "1.0",
  "description": "My first Chrome extension.",
  "browser_action": {
    "default_icon": "images/icon.png"
  },
  "manifest_version": 2
}
```

Như trong ví dụ trên thì button mới được thêm vào toolbar này sẽ có icon là `images/icon.png`. Giờ bạn đã có thể thêm extension vào trình duyệt Chrome và sẽ thấy có thêm một icon mới ở trên thanh toolbar. Tuy nhiên khi bạn click vào icon này thì không thấy có điều gì xảy ra. Tiếp theo sẽ tạo thêm một file Html có nội dung HelloWorld, khi click và icon mới này thì sẽ hiển thị ra popup với nội dung HelloWorld.

### 2.2 Tạo popup
`chrome-extension/html/popup.html`
```html
<html>
  <head>
    <style type="text/css">
      body {
        width: 100px;
      }
    </style>
    <script type="text/javascript">
      alert(123);
    </script>
  </head>
  <body>
    <p>HelloWorld!</p>
  </body>
</html>
```

Thêm popup vào file `manifest.json` 

`chrome-extension/manifest.json`
```json
{
  ...
  "browser_action": {
    "default_icon": "images/icon.png",
    "default_popup": "html/popup.html"
  },
  ...
}
```

Sau khi load lại extension này và click vào icon của extension bạn sẽ thấy một popup mở ra với thông báo HelloWorld. Đến đây bạn đã hoàn thành một extension HelloWorld đơn giản.

## 3. Viết ứng dụng Chrome extension

Hiện tại trang redmine `https://redmine-system.tsumikiinc.jp/projects/filmarks/issues` của khách hàng đang sử dụng tiếng Nhật, việc này gây đôi chút khó khăn và bất tiện cho các thành viên trong nhóm không biết tiếng Nhật.  Extension này sẽ dịch một các từ tiếng Nhật trong trang web này sang tiếng Việt, như vậy sẽ dễ dàng và thuận tiện hơn trong khi làm việc.

### 3.1 Tạo file manifest.json

`chrome-extension/manifest.json`
```js
{
  ...
  "content_scripts": [
    {
      "matches": [
        "https://*/*",
        "http://*/*"],
      "js": ["js/jquery-2.1.3.js"]
    },
    {
      "matches": [
        "https://redmine-system.tsumikiinc.jp/*",
        "http://redmine-system.tsumikiinc.jp/*"],
      "js": ["js/redmine-system.js"]
    }
  ],
  ...
}
```

Trong file manifest này đã khai báo rằng sử dụng `jquery-2.1.3.js` cho tất cả các trang web, và file `redmine-system.js` cho trang web có định dạng `https://redmine-system.tsumikiinc.jp/*`.

### 2.2 Viết file redmine-system.js thực hiện việc dịch trang web sang tiếng Việt

`chrome-extension/js/redmine-system.js`
```js
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
```
Sau khi cài đặt extension này, bạn vào trang `https://redmine-system.tsumikiinc.jp/` sẽ thấy các từ tiếng Nhật đều được dịch sang tiếng Việt.

## 3. Kết luận

Với Chrome extension bạn có thể tùy biến một trang web nào đó theo ý của mình hay hơn thế nữa là làm các công cụ cho trình duyệt Chrome. Để tạo một ứng dụng Chrome extension cũng vô cùng rất đơn giản. Hy vọng bạn đọc có thể nhanh chóng tạo một ứng dụng Chrome extension của riêng mình và sử dụng nó thực sự rất thú vị.

## Tham khảo
1. [https://developer.chrome.com/extensions](https://developer.chrome.com/extensions)
2. [Demo github](https://github.com/ngocthoaia1/chrome-extensions-last)
