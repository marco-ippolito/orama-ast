export const fieldsToTraverse = [
  "body",
  "declarations",
  "arguments",
  "expressions",
  "quasis",
  "property",
  "object",
  "id",
  "init",
  "expression",
  "callee",
  "params",
  "key",
  "value",
  "left",
  "right",
];

export const fieldsToPick = ["name", "kind", "value", "type", "loc"];

export const schema = {
  parentType: "string",
  parentId: "string",
  id: "string",
  field: "string",
  name: "string",
  type: "string",
  kind: "string",
};
