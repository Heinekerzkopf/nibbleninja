// menu burger

export let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}

export let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

export function menuInit() {
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", function (e) {
			if (bodyLockStatus && e.target.closest('.icon-menu')) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
			}
		});
	};
}
export function menuOpen() {
	bodyLock();
	document.documentElement.classList.add("menu-open");
}
export function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove("menu-open");
}


/* body {
	// Скролл заблоковано
	.lock & {
		overflow: hidden;
		touch-action: none;
		overscroll-behavior: none;
	}
	// Сайт завантажений
	.loaded & {
	}
} */

    //Burger
/*
.icon-menu {
	display: none;
	@media (max-width: 998px) {
		display: block;
		position: relative;
		width: rem(30);
		height: rem(18);
		z-index: 5;
		@media (any-hover: none) {
			cursor: default;
		}
		span,
		&::before,
		&::after {
			content: "";
			transition: all 0.3s ease 0s;
			right: 0;
			position: absolute;
			width: 100%;
			height: rem(2);
			background-color: #000;
		}
		&::before {
			top: 0;
		}
		&::after {
			bottom: 0;
		}
		span {
			top: calc(50% - rem(1));
		}
		.menu-open & {
			span {
				width: 0;
			}
			&::before,
			&::after {
			}
			&::before {
				top: calc(50% - rem(1));
				transform: rotate(-45deg);
			}
			&::after {
				bottom: calc(50% - rem(1));
				transform: rotate(45deg);
			}
		}
	}
}
*/

