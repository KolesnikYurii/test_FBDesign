new Swiper('.hero__slider', {
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	}
});

$('.review-tabs__item').on('click', function (e) {
	e.preventDefault();
	$('.review-tabs__item').removeClass('review-tabs__item--active');
	$(this).addClass('review-tabs__item--active');

	$('.review-tabs__content-item').removeClass('review-tabs__content-item--active');
	$($(this).attr('href')).addClass('review-tabs__content-item--active');
});

const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
	initRatings();
}

function initRatings() {
	let ratingActive, ratingValue;
	for (let index = 0; index < ratings.length; index++) {
		const rating = ratings[index];
		initRating(rating);
	}

	function initRating(rating) {
		initRatingVars(rating);

		setRatingActiveWidth();
	}

	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.rating__active');
		ratingValue = rating.querySelector('.rating__value');
	}

	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}
}



const loginLinks = document.querySelectorAll('.login-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 700;

if (loginLinks.length > 0) {
	for (let index = 0; index < loginLinks.length; index++) {
		const loginLink = loginLinks[index];
		loginLink.addEventListener("click", function (e) {
			const loginName = loginLink.getAttribute('href').replace('#', '');
			const curentlogin = document.getElementById(loginName);
			loginOpen(curentlogin);
			e.preventDefault();
		});
	}
}

const loginCloseIcon = document.querySelectorAll('.close-login');
if (loginCloseIcon.length > 0) {
	for (let index = 0; index < loginCloseIcon.length; index++) {
		const el = loginCloseIcon[index];
		el.addEventListener('click', function (e) {
			loginClose(el.closest('.login'));
			e.preventDefault();
		});
	}
}

function loginOpen(curentLogin) {
	if (curentLogin && unlock) {
		const loginActive = document.querySelector('.login.open');
		if (loginActive) {
			loginClose(loginActive, false);
		} else {
			bodyLock();
		}
		curentLogin.classList.add('open');
		curentLogin.addEventListener("click", function (e) {
			if (!e.target.closest('.login__content')) {
				loginClose(e.target.closest('.login'));
			}
		});
	}
}

function loginClose(loginActive, doUnlock = true) {
	if (unlock) {
		loginActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const loginActive = document.querySelector('.login.open');
		loginClose(loginActive);
	}
});

