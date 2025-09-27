# DnD Character Manager

![GitHub Release](https://img.shields.io/github/v/release/LarsGast/dnd-character-manager)
![GitHub License](https://img.shields.io/github/license/LarsGast/dnd-character-manager)
![Edition](https://img.shields.io/badge/edition-5e-blue)

[![CI](https://github.com/LarsGast/dnd-character-manager/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/LarsGast/dnd-character-manager/actions/workflows/ci.yml)

A local-first D&D character manager. Fast in-session access, homebrew support, export/import, and offline storage (currently supports **D&D 5e**).

## Table of contents

- [About](#about)
- [Why this project?](#why-this-project)
- [Key features](#key-features)
- [Privacy & security](#privacy--security)
- [Contributing](#contributing)

---

## About

The LarsGast DnD Character Manager is a website where D&D players can manage the characters they play as in campaigns. On this page, you can store multiple characters (no limit currently, other than the 5-10mb that localStorage provides), define their statistics and features with the same freedom as pen and paper (including homebrew), and easily access the end result for in-game use.

This application seeks to act as a replacement to physical character sheets while still maintaining the freedom and ease of use these physical sheets provide.

## Why this project?

Players often rely on fragile paper sheets that can tear, become unreadable, or be hard to search in during a session. This project provides a fast, privacy-friendly, local-first character manager optimized for live gameplay, with quick access to skill modifiers, saves, spells, inventory, homebrew options, and more. Besides all of this, using a digital character sheet allows for automatic calculation, which mitigates mistakes which would accidentally make your PC weaker or stronger than they should be.

While other parties like D&D Beyond already offer comprehensive character managers, I have often found these interfaces cluttered and characters are often too strictly bound to the core rules. DnD is a game of creativity and homebrew, which players should easily be able to express on their digital character sheet, just like on paper.

This project also includes features missing from other character managers, like easily adding homebrew and being able to find how stats and modifiers are built up.

A personal anecdote: I am the DM in a group with some friends (they were first time players when we started). We have found that their physical character sheets did not contain enough space to add all their abilities, features, and magic items, to the point where they would often forget about them. Another problem we ran into is with one player who plays a Warforged. He once told me his armor class and it seemed a bit high to me. We grabbed the PHB and recalculated his AC, and it turns out it was 1 higher that it should have been. A session later, he remembers that all Warforged get a +1 to AC...

This project fixes the two problems I have described above. Using digital storage means we can store a lot more than just a couple of sheets of A4 paper, and we can also organize it in a way that everything is easy to find. This project also strives to allow the user to easily find how their stats and modifiers are built up so you don't have to manually recalculate these things every time you want to check if it's still correct.

While I am striving to bring the best experience to everyone who wants to use this application, it is important to mention I started this project as a hobby project for me and my DnD group to use. It may not be perfect, and it may not be better than other solutions out there, but it is a project I very much enjoy working on and it works well for me and my group. That said, if you have any suggestions on features I should add that would make managing your DnD characters easier, please feel free to open an issue or contribute to this project.

## Key features

- Local-first storage (localStorage), data stays in the user's browser.
  - Insures privacy and offers offline support.
- Fast lookups: skill modifiers, saves, passive stats, spell lists, and item searches optimized for in-session usage.
- Homebrew support: add custom races, classes, items, spells, and more.
  - You can also use this feature to insert official DnD content that you already own legally.
  - NOTE: we do not endorse sharing official DnD content not in the SRD with others.
- Export / Import JSON: easy backups and device transfer.
  - Your characters are YOUR characters. Use this feature to stay in control.

## Privacy & security

- By default all data is stored locally in the browser ([localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)).
  - This prevents anyone (even us) to access your data.
- You can export all data that is stored on the page.
  - Save backups, move data between browsers / devices, do whatever you want with it.

## Contributing

If you have questions, concerns, or would like to contribute to this project, there are several ways to get involved:

- **Open an Issue**: If you encounter a bug, have a feature request, or want to discuss improvements, please [open an issue](https://github.com/LarsGast/dnd-character-manager/issues).
- **Start a Discussion**: You can also initiate a discussion in the [Discussions section](https://github.com/LarsGast/dnd-character-manager/discussions) of this repository to share ideas or seek help.
- **Fork and Contribute**: If you'd like to make changes or enhancements to the project, fork the repository and submit a pull request with your proposed changes.
  - Please read [the guidelines for contributing to this project](./docs/CONTRIBUTING.md) for more information and to ensure your changes find their way to main smoothly.

Your contributions and feedback are highly valued and essential to the improvement of this project. Thank you for your support!
