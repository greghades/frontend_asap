export function setItemLocalStorage(key, item) {
	if (typeof window !== 'undefined') {
		localStorage.setItem(key, JSON.stringify(item));
	}
}

export function getItemLocalStorage(key) {
	if (typeof window !== 'undefined') {
		return JSON.parse(localStorage.getItem(key));
	}
}
