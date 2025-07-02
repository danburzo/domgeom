export function round(obj, precision = 12) {
	const exp = Math.pow(10, precision);
	return Object.fromEntries(
		Object.entries(obj).map(entry => {
			const [k, v] = entry;
			return [k, Number.isFinite(v) ? Math.round(v * exp) / exp : v];
		})
	);
}
