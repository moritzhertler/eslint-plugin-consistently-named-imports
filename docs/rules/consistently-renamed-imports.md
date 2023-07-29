# Enforce specified modules to be renamed consistently when loaded by `import` (`consistently-renamed-imports/consistently-renamed-imports`)

<!-- end auto-generated rule header -->

Why would you want to restrict imports if they are not renamed consistently?

Naming conflicts can appear in many cases, for example

-   when migrating from one library to another and both libraries export `foo` or
-   your codebase uses the value `foo` and you want to use a library that also exports `foo`.

By itself, javascript does not allow you to import `foo` into the same scope twice. You will have to rename at least one of the imports. But this might not be enough for readability as `foo` could mean two different things in different scopes.

Example:

```js
// a.js
import { foo } from "A";
import { foo as bar } from "B";

// b.js
import { foo as bar } from "A";
import { foo } from "B";

// c.js
import { foo } from "A";

// d.js
import { foo } from "B";
```

The meaning of `foo` and `bar` is inconsistent.

Ideally, you would rename the exports in "A" and "B", but this might not be possible or sensible. A good alternative is to use a renaming convention. This rule enforces such conventions.

Example:

```js
// a.js
import { foo as fooA } from "A";
import { foo as fooB } from "B";

// b.js
import { foo as fooA } from "A";
import { foo as fooB } from "B";

// c.js
import { foo as fooA } from "A";

// d.js
import { foo as fooB } from "B";
```

Now, the meaning of `fooA` and `fooB` is consistent throughout the codebase.

## Rule Details

This rule allows you to specify imports that you want to be renamed consistently.

It applies to static imports only, not dynamic ones and ignores namespace imports.

## Options

The syntax to specify restricted names looks like this:

```json
"consistently-renamed-imports/consistently-renamed-imports": [
    "error",
    "foo",
    "bar",
]
```

or like this:

```json
"consistently-renamed-imports/consistently-renamed-imports": [
    "error",
    {
        "importNames": ["foo", "bar"]
    }
]
```

When using the object form, you can also specify the import source in an array of gitignore-style patterns.

```json
"consistently-renamed-imports/consistently-renamed-imports": [
    "error",
    {
        "importNames": ["foo", "bar"],
        "sources": ["source1/baz/*", "source2/*", "!source2/good"]
    }
]
```

The name a restricted import has to be renamed to, can also be configured:

```json
"consistently-renamed-imports/consistently-renamed-imports": [
    "error",
    {
        "importNames": [
            { "name": "foo", "desiredName": "fooA" },
            "bar"
        ]
    }
]
```

To recreate the example use:

```json
"consistently-renamed-imports/consistently-renamed-imports": [
    "error",
    {
        "importNames": [{ "name": "foo", "desiredName": "fooA" }],
        "sources": ["A"]
    },
    {
        "importNames": [{ "name": "foo", "desiredName": "fooB" }],
        "sources": ["B"]
    }
]
```

## Examples

Examples of **incorrect** code for this rule:

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", "foo"] */

import foo from "A";
```

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", "foo"] */

import { foo } from "A";
```

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", 
    { 
        "importNames": ["foo"], 
        "sources": ["A"]
    } 
*/

import { foo } from "A";
```

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", 
        { 
            "importNames": [{ "name": "foo", "desiredName": "fooA" }], 
            "sources": ["A"]
        }
    ]
*/

import { foo as bar } from "A";
```

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", 
        { 
            "importNames": ["foo", "bar"], 
            "sources": ["A"]
        }
    ]
*/

import { foo as bar } from "A";
```

Examples of **correct** code for this rule:

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", "foo"] */

import bar from "A";
import { baz } from "B";
```

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", 
        { 
            "importNames": ["foo"], 
            "sources": ["A"]
        }
    ]
*/

import { foo } from "B";
```

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", 
    { 
        "importNames": ["foo"], 
        "sources": ["A"]
    } 
*/

import { foo as bar } from "A";
```

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", 
        { 
            "importNames": [{ "name": "foo", "desiredName": "fooA" }], 
            "sources": ["A"]
        }
    ]
*/

import { foo as fooA } from "A";
```

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", 
        { 
            "importNames": ["foo"], 
            "sources": ["A"]
        }
    ]
*/

import * as LibA from "A";
```

```js
/* eslint consistently-renamed-imports/consistently-renamed-imports: ["error", 
        { 
            "importNames": ["foo"], 
            "sources": ["A"]
        }
    ]
*/

import * as foo from "A";
```

## Attention

Do not use a restricted name as a desired name.
The resulting error can not be fixed:

```json
"consistently-renamed-imports/consistently-renamed-imports": [
    "error",
    {
        "importNames": [
            { "name": "foo", "desiredName": "bar" },
            "bar",
        ]
    }
]
```
