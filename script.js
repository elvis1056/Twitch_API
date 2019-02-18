
	document.addEventListener("DOMContentLoaded", () => {
		var clientId = "xz6dj2rzycbnttjx1jeflood62ru70"
		var limit = 18;
		var apiUrl = "https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=" + limit;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", apiUrl, true);
		xhr.setRequestHeader("client-id",clientId);
		xhr.send();

		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4 && xhr.status === 200) {
				var data = JSON.parse(xhr.responseText);  // 將JSON的字串轉換成javaSrcipt的陣列
				// console.log(data) 確認資料有沒有取得
				useData(data)
				useUrlClick(data)
			} 
		}

		function useData(array) {
             const streams = array.streams;
             const row = document.querySelector(".row");
             //console.log(row) 檢查版面及資料
             streams.forEach((element, index, array) => {
             		//創建每一個DIV的元素
             	let game = document.createElement("a");
					game.classList.add("game");
					// game.setAttribute('href', streams[index].channel.url) 將每個元素加上URL連結

					let top = document.createElement("div");
						top.classList.add("top");

						let topimg = document.createElement("img");
							topimg.setAttribute("src", streams[index].preview.medium)
							top.appendChild(topimg); // 將直播畫面加入top中

					let bottom = document.createElement("div");
						bottom.classList.add("bottom");

						let bottom__left = document.createElement("div");
							bottom__left.classList.add("bottom__left");

							let bottom__left__log = document.createElement("img");
								bottom__left__log.setAttribute("src", streams[index].channel.logo); // 取到logo資料
								bottom__left.appendChild(bottom__left__log); //將logo加入previewLogo中


						let bottom__right = document.createElement("div");
							bottom__right.classList.add("bottom__right");

							let channel__name = document.createElement("div");
								channel__name.innerText = streams[index].channel.status;
								channel__name.classList.add("channel__name");

							let owner__name = document.createElement("div");
								owner__name.innerText = streams[index].channel.display_name;
								owner__name.classList.add("preview__name");
				
				game.appendChild(top);		
				game.appendChild(bottom);
				bottom.appendChild(bottom__left);
				bottom.appendChild(bottom__right);
				bottom__right.appendChild(channel__name);
				bottom__right.appendChild(owner__name);

				document.querySelector(".row").appendChild(game) // 將所有東西放入class中

			})
        }

        // 將每個元素加上URL連結
	    function useUrlClick(array) {
	    	const streams = array.streams
	    	// console.log(streams[0].channel.url) 檢查有否抓到連結
	    	for(var i = 0; i<streams.length; i++){
	    		const getGame = document.getElementsByClassName("game")[i]
	    		const gameUrl = streams[i].channel.url
	    		getGame.addEventListener('click', () => {
	  				getGame.setAttribute('href', gameUrl)
					})
	    		}
			}
    })
