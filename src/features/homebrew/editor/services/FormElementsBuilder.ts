import { getEmptyOption, getSelectOption } from '../../../../utils/util.js';

/**
 * Creates and returns a labeled input section for the form.
 * @param labelText Text for the label of the input.
 * @param id ID and name for the input element.
 * @param defaultValue Default value for the input.
 * @param tooltip Optional tooltip text for the input. If provided, a tooltip icon will be added to the label.
 * @param isRequired Whether the input is required.
 * @returns Section containing the label and input element.
 */
export function getTextInputSection(
	labelText: string,
	id: string,
	defaultValue: string,
	isRequired: boolean,
	tooltip?: string,
): HTMLElement {
	const label = getTextInputWithLabel(
		labelText,
		id,
		defaultValue,
		isRequired,
		tooltip,
	);

	return getSection(label);
}

/**
 * Creates and returns a labeled number input section for the form.
 * @param labelText Text for the label of the input.
 * @param id ID and name for the input element.
 * @param defaultValue Default value for the input.
 * @param tooltip Optional tooltip text for the input. If provided, a tooltip icon will be added to the label.
 * @param isRequired Whether the input is required.
 * @param min Minimum value for the input.
 * @param max Maximum value for the input.
 * @returns
 */
export function getNumberInputSection(
	labelText: string,
	id: string,
	defaultValue: number,
	isRequired: boolean,
	tooltip?: string,
	min?: number,
	max?: number,
): HTMLElement {
	const label = getNumberInputWithLabel(
		labelText,
		id,
		defaultValue,
		isRequired,
		tooltip,
		min,
		max,
	);

	return getSection(label);
}

/**
 * Creates and returns a labeled input element for the form.
 * @param labelText Text for the label of the input.
 * @param id ID and name for the input element.
 * @param defaultValue Default value for the input.
 * @param tooltip Optional tooltip text for the input. If provided, a tooltip icon will be added to the label.
 * @param isRequired Whether the input is required.
 * @returns Label element containing the input.
 */
export function getTextInputWithLabel(
	labelText: string,
	id: string,
	defaultValue: string,
	isRequired: boolean,
	tooltip?: string,
): HTMLLabelElement {
	// Label.
	const label = getLabel(labelText, id, isRequired);

	// Input.
	const input = getInput(id, defaultValue, false, isRequired);
	label.appendChild(input);

	// Tooltip.
	if (tooltip) {
		label.appendChild(getTooltipSpan(tooltip));
	}

	return label;
}

/**
 * Creates and returns a labeled number input element for the form.
 * @param labelText Text for the label of the input.
 * @param id ID and name for the input element.
 * @param defaultValue Default value for the input.
 * @param tooltip Optional tooltip text for the input. If provided, a tooltip icon will be added to the label.
 * @param isRequired Whether the input is required.
 * @param min Minimum value for the input.
 * @param max Maximum value for the input.
 * @returns
 */
export function getNumberInputWithLabel(
	labelText: string,
	id: string,
	defaultValue: number,
	isRequired: boolean,
	tooltip?: string,
	min?: number,
	max?: number,
): HTMLLabelElement {
	// Label.
	const label = getLabel(labelText, id, isRequired);

	// Input.
	const input = getInput(
		id,
		defaultValue.toString(),
		true,
		isRequired,
		min,
		max,
	);
	label.appendChild(input);

	// Tooltip.
	if (tooltip) {
		label.appendChild(getTooltipSpan(tooltip));
	}

	return label;
}

/**
 * Creates and returns a labeled textarea section for the form.
 * @param labelText Text for the label of the textarea.
 * @param id ID and name for the textarea element.
 * @param defaultValue Default value for the textarea.
 * @param tooltip Optional tooltip text for the textarea. If provided, a tooltip icon will be added to the label.
 * @param isRequired Whether the input is required.
 * @returns Section containing the label and textarea element.
 */
export function getTextareaSection(
	labelText: string,
	id: string,
	defaultValue: string | string[],
	isRequired: boolean,
	tooltip?: string,
): HTMLElement {
	// Label.
	const label = getTextareaWithLabel(
		labelText,
		id,
		defaultValue,
		isRequired,
		tooltip,
	);

	return getSection(label);
}

export function getTextareaWithLabel(
	labelText: string,
	id: string,
	defaultValue: string | string[],
	isRequired: boolean,
	tooltip?: string,
): HTMLLabelElement {
	// Label.
	const label = getLabel(labelText, id, isRequired);

	// Textarea.
	const textArea = getTextarea(id, defaultValue, isRequired);
	label.appendChild(textArea);

	// Tooltip.
	if (tooltip) {
		label.appendChild(getTooltipSpan(tooltip));
	}

	return label;
}

/**
 * Creates and returns a labeled select section for the form.
 * @param labelText Text for the label of the select element.
 * @param id ID and name for the select element.
 * @param defaultValue Default value for the select element.
 * @param options Array of options for the select element. Either an array of strings or an array of objects with `id` and `name` properties.
 * @param tooltip Optional tooltip text for the select element. If provided, a tooltip icon will be added to the label.
 * @param isRequired Whether the input is required.
 * @returns Section containing the label and select element.
 */
export function getSelectSection(
	labelText: string,
	id: string,
	defaultValue: string,
	options: string[] | { index: string; name: string }[],
	isRequired: boolean,
	tooltip?: string,
): HTMLElement {
	// Label.
	const label = getLabel(labelText, id, isRequired);

	// Select.
	const select = document.createElement('select');
	select.id = `homebrew-object-${id}`;
	select.name = id;
	select.required = isRequired;

	select.appendChild(getEmptyOption('-- Select an option --', ''));

	for (const option of options) {
		if (typeof option === 'string') {
			select.appendChild(getSelectOption(option));
		} else {
			select.appendChild(getSelectOption(option.name, option.index));
		}
	}

	select.value = defaultValue ?? '';

	label.appendChild(select);

	// Tooltip.
	if (tooltip) {
		label.appendChild(getTooltipSpan(tooltip));
	}

	return getSection(label);
}

/**
 * Creates a label element with the given text and ID.
 * @param labelText Text for the label.
 * @param id ID for the label and associated input element.
 * @param isRequired Whether the input is required.
 * @returns Label element.
 */
function getLabel(
	labelText: string,
	id: string,
	isRequired: boolean,
): HTMLLabelElement {
	const label = document.createElement('label');
	label.textContent = labelText + (isRequired ? ' *' : '');
	label.htmlFor = `homebrew-object-${id}`;

	return label;
}

/**
 * Creates a tooltip span element with the given tooltip text.
 * @param tooltip Tooltip text to be displayed in the tooltip.
 * @returns Tooltip span element.
 */
export function getTooltipSpan(tooltip: string): HTMLSpanElement {
	const tooltipSpan = document.createElement('span');
	tooltipSpan.className = 'icon question';
	tooltipSpan.title = tooltip;

	return tooltipSpan;
}

/**
 * Creates a section element containing the given label.
 * @param label Label element to be included in the section.
 * @returns Section element containing the label.
 */
function getSection(label: HTMLLabelElement): HTMLElement {
	const section = document.createElement('section');
	section.appendChild(label);

	return section;
}

/**
 * Creates and returns a input element for the form.
 * @param id ID and name for the input element.
 * @param defaultValue Default value for the input.
 * @param isNumberInput Whether the input should be a number input.
 * @param isRequired Whether the input is required.
 * @param min Minimum value for the input (if number input).
 * @param max Maximum value for the input (if number input).
 * @returns Input element.
 */
function getInput(
	id: string,
	defaultValue: string,
	isNumberInput: boolean,
	isRequired: boolean,
	min?: number,
	max?: number,
): HTMLInputElement {
	const input = document.createElement('input');

	input.id = `homebrew-object-${id}`;
	input.name = id;
	input.value = defaultValue ?? '';
	input.required = isRequired;

	if (isNumberInput) {
		input.type = 'number';
		input.min = min?.toString() ?? '';
		input.max = max?.toString() ?? '';
	}

	return input;
}
/**
 * Creates and returns a textarea element for the form.
 * @param id ID and name for the textarea element.
 * @param defaultValue Default value for the textarea.
 * @param isRequired Whether the textarea is required.
 * @returns textarea element.
 */
function getTextarea(
	id: string,
	defaultValue: string | string[],
	isRequired: boolean,
): HTMLTextAreaElement {
	if (Array.isArray(defaultValue)) {
		defaultValue = defaultValue.join('\n');
	}

	const textArea = document.createElement('textarea');

	textArea.id = `homebrew-object-${id}`;
	textArea.name = id;
	textArea.value = defaultValue ?? '';
	textArea.required = isRequired;

	return textArea;
}
