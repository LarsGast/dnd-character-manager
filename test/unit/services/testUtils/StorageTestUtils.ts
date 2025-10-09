export function getMockStorage(partial: Partial<Storage>): Storage {
	return {
		getItem: partial.getItem ?? (() => null),
		setItem: partial.setItem ?? (() => {}),
		removeItem: partial.removeItem ?? (() => {}),
		key: partial.key ?? (() => null),
		length: partial.length ?? 0,
		clear: partial.clear ?? (() => {}),
	};
}
