export const highlightMatches = (text: string, searchTerm: string) => {
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(
    regex,
    (match) => `<span class="highlight">${match}</span>`
  );
};
