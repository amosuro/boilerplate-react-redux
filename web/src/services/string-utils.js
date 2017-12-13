export const snakeCaseToCamelCase = (value) => value.replace(/-\w/g, m => m[1].toUpperCase());

