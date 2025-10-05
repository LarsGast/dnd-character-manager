import { VersionService } from '../services/VersionService.js';

/**
 * Custom element for displaying application version information in the footer.
 * Fetches the latest version from GitHub API and displays it with a link to releases.
 * Shows a warning for v0.x.x versions about potential breaking changes.
 */
export class VersionDisplay extends HTMLElement {
	private versionService: VersionService;

	constructor() {
		super();
		this.versionService = new VersionService();
	}

	async connectedCallback() {
		this.classList.add('version-display');
		this.innerHTML = '<span class="version-loading">Loading version...</span>';

		const version = await this.versionService.getLatestVersion();

		if (!version) {
			this.innerHTML = '<span class="version-error">Version unavailable</span>';
			return;
		}

		this.render(version);
	}

	private render(version: string): void {
		const isPreStable = this.versionService.isPreStableVersion(version);

		this.innerHTML = `
			<div class="version-info">
				<a 
					href="https://github.com/LarsGast/dnd-character-manager/discussions/categories/releases" 
					target="_blank" 
					rel="noopener noreferrer"
					class="version-link"
					title="View releases and changelog"
				>
					Version ${version}
				</a>
				${
					isPreStable
						? '<span class="version-warning" title="Breaking changes may occur in v0.x.x releases">⚠️ Pre-release</span>'
						: ''
				}
			</div>
		`;
	}
}

customElements.define('version-display', VersionDisplay);
