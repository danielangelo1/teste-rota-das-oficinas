let numbers = [
  { number: 1000, roman: "M" },
  { number: 900, roman: "CM" },
  { number: 500, roman: "D" },
  { number: 400, roman: "CD" },
  { number: 100, roman: "C" },
  { number: 90, roman: "XC" },
  { number: 50, roman: "L" },
  { number: 40, roman: "XL" },
  { number: 10, roman: "X" },
  { number: 9, roman: "IX" },
  { number: 5, roman: "V" },
  { number: 4, roman: "IV" },
  { number: 1, roman: "I" },
];

const arabicInput = document.getElementById("arabicNumber");
const romanInput = document.getElementById("romanNumber");

arabicInput.addEventListener("input", (e) => {
  romanInput.value = arabicToRoman(e.target.value);
});
romanInput.addEventListener("input", (e) => {
  arabicInput.value = romanToArabic(e.target.value);
});

function arabicToRoman(arabicNumber) {
  let romamNumber = "";
  if (arabicNumber > 3999 || arabicNumber < 0)
    alert("O número deve estar entre 1 e 3999");
  else {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i].number <= arabicNumber) {
        romamNumber += numbers[i].roman;
        arabicNumber -= numbers[i].number;
        i--;
      }
    }
    return romamNumber;
  }
}

function romanToArabic(romanNumber) {
  let arabicNumber = 0;
  for (let i = 0; i < numbers.length; i++) {
    while (romanNumber.indexOf(numbers[i].roman) === 0) {
      arabicNumber += numbers[i].number;
      romanNumber = romanNumber.replace(numbers[i].roman, "");
    }
  }
  return arabicNumber;
}