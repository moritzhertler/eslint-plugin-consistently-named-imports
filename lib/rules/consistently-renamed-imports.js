/**
 * @fileoverview Enforce specified modules to be renamed consistently when loaded by import.
 * @author Moritz Hertler
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const ignore = require("ignore");

const NON_EMPTY_STRING = {
    type: "string",
    minLength: 1,
};

const OPTIONS_SCHEMA = {
    type: "array",
    uniqueItems: true,
    additionalItems: false,
    items: {
        anyOf: [
            NON_EMPTY_STRING,
            {
                type: "object",
                additionalProperties: false,
                required: ["importNames"],
                properties: {
                    importNames: {
                        type: "array",
                        minItems: 1,
                        uniqueItems: true,
                        items: {
                            anyOf: [
                                NON_EMPTY_STRING,
                                {
                                    type: "object",
                                    additionalProperties: false,
                                    required: ["name", "desiredName"],
                                    properties: {
                                        name: NON_EMPTY_STRING,
                                        desiredName: NON_EMPTY_STRING,
                                    },
                                },
                            ],
                        },
                    },
                    sources: {
                        type: "array",
                        minItems: 1,
                        uniqueItems: true,
                        items: [NON_EMPTY_STRING],
                    },
                },
            },
        ],
    },
};

/**
 * Information about a restricted import
 * 
 * @typedef {Object} RestrictedImport
 * @property {string} name - the restricted name
 * @property {string|undefined} desiredName - the desired name (optional)
 */

/**
 * An element of the sanitized options
 * 
 * @typedef {Object} OptionElement
 * @property {RestrictedImport[]} restrictedImports - a list of restricted imports
 * @property {Object} sourcesMatcher - an `ignore` matcher
 */

/**
 * Converts the eslint config options into a uniform format.
 *
 * @param {*} rawOptions the raw options matching {@link OPTIONS_SCHEMA}
 * @returns {OptionElement[]} the sanitized options
 */
function sanitizeOptions(rawOptions) {
    rawOptions = Array.isArray(rawOptions) ? rawOptions : [];
    const sanitizedOptions = [];

    for (const rawOption of rawOptions) {
        if (typeof rawOption === "string") {
            sanitizedOptions.push({
                restrictedImports: [{ name: rawOption }],
            });
            continue;
        }

        const sourcesMatcher = rawOption.sources
            ? rawOption.sources.reduce(
                  (matcher, currentValue) => matcher.add(currentValue),
                  ignore({
                      allowRelativePaths: true,
                      ignorecase: true,
                  })
              )
            : undefined;

        const restrictedImports = rawOption.importNames.map((element) => {
            if (typeof element === "string") {
                return { name: element };
            }
            return element;
        });

        sanitizedOptions.push({
            sourcesMatcher,
            restrictedImports,
        });
    }

    return sanitizedOptions;
}

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description:
                "Enforce specified modules to be renamed consistently when loaded by `import`",
        },

        messages: {
            restrictedImport:
                "The identifier '{{name}}' imported from '{{source}}' is restricted, please rename '{{name}}'.",
            restrictedImportWithSuggestion:
                "The identifier '{{name}}' imported from '{{source}}' is restricted, please rename '{{name}}' to '{{desiredName}}'.",
        },

        schema: OPTIONS_SCHEMA,
    },

    create(context) {
        const options = sanitizeOptions(context.options);

        // if no import names are restricted we don't need to check anything
        if (options.length === 0) {
            return {};
        }

        /**
         * Reports the given node with the correct error message.
         *
         * @param {ASTNode} node
         * @param {string} importSource
         * @param {ImportData} importData
         * @param {string|undefined} desiredName
         * @returns {void}
         */
        function report(node, importSource, importData, desiredName) {
            context.report({
                node: node,
                loc: importData.loc,
                messageId: desiredName
                    ? "restrictedImportWithSuggestion"
                    : "restrictedImport",
                data: {
                    name: importData.localName,
                    source: importSource,
                    desiredName: desiredName,
                },
            });
        }

        /**
         * Checks if the given imports of a given source are restricted and if so, reports them.
         *
         * @param {ASTNode} node
         * @param {string} importSource
         * @param {Map<string, ImportData>} importsByName
         * @param {Map<string, ImportData>} renamedImportsByLocalName
         * @returns {void}
         */
        function checkAndReport(
            node,
            importSource,
            importsByName,
            renamedImportsByLocalName
        ) {
            for (const { sourcesMatcher, restrictedImports } of options) {
                if (sourcesMatcher && !sourcesMatcher.ignores(importSource)) {
                    return;
                }

                for (const {
                    name: restrictedName,
                    desiredName,
                } of restrictedImports) {
                    // check if a restricted import was imported and not/incorrectly renamed
                    if (importsByName.has(restrictedName)) {
                        const importData = importsByName.get(restrictedName);
                        if (!importData.wasRenamed) {
                            report(node, importSource, importData, desiredName);
                        } else if (
                            desiredName &&
                            importData.localName !== desiredName
                        ) {
                            report(node, importSource, importData, desiredName);
                        }
                    }

                    // check if the renamed name of an import is restricted
                    if (renamedImportsByLocalName.has(restrictedName)) {
                        const importData =
                            renamedImportsByLocalName.get(restrictedName);
                        report(node, importSource, importData, desiredName);
                    }
                }
            }
        }

        /**
         * Information about an import specifier
         * 
         * @typedef {Object} ImportData
         * @property {Object} loc - the lines of code
         * @property {boolean} wasRenamed
         * @property {string} name - the import name
         * @property {string} localName - the local name (the same as `name` if `wasRenamed` is `false`)
         */

        /**
         * Checks a node to see if any problems should be reported.
         *
         * @param {ASTNode} node The node to check.
         * @returns {void}
         */
        function checkNode(node) {
            /** @type {string} */
            const importSource = node.source.value;
            /** @type {Map<string, ImportData>} */
            const importsByName = new Map();
            /** @type {Map<string, ImportData>} */
            const renamedImportsByLocalName = new Map();

            for (const specifier of node.specifiers) {
                /** @type {ImportData} */
                const importData = {
                    loc: specifier.loc,
                    wasRenamed: false,
                };

                switch (specifier.type) {
                    case "ImportSpecifier": {
                        const imported =
                            specifier.imported.type === "Identifier"
                                ? specifier.imported.name
                                : specifier.imported.value;

                        importData.name = imported;
                        importData.localName = specifier.local.name;

                        importData.wasRenamed =
                            specifier.local.name !== imported;

                        break;
                    }
                    case "ImportDefaultSpecifier":
                        importData.name = specifier.local.name;
                        importData.localName = specifier.local.name;
                        break;
                    case "ImportNamespaceSpecifier":
                        continue;
                }

                importsByName.set(importData.name, importData);
                if (importData.wasRenamed) {
                    renamedImportsByLocalName.set(
                        importData.localName,
                        importData
                    );
                }
            }

            checkAndReport(
                node,
                importSource,
                importsByName,
                renamedImportsByLocalName
            );
        }

        return {
            ImportDeclaration: checkNode,
        };
    },
};
