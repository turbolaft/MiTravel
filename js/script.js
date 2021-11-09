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
