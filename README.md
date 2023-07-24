# eslint-plugin-consistently-renamed-imports

Enforce specified modules to be renamend consistently when loaded by import

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-consistently-renamed-imports`:

```sh
npm install eslint-plugin-consistently-renamed-imports --save-dev
```

## Usage

Add `consistently-renamed-imports` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "consistently-renamed-imports"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "consistently-renamed-imports/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


