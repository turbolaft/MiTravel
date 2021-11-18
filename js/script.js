const swiper1 = document.querySelector('.mySwiper'),
			swiper2 = document.querySelector('.swiper-container'),
			burger = document.querySelector('.burger'),
			menuClose = document.querySelector('.menu__close'),
			menu = document.querySelector('.menu'),
			playButtonsFirst = document.querySelectorAll('.main-slider__play'),
			featured = document.querySelector('.featured'),
			featuredBurger = document.querySelector('.featured__burger--show'),
			featuredTriller = document.querySelector('.featured__burger'),
			featuredStories = document.querySelector('.featured__stories'),
			closeFeatured = document.querySelector('.close__featured--stories');

let Swiper1 = new Swiper(swiper1, {
	centeredSlides: true,
	slidesPerView: 'auto',
	loop: true,
	spaceBetween: 105
});

let Swiper2 = new Swiper(swiper2, {
	centeredSlides: true,
	slidesPerView: 1,
	loop: true,
	spaceBetween: 10,
	fadeEffect: {
		crossFade: true
	},
	effect: 'fade',
	navigation: {
		nextEl: '.btn-right',
		prevEl: '.btn-left',
	},
});

Swiper2.on('transitionEnd', function () {
	let videos = document.querySelectorAll('.first__slider video');
	videos.forEach(el => {
		el.pause();
		el.currentTime = 0;
	});
	playButtonsFirst.forEach(el => el.style.display = 'block');
});

burger.addEventListener('click', () => {
	showMyMenu(menu);
});

menuClose.addEventListener('click', () => {
	closeMyMenu(menu);
});

function showMyMenu(section) {
	section.classList.remove('d-none');
	section.classList.add('show');
	document.body.style.overflow = 'hidden';
}

function closeMyMenu(section) {
	section.classList.remove('show');
	section.classList.add('d-none');
	document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
	if (e.code === "Escape" && menu.classList.contains("show")) {
		closeMyMenu(menu);
	}
});

playButtonsFirst.forEach(el => {
	el.addEventListener('click', e => {
		let video = e.currentTarget.closest('.main-slider__media').querySelector('video');
		video.play();
		e.currentTarget.style.display = 'none';
		setTimeout(() => {
			video.volume = 1;
		}, 1000);
	});
});

function showMyFeaturedMenu(section, menu) {
	section.classList.remove('d-hide__right');
	menu.classList.remove('d-show__right');
	menu.classList.add('d-hide__right');
	section.classList.add('d-show__right');
}

featuredTriller.addEventListener('click', () => {
	showMyFeaturedMenu(featuredStories, featuredBurger);
});

function hideMyFeaturedMenu(section, menu) {
	section.classList.remove('d-show__right');
	menu.classList.remove('d-hide__right');
	menu.classList.add('d-show__right');
	section.classList.add('d-hide__right');
}

closeFeatured.addEventListener('click', () => {
	hideMyFeaturedMenu(featuredStories, featuredBurger);
});

// modal

const openModalTrigger = document.querySelectorAll('.btn__modal'),
			modalOverlay = document.querySelector('.modal-overlay'),
			modal = document.querySelectorAll('.modal');

openModalTrigger.forEach(el => {
	el.addEventListener('click', e => {
		let path = e.currentTarget.getAttribute('data-path');

		modal.forEach(el => {
			el.classList.remove('modal--visible');
		});

		document.body.style.overflow = 'hidden';

		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
	});
});

modalOverlay.addEventListener('click', e => {

	if (e.target === modalOverlay) {
		modal.forEach(el => {
			el.classList.remove('modal--visible');
		});

		modalOverlay.classList.remove('modal-overlay--visible');
	}

	document.body.style.overflow = '';
});

document.addEventListener('keydown', e => {
	if (e.code === "Escape" || modal.classList.contains("modal--visible")) {
		modal.forEach(el => {
			el.classList.remove('modal--visible');
		});

		modalOverlay.classList.remove('modal-overlay--visible');
	}

	document.body.style.overflow = '';
});

// Header scrollTo

let anchors = document.querySelectorAll('nav a[href*="#"]');

for (anchor of anchors) {
	if (anchor || menu.classList.contains('show')) {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			closeMyMenu(menu);
			anchorsId = e.target.getAttribute('href');
			document.querySelector(anchorsId).scrollIntoView({
				behavior: "smooth",
				block: 'start'
			});
		});
	}
}

// scroll-up

const offset = 100;
const scrollUp = document.querySelector('.scroll-up');
const scrollUpSgvPath = document.querySelector('.scroll-up__svg--path');
const pathLengs = scrollUpSgvPath.getTotalLength();

scrollUpSgvPath.style.strokeDasharray = `${pathLengs} ${pathLengs}`;
scrollUpSgvPath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

// update dashOffset
const updateDashOffset = () => {
	const height = document.documentElement.scrollHeight - window.innerHeight;
	const dashOffset = pathLengs - (getTop() * pathLengs / height);

	scrollUpSgvPath.style.strokeDashoffset = dashOffset;
};


// onScroll
window.addEventListener('scroll', () => {
	updateDashOffset();

	if (getTop() > offset) {
		scrollUp.classList.add('scroll-up--active');
	} else {
		scrollUp.classList.remove('scroll-up--active');
	}
});


// click
scrollUp.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

function showDeleteBooks(book, i) {
	book[i].classList.add('show');
	book[i].classList.remove('hide');
}

function hideDeleteBooks(book, i) {
	book[i].classList.add('hide');
	book[i].classList.remove('show');
}

// Books script added
window.addEventListener('DOMContentLoaded', () => {
	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла ленд",
			"Одержимость",
			"Скотт Пилигримм против..."
		]
	};

	const readBookList = document.querySelector('.read__book--list');

	readBookList.innerHTML = "";

	movieDB.movies.sort();

	movieDB.movies.forEach((film, i) => {
		readBookList.innerHTML += `
				<li class="read__book--item">${i + 1} ${film}
					<div class="read__book--delete hide"></div>
				</li>
		`;
	});

	// modal #1

	const deleteMyBook = document.querySelectorAll('.read__book--delete'),
			bookItem = document.querySelectorAll('.read__book--item');

	bookItem.forEach(el => {
		el.addEventListener('mousemove', e => {
			let target = e.target;

			if (target && target.classList.contains('read__book--item')) {
				bookItem.forEach((item, i) => {
					if (target == item) {
						showDeleteBooks(deleteMyBook, i);
						console.log(i);
					}
				});
			}
		});

	el.addEventListener('mouseout', (e) => {
		let target = e.target;

		bookItem.forEach((item, i) => {
			if (target != item) {
				hideDeleteBooks(deleteMyBook, i);
			}
		});
	});
});
});





