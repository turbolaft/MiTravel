const swiper1 = document.querySelector('.mySwiper'),
			swiper2 = document.querySelector('.swiper-container'),
			burger = document.querySelector('.burger'),
			menuClose = document.querySelector('.menu__close'),
			menu = document.querySelector('.menu'),
			playButtonsFirst = document.querySelectorAll('.main-slider__play');

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

burger.addEventListener('click', () => {
	showMyMenu(menu);
});

menuClose.addEventListener('click', () => {
	closeMyMenu(menu);
});

function showMyMenu(section) {
	section.classList.remove('d-none');
	section.classList.add('d-show');
	document.body.style.overflow = 'hidden';
}

function closeMyMenu(section) {
	section.classList.remove('d-show');
	section.classList.add('d-none');
	document.body.style.overflow = '';
}

playButtonsFirst.forEach(el => {
	el.addEventListener('click', e => {
		let video = e.currentTarget.closest('.swiper-wrapper').querySelector('video');
		video.play();
		setTimeout(() => {
			video.volume = 1;
		}, 1000);
	});
});
