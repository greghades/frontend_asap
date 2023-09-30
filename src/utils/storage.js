export function setItemLocalStorage(key, item) {
	if (typeof window !== 'undefined') {
    try {
		  localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {}
	}
}

export function getItemLocalStorage(key) {
	if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {}
    }
	}
}
