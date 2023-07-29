# eslint-plugin-consistently-named-imports

Enforce specified modules to be named consistently when loaded by import

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-consistently-named-imports`:

```sh
npm install eslint-plugin-consistently-named-imports --save-dev
```

## Usage

Add `consistently-named-imports` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "consistently-named-imports"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "consistently-named-imports/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                                   | Description                                                                |
| :--------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| [consistently-named-imports](docs/rules/consistently-named-imports.md) | Enforce specified modules to be named consistently when loaded by `import` |

<!-- end auto-generated rules list -->
