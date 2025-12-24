/**
 * Represents the result of an operation that can succeed or fail.
 * Uses a discriminated union pattern for explicit error handling.
 *
 * @template T The type of value on success
 */
export class Result<T> {
	private success: boolean;
	private value?: T;
	private error?: Error | string;

	private constructor(success: boolean, value?: T, error?: Error | string) {
		this.success = success;
		this.value = value;
		this.error = error;
	}

	/**
	 * Try to perform an action that may throw an error.
	 * If no error is thrown, a successful Result is returned.
	 * If an error is thrown, the error is caught and a failed Result is returned.
	 * @param action The action to perform.
	 * @returns A Result object representing the outcome of the action.
	 */
	public static tryPerform<T>(action: () => T): Result<T> {
		try {
			return Result.ok(action());
		} catch (error) {
			return Result.fail(
				error instanceof Error ? error : new Error(String(error)),
			);
		}
	}

	/**
	 * Create a successful result.
	 */
	public static ok<T>(value: T): Result<T> {
		return new Result<T>(true, value);
	}

	/**
	 * Create a failed result.
	 */
	public static fail<T>(error: Error | string): Result<T> {
		return new Result<T>(false, undefined, error);
	}

	public getIsSuccess(): boolean {
		return this.success;
	}

	/**
	 * Get the value from a successful result, or throw if it failed.
	 */
	public getValueOrThrow(): T {
		if (this.success) {
			return this.value as T;
		}
		throw new Error(
			`Failed to get value from result: ${this.error instanceof Error ? this.error.message : this.error}`,
		);
	}

	/**
	 * Get the value from a successful result, or return a default value if it failed.
	 */
	public getValueOrDefault(defaultValue: T): T {
		return this.success ? (this.value as T) : defaultValue;
	}
}
