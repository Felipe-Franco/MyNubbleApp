function capitalizeFirstLetter(value: string) {
  return value
    .trim()
    .split(RegExp('\\s+'))
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const stringUtils = {
  capitalizeFirstLetter,
}
