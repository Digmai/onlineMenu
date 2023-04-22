//Отношение 100 используется, потому что чаще всего валютные значения хранятся в базе данных
// как целочисленные значения в копейках (в России, например, копейка – это сотая часть рубля).
// Поэтому, чтобы перевести целочисленное значение из базы данных в осмысленное
// значение валюты, нужно разделить его на 100.

//Например, если в базе данных хранится значение 5499 (в копейках),
// то для получения значения в рублях нужно разделить его на 100,
//  что даст значение 54.99 рубля.

//В общем случае, для перевода валютных значений из целочисленной формы в строковую форму
//  удобнее использовать деление на 100, что соответствует разделению на десять дважды.
//  Это связано с тем, что в более крупных валютах, таких как доллар или евро,
// копейки обычно обозначаются с двумя десятичными знаками после запятой,
//  а не целочисленной частью (например, 1.99 доллара, а не 199 центов).

export const formatCurrency = (value: number) => {
  return `$${(value / 100).toFixed(2)}`;
};
