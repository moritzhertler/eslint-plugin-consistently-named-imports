/**
 * @fileoverview Enforce specified modules to be renamed consistently when loaded by import
 * @author Moritz Hertler
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports = {
    meta: {
        name: "eslint-plugin-consistently-renamed-imports",
        version: "0.1.0"
    },
    rules: requireIndex(__dirname + "/rules")
}
