const elList1 = document.querySelector('.news-list');
const elList2 = document.querySelector('.world-news-list');
const elList3 = document.querySelector('.basic-news-list');

function renderFuncOne(array, node) {
	node.innerHTML = '';
	array.forEach((item) => {
		node.innerHTML += `
		<li class="news-item">
			<a class="news-link" href="${item.url}" target="blank">
				<h3 class="news-title">
				${item.title}
				</h3>
				<p class="news-text">
					${item.description}
				</p>
				<img
					class="news-img"
					src="${item.urlToImage}"
					alt="germania"
					width="360"
					height="165"
				/>
				<div class="news-info">
					<time class="info-time" datetime="${item.publishedAt}">${item.publishedAt}</time>
				</div>
			</a>
		</li>`;
	});
}

function renderFuncTwo(array, node) {
	node.innerHTML = '';
	array.forEach((el) => {
		node.innerHTML += `
		<li class="world-news-item">
			<a class="world-news-link" href="${el.url}" target="blank">
				<div class="world-news-img-content">
					<img
					class="world-news-image"
					src="${el.urlToImage}"
					alt="the plane is flying over the sky"
					width="210"
					height="165"
					/>
				</div>
				<div class="world-news-content">
					<h3 class="world-news-title">
						${el.title}
					</h3>
					<p class="world-news-text">
						${el.description}
					</p>
					<div class="world-news-icon-time">
						<time class="world-news-time" datetime="${el.publishedAt}">${el.publishedAt}</time>
					</div>
				</div>
			</a>
		</li>
		`;
	});
}

function renderFuncThree(array, node) {
	node.innerHTML = '';
	array.forEach((item) => {
		node.innerHTML += `
		<li class="basic-news-item">
			<a class="news-link" href="${item.url}" target="blank">
				<h4 class="basic-news-subtitle">
					${item.title}
				</h4>
				<p class="basic-news-text">${item.content}</p>
				<time class="world-news-time" datetime="${item.publishedAt}">${item.publishedAt}</time>
			</a>
		</li>
		`;
	});
}

const axios = {
	get: (link) => {
		return new Promise((resolve, reject) => {
			const newReq = new XMLHttpRequest();

			newReq.open('GET', link);
			// newReq.responseType = 'json'
			newReq.onload = () => {
				resolve(JSON.parse(newReq.response));
			};
			newReq.onerror = () => {
				reject('xatolik bizda');
			};
			newReq.onabort = () => {
				reject('xatolik serverda');
			};
			newReq.send();
		});
	},
};

async function getData() {
	try {
		const data1 = await axios.get(
			'https://newsapi.org/v2/everything?q=apple&from=2022-10-21&to=2022-10-21&sortBy=popularity&apiKey=ed1c6b7feeb0464d83d7da2455356ade',
		);
		renderFuncOne(data1.articles, elList1);

		const data2 = await axios.get(
			'https://newsapi.org/v2/everything?q=tesla&from=2022-09-22&sortBy=publishedAt&apiKey=ed1c6b7feeb0464d83d7da2455356ade',
		);
		renderFuncTwo(data2.articles, elList2);

		const data3 = await axios.get(
			'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=ed1c6b7feeb0464d83d7da2455356ade',
		);
		renderFuncThree(data3.articles, elList3);
	} catch (error) {
		console.log(error);
	}
}

getData();
