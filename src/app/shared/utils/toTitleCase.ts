const toTitleCase = (words: string, separator: string) => {
  return words
    .split(separator)
    .map((word: string) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

export default toTitleCase;
