# hybridweb
## 1. 아이폰 / 안드로이드 구분 함수
function checkMobile() {
    var result = "web";
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    if ( varUA.indexOf('android') > -1) {
        result = "android";
    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
        result = "ios";
    } 

    document.getElementById("deviceType").innerText = result;
    return result;
}
