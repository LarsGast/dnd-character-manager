# Versioning Policy for the LarsGast dnd-character-manager

## Summary

Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make incompatible changes
2. MINOR version when you add functionality in a backward compatible manner
3. PATCH version when you make backward compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

### Version Numbering Policy Specific for this Project

- **MAJOR**: Any breaking change to user experience, data, or documented APIs.
- **MINOR**: New features, enhancements, or improvements that do not break existing workflows or data.
- **PATCH**: Bug fixes, UI tweaks, or minor changes that do not affect workflows or data.

A breaking change is any change that:

- Removes or changes a user-facing feature in a way that requires users to change their workflow
- Changes the format of internally saved data in a way that is not automatically migrated
- Changes URLs or routes in a way that breaks bookmarks or integrations

## Introduction

This document describes how versioning is managed for the dnd-character-manager website. The versioning strategy is based on [Semantic Versioning 2.0.0](https://semver.org/) (SemVer) with modifications for a web application context.

While SemVer is usually meant to be used in context of a public API, using it in a web application context can still give some benefits it usually provides. By using a modified version of SemVer, we can communicate clearly about the state of the software to anyone using it.

Below you will find our comprehensive versioning strategy. This strategy is the same as SemVer, with key modifications for this specific project.

## Semantic Versioning Specification (SemVer) With Project-Specific Modifications

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

1. Software using Semantic Versioning MAY be a web application.

2. A normal version number MUST take the form X.Y.Z where X, Y, and Z are non-negative integers, and MUST NOT contain leading zeroes. X is the major version, Y is the minor version, and Z is the patch version. Each element MUST increase numerically. For instance: 1.9.0 -> 1.10.0 -> 1.11.0.

3. Once a versioned package has been released, the contents of that version MUST NOT be modified. Any modifications MUST be released as a new version.

4. Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The web application SHOULD NOT be considered stable.

5. Version 1.0.0 defines the web application. The way in which the version number is incremented after this release is dependent on this web application and how it changes.

6. Patch version Z (x.y.Z | x > 0) MUST be incremented if only backward compatible bug fixes are introduced. A bug fix is defined as an internal change that fixes incorrect behavior.

7. Minor version Y (x.Y.z | x > 0) MUST be incremented if new, backward compatible functionality is introduced to the web application. It MUST be incremented if any functionality is marked as deprecated. It MAY be incremented if substantial new functionality or improvements are introduced within the private code. It MAY include patch level changes. Patch version MUST be reset to 0 when minor version is incremented.

8. Major version X (X.y.z | X > 0) MUST be incremented if any backward incompatible changes are introduced to the web application. It MAY also include minor and patch level changes. Patch and minor versions MUST be reset to 0 when major version is incremented.

9. A pre-release version MAY be denoted by appending a hyphen and a series of dot separated identifiers immediately following the patch version. Identifiers MUST comprise only ASCII alphanumerics and hyphens [0-9A-Za-z-]. Identifiers MUST NOT be empty. Numeric identifiers MUST NOT include leading zeroes. Pre-release versions have a lower precedence than the associated normal version. A pre-release version indicates that the version is unstable and might not satisfy the intended compatibility requirements as denoted by its associated normal version. Examples: 1.0.0-alpha, 1.0.0-alpha.1, 1.0.0-0.3.7, 1.0.0-x.7.z.92, 1.0.0-x-y-z.--.

10. Build metadata MAY be denoted by appending a plus sign and a series of dot separated identifiers immediately following the patch or pre-release version. Identifiers MUST comprise only ASCII alphanumerics and hyphens [0-9A-Za-z-]. Identifiers MUST NOT be empty. Build metadata MUST be ignored when determining version precedence. Thus two versions that differ only in the build metadata, have the same precedence. Examples: 1.0.0-alpha+001, 1.0.0+20130313144700, 1.0.0-beta+exp.sha.5114f85, 1.0.0+21AF26D3----117B344092BD.

11. Precedence refers to how versions are compared to each other when ordered.
    1. Precedence MUST be calculated by separating the version into major, minor, patch and pre-release identifiers in that order (Build metadata does not figure into precedence).

    2. Precedence is determined by the first difference when comparing each of these identifiers from left to right as follows: Major, minor, and patch versions are always compared numerically.

       Example: 1.0.0 < 2.0.0 < 2.1.0 < 2.1.1.

    3. When major, minor, and patch are equal, a pre-release version has lower precedence than a normal version:

       Example: 1.0.0-alpha < 1.0.0.

    4. Precedence for two pre-release versions with the same major, minor, and patch version MUST be determined by comparing each dot separated identifier from left to right until a difference is found as follows:
       1. Identifiers consisting of only digits are compared numerically.

       2. Identifiers with letters or hyphens are compared lexically in ASCII sort order.

       3. Numeric identifiers always have lower precedence than non-numeric identifiers.

       4. A larger set of pre-release fields has a higher precedence than a smaller set, if all of the preceding identifiers are equal.

    Example: 1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0.

## FAQ

### Why use SemVer if users cannot choose their version?

Even though the site is continuously deployed and users always see the latest version, having a versioning system works well for internal use. This allows us know which features are released and which aren't, and to revert to previous versions easily if any new version should break.

So why SemVer specifically? The SemVer versioning strategy clearly denotes what each new version contains (patch fixes, minor changes, or breaking changes). It helps us keep track of which version introduced which changes and it makes it clear how far along we've come.

### Are pre-releases being used right now?

No, we do not use pre-releases at this point in time. We included the section of prereleases in the specification because SemVer already includes it. We may start using pre-releases in the future.

### How does versioning affect contributors?

Contributors do not need to worry about versioning when contributing to the project.

We do ask contributors to use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification when committing code to the repository in order to quickly know if a change is a MAJOR, MINOR, or PATCH change. You can read more about this in [CONTRIBUTING](./CONTRIBUTING.md).

### How is the version displayed in the application?

The application displays the current version in the footer of every page. The version number is stored in the `version` field in the `package.json` file at the root of the repository.

When creating a new release, the version in `package.json` MUST be updated to match the release tag version (without the 'v' prefix). For example, if releasing version `v1.2.3`, update `package.json` to have `"version": "1.2.3"`.

The version display includes:

- The version number
- A link to the GitHub releases page
- A warning that v0.x.x releases are pre-release software where breaking changes may occur
