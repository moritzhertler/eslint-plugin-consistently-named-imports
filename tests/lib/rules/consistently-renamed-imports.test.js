/**
 * @fileoverview Tests for consistently-renamed-imports.
 * @author Moritz Hertler
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/consistently-renamed-imports");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 2022, sourceType: "module" },
});

ruleTester.run("consistently-renamed-imports", rule, {
    valid: [
        'import foo from "foo";',
        {
            code: 'import foo from "foo";',
            options: ["bar"],
        },
        {
            code: 'import foo from "foo";',
            options: [{ importNames: ["bar"] }],
        },
        {
            code: 'import foo from "foo";',
            options: [{ importNames: ["bar", "baz"] }],
        },
        {
            code: 'import foo from "foo";',
            options: [{ importNames: [{ name: "bar", desiredName: "baz" }] }],
        },
        {
            code: 'import foo from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                },
            ],
        },
        {
            code: 'import foo from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["qux"],
                },
            ],
        },
        {
            code: 'import foo from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["qux", "bar"],
                },
            ],
        },
        {
            code: 'import foo from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["foo"],
                },
            ],
        },
        {
            code: 'import foo from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["foo", "bar"],
                },
            ],
        },
        {
            code: 'import foo from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["qux"],
                },
            ],
        },
        {
            code: 'import foo from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["qux", "bar"],
                },
            ],
        },
        {
            code: 'import foo from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["foo"],
                },
            ],
        },
        {
            code: 'import foo from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["foo", "bar"],
                },
            ],
        },
        'import { foo } from "foo";',
        {
            code: 'import { foo } from "foo";',
            options: ["bar"],
        },
        {
            code: 'import { foo } from "foo";',
            options: [{ importNames: ["bar"] }],
        },
        {
            code: 'import { foo } from "foo";',
            options: [{ importNames: ["bar", "baz"] }],
        },
        {
            code: 'import { foo } from "foo";',
            options: [{ importNames: [{ name: "bar", desiredName: "baz" }] }],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["qux"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["qux", "bar"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["foo"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["foo", "bar"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["qux"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["qux", "bar"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["foo"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["foo", "bar"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["foo", "bar"],
                },
                {
                    importNames: [
                        { name: "bar2", desiredName: "foobar2" },
                        { name: "baz2", desiredName: "foobaz2" },
                    ],
                    sources: ["foo", "bar"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: ["foo"],
                    sources: ["bar"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: ["foo"],
                    sources: ["bar", "foo/*"],
                },
            ],
        },
        {
            code: 'import { foo } from "foo/bar";',
            options: [
                {
                    importNames: ["foo"],
                    sources: ["foo/*", "!foo/bar"],
                },
            ],
        },
        'import { foo, foo2 } from "foo";',
        {
            code: 'import { foo, foo2 } from "foo";',
            options: ["bar"],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [{ importNames: ["bar"] }],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [{ importNames: ["bar", "baz"] }],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [{ importNames: [{ name: "bar", desiredName: "baz" }] }],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["qux"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["qux", "bar"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["foo"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: [{ name: "bar", desiredName: "baz" }],
                    sources: ["foo", "bar"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["qux"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["qux", "bar"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["foo"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["foo", "bar"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "bar", desiredName: "foobar" },
                        { name: "baz", desiredName: "foobaz" },
                    ],
                    sources: ["foo", "bar"],
                },
                {
                    importNames: [
                        { name: "bar2", desiredName: "foobar2" },
                        { name: "baz2", desiredName: "foobaz2" },
                    ],
                    sources: ["foo", "bar"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: ["foo"],
                    sources: ["bar"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: ["foo"],
                    sources: ["bar", "foo/*"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo/bar";',
            options: [
                {
                    importNames: ["foo"],
                    sources: ["foo/*", "!foo/bar"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: ["foo", "foo2"],
                    sources: ["bar"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo";',
            options: [
                {
                    importNames: ["foo", "foo2"],
                    sources: ["bar", "foo/*"],
                },
            ],
        },
        {
            code: 'import { foo, foo2 } from "foo/bar";',
            options: [
                {
                    importNames: ["foo", "foo2"],
                    sources: ["foo/*", "!foo/bar"],
                },
            ],
        },
        {
            code: 'import { foo as bar } from "foo";',
            options: [
                {
                    importNames: [{ name: "foo", desiredName: "bar" }],
                },
            ],
        },
        {
            code: 'import { foo as bar } from "foo";',
            options: [
                {
                    importNames: [{ name: "foo", desiredName: "bar" }],
                    sources: ["foo"],
                },
            ],
        },
        {
            code: 'import { foo as bar, baz as foobar } from "foo";',
            options: [
                {
                    importNames: [
                        { name: "foo", desiredName: "bar" },
                        { name: "baz", desiredName: "foobar" },
                    ],
                    sources: ["foo"],
                },
            ],
        },
        {
            code: 'import * as foo from "foo";',
            options: [
                {
                    importNames: ["foo"],
                },
            ],
        },
        {
            code: `import { foo1, foo2, foo3 } from "foo";
                   import { bar1, bar2, bar3 } from "bar";
                   import { foobar1, foobar2 } from "foo/bar";
                   import { foobarbaz1, foobarbaz2 } from "foo/bar/bar";
                   import baz from "baz";`,
            options: [
                {
                    importNames: ["foo1"],
                    sources: ["foo/*"],
                },
                {
                    importNames: ["bar1", "bar2", "bar3"],
                    sources: ["foo"],
                },
                {
                    importNames: ["foobar1"],
                    sources: ["foo/*", "!foo/bar"],
                },
                {
                    importNames: [{ name: "baz", desiredName: "foo" }],
                    sources: ["foo"],
                },
            ],
        },
    ],
    invalid: [
        {
            code: 'import foo from "foo";',
            options: ["foo"],
            errors: 1,
        },
        {
            code: 'import { foo } from "foo";',
            options: ["foo"],
            errors: 1,
        },
        {
            code: 'import { foo } from "foo";',
            options: [{ importNames: ["foo"] }],
            errors: 1,
        },
        {
            code: 'import { foo } from "foo";',
            options: [{ importNames: [{ name: "foo", desiredName: "bar" }] }],
            errors: 1,
        },
        {
            code: 'import { foo } from "foo";',
            options: [
                {
                    importNames: [{ name: "foo", desiredName: "bar" }],
                    sources: ["foo"],
                },
            ],
            errors: 1,
        },
        {
            code: 'import { foo as foo2 } from "foo";',
            options: [
                {
                    importNames: [{ name: "foo", desiredName: "bar" }],
                    sources: ["foo"],
                },
            ],
            errors: 1,
        },
        {
            code: `import { foo } from "foo";
                   import { bar } from "bar";`,
            options: [
                {
                    importNames: ["foo", "bar"],
                    sources: ["foo"],
                },
            ],
            errors: 1,
        },
        {
            code: `import { foo } from "foo";
                   import { bar } from "bar";`,
            options: [
                {
                    importNames: ["foo", "bar"],
                    sources: ["foo", "bar"],
                },
            ],
            errors: 2,
        },
        {
            code: 'import { foo, bar } from "foo";',
            options: [
                {
                    importNames: ["foo", "bar"],
                    sources: ["foo", "bar"],
                },
            ],
            errors: 2,
        },
        {
            code: `import { foo } from "foo";
                   import { bar } from "bar";`,
            options: [
                {
                    importNames: ["foo"],
                    sources: ["foo"],
                },
                {
                    importNames: ["bar"],
                    sources: ["bar"],
                },
            ],
            errors: 2,
        },
        {
            code: 'import { foo, bar } from "foo";',
            options: [
                {
                    importNames: ["foo"],
                    sources: ["foo"],
                },
                {
                    importNames: ["bar"],
                    sources: ["bar"],
                },
            ],
            errors: 1,
        },
        {
            code: `import { foo } from "foo/bar";
                   import { bar } from "foo/bar/baz";`,
            options: [
                {
                    importNames: ["foo", "bar"],
                    sources: ["foo/**", "!foo/bar"],
                }
            ],
            errors: 1,
        },
        {
            code: 'import { foo as bar } from "foo";',
            options: [
                {
                    importNames: ["foo", "bar"],
                }
            ],
            errors: 1,
        },
        {
            code: 'import { foo as bar } from "foo";',
            options: [
                {
                    importNames: [{name: "foo", desiredName: "bar"}, "bar"],
                }
            ],
            errors: 1,
        },
        {
            code: `import { foo1, foo2, foo3 as foo4 } from "foo";
                   import { bar1, bar2, bar3 } from "bar";
                   import { foobar1 } from "foo/bar";
                   import { foobar2, foobarbaz1, foobarbaz2 } from "foo/bar/bar";
                   import baz from "baz";`,
            options: [
                {
                    importNames: ["foo1", {name: "foo3", desiredName: "foo4"}],
                    sources: ["foo"],
                },
                {
                    importNames: ["bar1", {name: "bar2", desiredName: "bar4"}],
                    sources: ["foo", "bar"],
                },
                {
                    importNames: ["foo2", "foobar1"],
                    sources: ["foo/*", "!foo/bar/*"],
                },
                {
                    importNames: [{ name: "baz", desiredName: "foo" }],
                },
            ],
            errors: 5
        },
    ],
});
