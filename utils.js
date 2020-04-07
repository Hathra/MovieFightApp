const debounce = (callback, delay = 1000) => {
	let timerId;
	return (...args) => {
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			callback.apply(null, args);
		}, delay);
	};
};
