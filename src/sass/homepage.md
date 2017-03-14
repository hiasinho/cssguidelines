# CSS Guidelines

## Goals

* keep stylesheets maintainable

* keep code transparent, sane, and readable

* keep stylesheets scalable

* keep modules reusable

## Key Principles

* Having a styleguide is all about [consistency](http://cssguidelin.es/#the-importance-of-a-styleguide). If you disagree with some rules from this guidelines, fair enough as long as you are consistent.

* SASS should be kept [as simple as it can be](https://www.sitepoint.com/keep-sass-simple). Avoid building complex systems unless absolutely necessary.

* Keep in mind that sometimes [KISS](https://en.wikipedia.org/wiki/KISS_principle) is better than [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

## Syntax and Formatting

* Use SCSS syntax

* Prefer dashes over camelCasing in class names

* Do not use [ID selectors](http://cssguidelin.es/#ids-in-css) (`#some-id`) in CSS

* Do not use [qualified selectors](https://csswizardry.com/2012/11/code-smells-in-css/#qualified-selectors) (`h1.u-h2`)

* Do not define nested html elements (`.c-list > li`). Use only classes.

* Do not use selector reference (`&`) for selectors. Use it for pseudo-classes only

* Avoid nesting of styles beyond 2 deep

* Prefer [@mixin over @extend](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin) 

* Do only use [@extend for placeholders](https://sass-guidelin.es/#extend) (`%button`)

* Stylelint will keep track of syntax and formatting

## Commenting

* Decide on commenting style (KSS, etc.) that gives us a visual styleguide

TODO: Define how to comment

### Low-Level Comments

Oftentimes we want to comment on specific declarations (i.e. lines) in a ruleset. To do this we use a kind of reverse footnote. Here is a more complex comment:

TODO: Example

These types of comment allow us to keep all of our documentation in one place whilst referring to the parts of the ruleset to which they belong.

## Naming Conventions

At a high level:

* Use L-BEM for class names

* Use .js- prefix for JavaScript Hooks

A good naming convention for classes will tell us

* Which layer a class belongs to

* What type of thing a class does

* Where a class can be used

* What (else) a class might be related to

* What version the class is

#### Structure (L-BEM)

The naming convention we follow is very simple: layer prefix, then hyphen (-) delimited strings, with BEM-like naming for more complex pieces of code. Let’s call that L-BEM. 

Class names should be composed like this:

1. Layer prefix with one (1) hyphen (o-|c-|u-)

2. Block

3. Element

4. Modifier

How should we handle versioning? @dominik

TODO: add example good/bad

#### OOCSS

Componentize re-usable styles as re-usable blocks (think super/base classes) then inherit and add own behaviour (read style), the M of BEM

#### Indentation

* No indentation for Blocks

* Two (2) spaces for an Element

* No indentation for Modifiers

TODO: Example

## CSS Selectors

Your selectors are fundamental to writing good CSS.

* **Select what you want explicitly**, rather than relying on circumstance or coincidence. Good Selector Intent will rein in the reach and leak of your styles.

* **Write selectors for reusability**, so that you can work more efficiently and reduce waste and repetition.

* **Do not nest selectors unnecessarily**, because this will increase specificity and affect where else you can use your styles.

* **Do not qualify selectors unnecessarily**, as this will impact the number of different elements you can apply styles to.

* **Keep selectors as short as possible**, in order to keep specificity down and performance up.

Focussing on these points will keep your selectors a lot more sane and easy to work with on changing and long-running projects.

## Architecture

We use the layered architecture [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture) for our CSS to keep specificity low and scalability high.

ITCSS stands for Inverted Triangle Cascading Style Sheet. This methodology allocates and groups our styles based on their purpose, and arranges them in order of specificity and range of influence (as per the inverted triangle metaphor).

### Folder Structure

1. `/settings` : Global variables, site-wide settings, config switches, etc.

2. `/tools` : Site-wide mixins and functions.

3. `/generic` : Low-specificity, far-reaching rulesets (e.g. resets).

4. `/elements` : Unclassed HTML elements (e.g. `a` , `blockquote` , `address` ).

5. `/objects` : Objects, abstractions, and design patterns (e.g. `.o-row` ).

6. `/components` : Discrete, complete chunks of UI (e.g. `.c-sticky` ).

7. `/vendors` : A place for vendor CSS

8. `/utilities` : High-specificity, very explicit selectors. Overrides and helper classes (e.g. `.u-island`, `.u-h1` ).

### File Composition

* One (1) module (object, component, utility) per file

* Declare variables only used within this file on top

* Mixins and placeholders only used within this file go after

TODO: Example

