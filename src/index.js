import { create, insertMultiple, search } from "@orama/orama";
import { parse } from "acorn";
import { readFileSync } from "node:fs";
import { schema } from "./const.js";
import { traverse } from "./traverse.js";
import { writeFileSync } from "node:fs";

const eventjs = readFileSync("public/index.js", "utf-8");
const ast = parse(eventjs, { ecmaVersion: "latest", locations: true });
const flat = [];

traverse(ast, flat);

const db = await create({
  schema,
});

await insertMultiple(db, flat);

// find where SayHello Class is declared
const {
  hits: [classDeclaration],
} = await search(db, {
  term: "sayHello",
  properties: ["name"],
  where: {
    parentType: "ClassDeclaration",
  },
});

// find where SayHello Class is called
const {
  hits: [classCalled],
} = await search(db, {
  term: "sayHello",
  properties: ["name"],
  where: {
    parentType: "NewExpression",
  },
});

// find where sayHello function is declared
const {
  hits: [functionDeclaration],
} = await search(db, {
  term: "sayHello",
  properties: ["name"],
  where: {
    parentType: "FunctionDeclaration",
  },
});

// find where sayHello function is called
const {
  hits: [functionCalled],
} = await search(db, {
  term: "sayHello",
  properties: ["name"],
  where: {
    parentType: "CallExpression",
  },
});

// find where sayHello class property is defined
const {
  hits: [propertyDefinition],
} = await search(db, {
  term: "sayHello",
  properties: ["name"],
  where: {
    parentType: "PropertyDefinition",
  },
});

// search a variable that is const
const { hits: meetLet } = await search(db, {
  term: "meet",
  where: {
    parentType: "VariableDeclarator",
    kind: "let",
  },
});

// filter variable that is let
const { hits: meetConst } = await search(db, {
  term: "meet",
  where: {
    parentType: "VariableDeclarator",
    kind: "const",
  },
});

console.log("searchResult", searchResult);
console.log("classDeclaration", classDeclaration);
console.log("classCalled", classCalled);
console.log("propertyDefinition", propertyDefinition);
console.log("functionDeclaration", functionDeclaration);
console.log("functionCalled", functionCalled);
console.log("meetLet", meetLet);
console.log("meetConst", meetConst);
