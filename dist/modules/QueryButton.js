"use strict";
/*
 * 網路假期 - 答案共享資料庫
 * https://netholiday.reh.tw/
 *
 * Copyright 2019 張文相 Zhang Wenxiang
 * https://www.facebook.com/GoneToneDY
 * https://blog.reh.tw/
 */
console.log('loaded');
function createQueryAnswerButton() {
    console.log('createQueryAnswerButton');
    /* 請求網址 */
    const requestURL = 'https://netholiday.reh.tw/query.php';
    /* 創建 Div 元素 */
    const element1 = document.getElementById('under'); //外層元素 ID
    if (element1 != null) {
        const divCreate = document.createElement('div'); //創建 div 元素
        divCreate.id = 'queryAnswerDiv'; //設定 div ID
        divCreate.style.float = 'right'; //設定 div style
        element1.appendChild(divCreate); //插入 div
        /* 創建按鈕元素 */
        const element2 = document.getElementById('queryAnswerDiv'); //外層元素 ID
        const TopicElement = document.getElementById('topic'); //取得題目元素
        const topic = TopicElement.innerText.replace(/(^\s*)|(\s*$)/g, '');
        //預設
        let getTitle;
        if (topic === '.' || topic === '') {
            getTitle = TopicElement.getElementsByTagName('img')[0].src; //取得網路假期數學題目圖片網址
        }
        else {
            getTitle = TopicElement.innerText; //取得網路假期題目
        }
        if (element2 != null && getTitle != null) {
            const buttonCreate = document.createElement('button'); //創建按鈕元素
            const buttonSetText = document.createTextNode('解答查詢'); //設定按鈕文字
            buttonCreate.appendChild(buttonSetText); //套用設定的按鈕文字
            buttonCreate.className = 'btn btn-link text-warning'; //設定按鈕 Class
            buttonCreate.id = 'queryAnswerButton'; //設定按鈕 ID
            buttonCreate.type = 'button'; //設定按鈕類型
            //設定按鈕 style
            buttonCreate.style.fontSize = '20px';
            buttonCreate.style.padding = '6px 15px';
            buttonCreate.onclick = function () {
                const topic = TopicElement.innerText.replace(/(^\s*)|(\s*$)/g, '');
                //判斷是文字還是圖片
                const getTitle = ['.', ' ', ''].includes(topic)
                    ? TopicElement.getElementsByTagName('img')[0].src
                    : TopicElement.innerText;
                window.open(requestURL +
                    '?Title=' +
                    encodeURIComponent(getTitle.replace(/(^\s*)|(\s*$)/g, '')) +
                    '&Source=Plugin', 'queryAnswer', 'height=650, width=500, toolbar=no, location=no, menubar=no, status=no, left=50, top=50');
            }; //設定按鈕 onclick
            element2.appendChild(buttonCreate); //插入按鈕
        }
    }
}
window.onload = function () {
    console.log(1);
    //等待網頁載入完成
    setTimeout(createQueryAnswerButton, 500); //延遲 0.5 秒執行
};
if (browser)
    setTimeout(createQueryAnswerButton, 500); //延遲 0.5 秒執行
//# sourceMappingURL=QueryButton.js.map