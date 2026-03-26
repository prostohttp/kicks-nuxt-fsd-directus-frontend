const formatterRUB = createCurrencyFormatter("RUB");

export function formatRUB(num?: number) {
  return num ? formatterRUB.format(num) : undefined;
}

const formatterUSD = createCurrencyFormatter("USD");

export function formatUSD(num?: number) {
  return num ? formatterUSD.format(num) : undefined;
}

function createCurrencyFormatter(currency: string) {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
