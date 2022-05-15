# HybridWebApp
: 연동방식을 설명하는 문서이며, 가이드되는 예제 소스는 참고용으로 사용하세요.

-----
## 웹에서 아이폰 안드로이드 구분 함수
```
# hybridweb
## 1. 아이폰 / 안드로이드 구분 함수
>>>>>>> 5cbf7acbfd9bbe93c0aede5bccc9553ec5f1ba91
function checkMobile() {
    var result = "web";
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    if ( varUA.indexOf('android') > -1) {
        result = "android";
    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
        result = "ios";
    } 
    return result;
}
```

## 1. 파이어베이스 푸시키 가져오기
* 호출
    ### [Android]   window.HybridWebApp.callApp_GetFBToken();
    ### [IOS]       window.webkit.messageHandlers.callApp_GetFBToken.postMessage({});
* 응답
    > rcvMessage.data.token : 단말에 설정된 파이어베이스 토큰 키
    ```
    function hybridWebApp_rcvHandler(rcvMessage) {
        if(rcvMessage != null) {
            switch(rcvMessage.handler) {
                case 'rcvApp_GetFBToken' : 
                    {
                        if(rcvMessage.statusCode == 200) {
                            // 성공 처리
                        } else {
                            // 실패처리
                        }
                    }
                    break;
                default: break;
            }
        }
    }
    ```

## 2. 초기 접속 주소 가져오기
* 호출
    ### [Android]   window.HybridWebApp.callApp_GetInitUrl();
    ### [IOS]       window.webkit.messageHandlers.callApp_GetInitUrl.postMessage({});
* 응답
    >  rcvMessage.data.initUrl : 단말에 설정된 초기접속 주소
```
function hybridWebApp_rcvHandler(rcvMessage) {
    if(rcvMessage != null) {
        switch(rcvMessage.handler) {
            case 'rcvApp_GetInitUrl' : 
                {
                    if(rcvMessage.statusCode == 200) {
                        // 성공 처리
                    } else {
                        // 실패처리
                    }
                }
                break;
            default: break;
        }
    }
}
```

## 3. 초기 접속 주소 설정하기
* 호출
    > initUrl : http/https를 포함한 full url 주소

    > isRedirect : 주소로 바로 이동 여부 (true/false)
    ### [Android]   
        window.HybridWebApp.callApp_SetInitUrl(JSON.stringify({
            'initUrl' : document.getElementById("initUrl").value,   
            'isRedirect' : false
        }));
    ### [IOS]       
        window.webkit.messageHandlers.callApp_SetInitUrl.postMessage({
            'initUrl' : document.getElementById("initUrl").value,
            'isRedirect' : false
        });
* 응답
    ```
        없음
    ```

## 4. 현위치 정보 가져오기
* 호출
    ### [Android]   window.HybridWebApp.callApp_CurrentGPS();
    ### [IOS]       window.webkit.messageHandlers.callApp_CurrentGPS.postMessage({});
* 응답
    > rcvMessage.data.longitude : 현재 위치 경도(WGS84)

    > rcvMessage.data.latitude : 현재 위치 위도(WGS84)
```
function hybridWebApp_rcvHandler(rcvMessage) {
    if(rcvMessage != null) {
        switch(rcvMessage.handler) {
            case 'rcvApp_CurrentGPS' : 
                {
                    if(rcvMessage.statusCode == 200) {
                        // 성공 처리
                    } else {
                        // 실패처리
                    }
                }
                break;
            default: break;
        }
    }
}
```
=======
    document.getElementById("deviceType").innerText = result;
    return result;
}
>>>>>>> 5cbf7acbfd9bbe93c0aede5bccc9553ec5f1ba91
