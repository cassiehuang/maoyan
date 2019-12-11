import $ from 'jquery';

const getPosition = cb => {
  $.ajax({
    url: 'http://api.map.baidu.com/location/ip?ak=nD1A6PY9wYNU6wLRbsklAg8lYWKnhovz&callback=showLocation',
    dataType: 'jsonp', // 指定服务器返回的数据类型
    success(res) {
      cb(res);
    },
  });
};
export default getPosition;
