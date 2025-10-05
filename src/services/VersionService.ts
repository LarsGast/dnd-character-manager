/**
 * Service for fetching and managing application version information from GitHub releases.
 */
export class VersionService {
	private static readonly GITHUB_API_URL =
		'https://api.github.com/repos/LarsGast/dnd-character-manager/releases/latest';
	private static readonly CACHE_KEY = 'app_version_cache';
	private static readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

	/**
	 * Fetches the latest release version from GitHub API.
	 * Uses cached version if available and not expired.
	 * @returns Promise resolving to version tag (e.g., "v0.4.1") or null if fetch fails
	 */
	async getLatestVersion(): Promise<string | null> {
		// Check cache first
		const cached = this.getCachedVersion();
		if (cached) {
			return cached;
		}

		try {
			const response = await fetch(VersionService.GITHUB_API_URL);
			if (!response.ok) {
				console.warn('Failed to fetch version from GitHub API');
				return null;
			}

			const data = await response.json();
			const version = data.tag_name;

			if (version) {
				this.cacheVersion(version);
			}

			return version;
		} catch (error) {
			console.error('Error fetching version:', error);
			return null;
		}
	}

	/**
	 * Gets the major version number from a version string.
	 * @param version - Version string (e.g., "v0.4.1")
	 * @returns Major version number (e.g., 0)
	 */
	getMajorVersion(version: string): number {
		const match = version.match(/^v?(\d+)\./);
		return match ? parseInt(match[1], 10) : -1;
	}

	/**
	 * Checks if a version is in the 0.x.x range (pre-stable).
	 * @param version - Version string (e.g., "v0.4.1")
	 * @returns true if version is 0.x.x
	 */
	isPreStableVersion(version: string): boolean {
		return this.getMajorVersion(version) === 0;
	}

	private getCachedVersion(): string | null {
		try {
			const cached = localStorage.getItem(VersionService.CACHE_KEY);
			if (!cached) return null;

			const { version, timestamp } = JSON.parse(cached);
			const age = Date.now() - timestamp;

			if (age > VersionService.CACHE_DURATION) {
				localStorage.removeItem(VersionService.CACHE_KEY);
				return null;
			}

			return version;
		} catch {
			return null;
		}
	}

	private cacheVersion(version: string): void {
		try {
			const cacheData = {
				version,
				timestamp: Date.now(),
			};
			localStorage.setItem(VersionService.CACHE_KEY, JSON.stringify(cacheData));
		} catch (error) {
			console.warn('Failed to cache version:', error);
		}
	}
}
