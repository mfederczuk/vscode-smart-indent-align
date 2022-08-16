<!--
  Copyright (c) 2022 Michael Federczuk
  SPDX-License-Identifier: CC-BY-SA-4.0
-->

# VSCode Smart Indent/Align Extension #

[version_shield]: https://img.shields.io/badge/version-0.1.0-informational.svg
[release_page]: https://github.com/mfederczuk/mfederczuk/vscode-smart-indent-align/releases/tag/v0.1.0 "Release v0.1.0"
[![version: 0.1.0][version_shield]][release_page]
[![Changelog](https://img.shields.io/badge/-Changelog-informational.svg)](CHANGELOG.md "Changelog")

## About ##

> An extension for those who know the difference between indentation and alignment

**Smart Indent/Align** is a [VSCode] extension that adds smart indentation and alignment.

* [_Indentation vs. Alignment — What's the difference?_](INDENT_VS_ALIGN.md)

Even though indentation *should* be done with tabs, and alignment *should* be done with spaces — this extension also
supports using spaces as indentation `editor.insertSpaces: true`. (though only to some degree)

This is an unofficial spiritual successor to [j-zeppenfeld's Tab-Indent Space-Align] extension,
which unfortunately seems to have been abandoned.

[VSCode]: <https://github.com/microsoft/vscode> "microsoft/vscode: Visual Studio Code"
[j-zeppenfeld's Tab-Indent Space-Align]: <https://github.com/j-zeppenfeld/tab-indent-space-align> "j-zeppenfeld/tab-indent-space-align: A Visual Studio Code extension for those who know the difference between indentation and alignment."

## Features ##

This extensions... well *extends* the capabilities of VSCode's built-in indentation and alignment support.

* When pressing enter, any leading whitespace (indentation + alignment) will be 1:1 copied to the new line
* When configured to indent with tab characters (`editor.insertSpaces: false`), pressing tab within the indentation will
  insert a tab character, otherwise it will insert spaces

## Contributing ##

Read through the [Contribution Guidelines](CONTRIBUTING.md) if you want to contribute to this project.

## License ##

**VSCode Smart Indent/Align** is licensed under both the [**Mozilla Public License 2.0**](LICENSES/MPL-2.0.txt) AND the
[**Apache License 2.0**](LICENSES/Apache-2.0.txt).  
For more information about copying and licensing, see the [`COPYING.txt`](COPYING.txt) file.
