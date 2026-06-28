export const isEmail = (value = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

export const isPhone = (value = "") =>
  /^[6-9]\d{9}$/.test(String(value).trim());

export const isPincode = (value = "") => /^\d{6}$/.test(String(value).trim());

export const isNonEmpty = (value = "") => String(value).trim().length > 0;

export const passwordIssues = (value = "") => {
  const issues = [];
  if (value.length < 6) issues.push("at least 6 characters");
  if (!/[A-Za-z]/.test(value)) issues.push("a letter");
  if (!/\d/.test(value)) issues.push("a number");
  return issues;
};

export const passwordStrength = (value = "") => {
  let score = 0;
  if (value.length >= 6) score++;
  if (value.length >= 10) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return Math.min(score, 4); // 0..4
};
