import { randomUUID } from "node:crypto";
import { fieldsToTraverse, fieldsToPick } from "./const.js";

export function traverse(node, results, parentId, parentType, field, kind) {
  const id = randomUUID();

  const accumulator = {
    parentType,
    parentId,
    id,
    field,
  };

  const res = fieldsToPick.reduce((acc, prop) => {
    acc[prop] = node[prop];
    return acc;
  }, accumulator);

  results.push(res);

  const type = res.type;

  if (type === "VariableDeclaration") {
    kind = res.kind;
  } else if (kind) {
    res.kind = kind;
  }

  for (const field of fieldsToTraverse) {
    const child = node[field];
    if (child) {
      if (Array.isArray(child)) {
        for (const el of child) {
          traverse(el, results, id, type, field, kind);
        }
      } else {
        traverse(child, results, id, type, field, kind);
      }
    }
  }
}
