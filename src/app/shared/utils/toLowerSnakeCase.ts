const toLowerSnakeCase = (words: string) => {
  return words.toLowerCase().split(' ').join('_');
};

export default toLowerSnakeCase;
