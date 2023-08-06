/*
 * 網路假期 - 答案共享資料庫
 * https://netholiday.reh.tw/
 *
 * Copyright 2019 張文相 Zhang Wenxiang
 * https://www.facebook.com/GoneToneDY
 * https://blog.reh.tw/
 */

const AnswerNumberMap: Record<string, number> = {
	A: 0,
	B: 1,
	C: 2,
	D: 3,
	E: 4,
};

function createAddAnswerButton() {
	/* 請求網址 */
	const requestURL = 'https://netholiday.reh.tw/add/';

	/* 創建 Div 元素 */
	var element1 = document.getElementsByClassName('assign-row')[1]; //外層元素 ID

	if (element1 != null) {
		const divCreate = document.createElement('div'); //創建 div 元素

		divCreate.id = 'addAnswerDiv'; //設定 div ID

		//設定 div style
		divCreate.style.position = 'absolute';
		divCreate.style.right = '81px';
		divCreate.style.bottom = '0px';
		divCreate.style.fontSize = '20px';

		element1.appendChild(divCreate); //插入 div

		/* 創建按鈕元素 */
		const element2 = document.getElementById('addAnswerDiv'); //外層元素 ID

		const linkList = document.getElementsByClassName('link-list'); //取得連結清單
		const TopicElement = document.getElementById('topic')!; //取得題目元素
		const topic = TopicElement.innerText.replace(/(^\s*)|(\s*$)/g, '');

		//預設
		let title;
		if (['.', ' ', ''].includes(topic)) {
			title = TopicElement.getElementsByTagName('img')[0].src; //取得網路假期數學題目圖片網址
		} else {
			title = TopicElement.innerText; //取得網路假期題目
		}

		/* 創建網路假期正確答案陣列 */
		const AnswerArray: HTMLDivElement[] = []; //宣告陣列
		for (let i = 0; i < linkList.length; i++) {
			if (linkList[i].getElementsByClassName('ans-check')[0] != null) {
				AnswerArray[i] = linkList[i].getElementsByClassName(
					'ans-dot'
				)[0] as HTMLDivElement; //取得網路假期正確答案陣列
			} else {
				AnswerArray[i] = linkList[i].getElementsByTagName('div')[0]; //取得網路假期正確答案陣列
			}
		}

		/* 將 A B C D E 選項轉換為數字 */
		const NumberArray: number[] = AnswerArray.map(
			(answer) => AnswerNumberMap[answer.innerText.toUpperCase()]
		); //宣告陣列

		if (element2 != null && title != null && NumberArray != null) {
			const ButtonCreate = document.createElement('button'); //創建按鈕元素
			const ButtonSetText = document.createTextNode('新增解答至資料庫'); //設定按鈕文字

			ButtonCreate.appendChild(ButtonSetText); //套用設定的按鈕文字
			ButtonCreate.className = 'btn btn-link text-warning'; //設定按鈕 Class
			ButtonCreate.id = 'addAnswerButton'; //設定按鈕 ID
			ButtonCreate.type = 'button'; //設定按鈕類型

			//設定按鈕 onclick
			ButtonCreate.onclick = function () {
				const numberTitle = document
					.getElementById('title')!
					.innerText.replace(/(^\s*)|(\s*$)/g, ''); //取得目前題目為第幾題文字
				const number = Number(numberTitle.slice(1, numberTitle.length - 1)); //過濾後取得目前題目為第幾題

				const topic = document
					.getElementById('topic')!
					.innerText.replace(/(^\s*)|(\s*$)/g, '');
				const getAnswer = document
					.getElementsByClassName('radio')
					[NumberArray[number - 1]].getElementsByTagName('label')[0]
					.getElementsByTagName('div')[0]; //取得網路假期正確答案文字

				let getTitle, getImage;
				if (topic === '.' || topic === ' ' || topic === '') {
					//判斷是文字還是圖片
					getTitle = document
						.getElementById('topic')!
						.getElementsByTagName('img')[0].src; //取得網路假期數學題目圖片網址
					window.open(
						requestURL +
							'?Title=' +
							encodeURIComponent(getTitle.replace(/(^\s*)|(\s*$)/g, '')) +
							'&Answer=' +
							encodeURIComponent(
								getAnswer.innerText.replace(/(^\s*)|(\s*$)/g, '').slice(2)
							) +
							'&Source=Plugin',
						'_blank'
					);
				} else {
					getTitle = TopicElement.innerText; //取得網路假期題目
					getImage = TopicElement.getElementsByTagName('img')[0]; //取得網路假期數學題目圖片
					if (getTitle != null && getImage != null) {
						getTitle = getTitle + ' ' + getImage.src; //取得網路假期題目加圖片網址
					}
					window.open(
						requestURL +
							'?Title=' +
							encodeURIComponent(getTitle.replace(/(^\s*)|(\s*$)/g, '')) +
							'&Answer=' +
							encodeURIComponent(
								getAnswer.innerText.replace(/(^\s*)|(\s*$)/g, '').slice(2)
							) +
							'&Source=Plugin',
						'_blank'
					);
				}
			};

			element2.appendChild(ButtonCreate); //插入按鈕
		}
	}
}

window.onload = function () {
	//等待網頁載入完成
	setTimeout(createAddAnswerButton, 500); //延遲 0.5 秒執行
};

if (browser) createAddAnswerButton();
