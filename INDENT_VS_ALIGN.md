<!--
  Copyright (c) 2022 Michael Federczuk
  SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Indentation vs. Alignment — What's the difference? #

## Indentation ##

This is indentation:

```typescript
function func() {
→	if (condition) {
→	→	// ...
→	}
}
```

* It's for grouping lines of code that are part of the same block (e.g.: functions, classes, `if`, `while`, ...)
* It helps with distinguishing those (possibly nested) blocks of code
* It's written *only* at the beginning of lines
* Tab characters are recommended because:
  * Good separation between indentation (with tab characters) and alignment (with space characters)
  * The width of tab characters (or just the "tab width") is configurable, which is important for accessability reasons:
    [_"Nobody talks about the real reason to use Tabs over Spaces"_ — reddit.com/r/javascript][reddit_post]
  * Changing the tab width does not mess with alignment (more on that later)
* Space characters are not recommended because:
  * It's almost indistinguishable from alignment with space characters
  * The width of space characters is not configurable (at least not with some special editor or extension/plugin)
  * The next best thing instead of changing width is changing the amount of space characters used for indentation,
    though this also has problems:
    * It messes with alignment
    * It needs to be either converted back to the previous amount before committing, or the commit history will be
      littered with changes of indentation space character amount

## Alignment ##

This is alignment:

```typescript
function·func(a:····number,
··············foo:··number,
··············name:·string)·{}

const·foobar:····string·····=·"";
const·baz:·······number[]···=·[];
const·aLongName:·RegExp·····=·/./;
const·yeeHaw:····()·=>·void·=·()·=>·{};
```

* It's for aligning the same tokens on neighboring lines with similar content
* It helps with distinguishing between those tokens
* It written anywhere *after* indentation
* The width of alignment characters must stay the same as to not mess with the alignment
* Spaces are recommended because:
  * Good separation between indentation (with tab characters) and alignment (with space characters)
* Tabs are *not* recommended because:
  * It's almost indistinguishable from indentation with tab characters
  * Tabs (with tab width > 1) need to be mixed with spaces (see next section)
  * Configuring tab width will mess with alignment (see next section as well)

## Alignment with mixed tabs & spaces is especially wrong ##

```typescript
function·func(a:···number,
→   →   →   ··foo:·number)·{}
```

> Why, though? Looks fine with tab width 4.

Because when we change the tab width but keep the amount of tabs, this happens:

* Tab width: 2

  ```typescript
  function·func(a:···number,
  → → → ··foo:·number)·{}
  ```

* Tab width: 6

  ```typescript
  function·func(a:···number,
  →     →     →     ··foo:·number)·{}
  ```

* Tab width: 8

  ```typescript
  function·func(a:···number,
  →       →       →       ··foo:·number)·{}
  ```

> Well then just don't change the tab width! Or just just spaces for indentation!

Do I need to remind you? [_"Nobody talks about the real reason to use Tabs over Spaces"_][reddit_post]

[reddit_post]: <https://redd.it/c8drjo>
