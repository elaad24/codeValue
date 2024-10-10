import { productInterface } from "../components/ItemsSection";

function generateNGrams(text: string, n: number): string[] {
  const nGrams: string[] = [];
  for (let i = 0; i <= text.length - n; i++) {
    nGrams.push(text.slice(i, i + n).toLowerCase());
  }
  return nGrams;
}

export function nGramSearch(
  items: productInterface[],
  searchValue: string,
  n: number = 2
): productInterface[] {
  const searchNGrams = generateNGrams(searchValue, n);

  return items.filter((item) => {
    const titleNGrams = generateNGrams(item.name, n);
    let descriptionNGrams: string | string[] = [];
    if (item.description) {
      descriptionNGrams = generateNGrams(item.description, n);
    }

    return searchNGrams.some(
      (ngram) =>
        titleNGrams.includes(ngram) || descriptionNGrams.includes(ngram)
    );
  });
}
