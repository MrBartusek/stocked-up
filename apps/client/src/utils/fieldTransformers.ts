/**
 * This helper class is for providing transformers to react-form setValueAs
 * functions. The default behavior of this library is to always send string.
 * That means numbers are sent as string `"123"` and empty fields are sent as
 * empty strings `""`. This is fix for that.
 *
 * Example usage:
 * ```
 * <FormInput
 *   type="number"
 *   {...register('quantity', { setValueAs: FieldTransformers.number })}
 * />
 * ```
 */
export default class FieldTransformers {
	/**
	 * Transform field value to number. Defaults to null;
	 */
	static number(value: string) {
		if (value == null || value == '') {
			return 0;
		}
		return +value;
	}

	/**
	 * Transform field value to string. Defaults to null;
	 */
	static string(value: string) {
		if (value == null || value == '') {
			return undefined;
		}
		return value;
	}
}
