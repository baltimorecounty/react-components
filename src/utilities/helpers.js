const getUniqueValuesByKey = (arr, key) => {
	return arr.reduce((uniqueKeys, currentValue, currentIndex) => {
		const val = currentValue[key];
		if (!uniqueKeys.includes(val)) {
			uniqueKeys.push(val);
		}
		return uniqueKeys;
	}, []);
};

const getUniqueObjectsByKey = (arr, key) => {
	return arr.reduce((uniqueKeys, currentValue, currentIndex) => {
		if (!uniqueKeys[currentValue.name]) {
			uniqueKeys[currentValue.name] = [];
		}

		uniqueKeys[currentValue.name].push(currentValue);

		return uniqueKeys;
	}, {});
};

export {
	getUniqueValuesByKey,
	getUniqueObjectsByKey
};