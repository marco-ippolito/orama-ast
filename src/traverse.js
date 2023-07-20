import { randomUUID } from "node:crypto";
import { fieldsToFlatten, fieldsToPick } from "./const.js";

export function traverse(node, results, parentId, parentType, field) {
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

  for (const field of fieldsToFlatten) {
    const child = node[field];
    if (child) {
      if (Array.isArray(child)) {
        for (const el of child) {
          traverse(el, results, id, type, field);
        }
      } else {
        traverse(child, results, id, type, field);
      }
    }
  }
}
