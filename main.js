
function mainLoad() {
    checkMobile();
    onInit();
}


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

function onInit() {
    //------------- Web에서 App으로 호출하는 함수들 --------------------------------------------------------------------------
    //0. 파이어베이스 푸시키 가져오기
    //0. 초기접속주소 가져오기
    if(checkMobile() == 'android') {
        window.HybridWebApp.callApp_GetFBToken();
        window.HybridWebApp.callApp_GetInitUrl();
    } else if(checkMobile() == 'ios') {
        window.webkit.messageHandlers.callApp_GetFBToken.postMessage({});
        window.webkit.messageHandlers.callApp_GetInitUrl.postMessage({});
    } 

    //1. 접속주소 설정
    document.getElementById('btnInitUrl').addEventListener('click', function(e) {
        if(checkMobile() == 'android') {
            window.HybridWebApp.callApp_SetInitUrl(JSON.stringify({
                'initUrl' : document.getElementById("initUrl").value,
                'isRedirect' : false
            }));
        } else if(checkMobile() == 'ios') {
            window.webkit.messageHandlers.callApp_SetInitUrl.postMessage({
                'initUrl' : document.getElementById("initUrl").value,
                'isRedirect' : false
            });
        } else {
            
        }
    });

    //2. 현위치 호출 
    document.getElementById('btnGPS').addEventListener('click', function(e) {
        if(checkMobile() == 'android') {
            window.HybridWebApp.callApp_CurrentGPS();
        } else if(checkMobile() == 'ios') {
            window.webkit.messageHandlers.callApp_CurrentGPS.postMessage({});
        } else {
            
        }
    });

    //3. 파이어베이스 푸시 메시지 연동 
    document.getElementById('btnPBSend').addEventListener('click', function(e) {
        sendFBMessage(
            document.getElementById("deviceToken").innerText,
            document.getElementById("pbTitle").value, 
            document.getElementById("pbMessage").value
        )
    });


}

//------------- App으로부터 호출되는 함수들 --------------------------------------------------------------------------
//1. 현위치 수신
// 파라미터 정의
// {
//     handler: rcvApp_CurrentGPS,
//     statusCode: 200,
//     message: 정상,
//     data: {

//     }
// }
function hybridWebApp_rcvHandler(rcvMessage) {
    if(rcvMessage != null) {
        switch(rcvMessage.handler) {
            case 'rcvApp_GetFBToken' : 
                {
                    if(rcvMessage.statusCode == 200) {
                        document.getElementById("deviceToken").innerText = rcvMessage.data.token;
                    } else {
                        alert('['+rcvMessage.statusCode+'] ' + rcvMessage.message);
                    }
                }
                break;
            case 'rcvApp_GetInitUrl' : 
                {
                    if(rcvMessage.statusCode == 200) {
                        document.getElementById("initUrl").value = rcvMessage.data.initUrl;
                    } else {
                        alert('['+rcvMessage.statusCode+'] ' + rcvMessage.message);
                    }
                }
                break;
            case 'rcvApp_SendFBMessage' : 
                {
                    if(rcvMessage.statusCode == 200) {
                        sendFBMessage(
                            rcvMessage.data.deviceToken,
                            rcvMessage.data.fbTitle,
                            rcvMessage.data.fbMessage
                        );
                    } else {
                        alert('['+rcvMessage.statusCode+'] ' + rcvMessage.message);
                    }
                }
                break;
            case 'rcvApp_CurrentGPS' : 
                {
                    if(rcvMessage.statusCode == 200) {
                        document.getElementById("deviceCurrentGPS").innerText = '경도:' + rcvMessage.data.longitude + ', 위도:' + rcvMessage.data.latitude;
                        //-- 정상적인 현위치 수신 후의 업무 프로그래밍 ---------
                    } else {
                        //-- 현위치 수신 오류 업무 프로그래밍 ---------
                        alert('['+rcvMessage.statusCode+'] ' + rcvMessage.message);
                    }
                }
                break;
            default: break;
        }
    }
}




//-------------------------------------------------------------------------------------
function sendFBMessage(toToken, title, message) {
    var title = document.getElementById("pbTitle").value;
    var message = document.getElementById("pbMessage").value;

    if(title == undefined || title.length == 0) {
        alert('메시지 타이틀을 입력해 주세요');
    }
    if(message == undefined || message.length == 0) {
        alert('메시지 내용을 입력해 주세요');
    }

    var reqParams = {
        "toToken": toToken,
        "title": title, 
        "message": message
    };

    $.ajax({
        url: '/apis/fbmsg/send',
        data: reqParams,
        type: "POST",
        error: function (error) {
            document.getElementById("btnPBSendResult").innerText = error;
        },
        success: function (data) {
            document.getElementById("btnPBSendResult").innerText = "메시지를 전송하였습니다";
        },
    });

}
