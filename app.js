const dropdowns = document.querySelectorAll(".dropdown select");
const convertBtn = document.querySelector(".convertBtn button");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currCode;
    newoption.value = currCode;
    if (select.name === "from" && currCode === "NPR") {
      newoption.selected = "selected";
    } else if (select.name === "to" && currCode === "AUD") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

convertBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtValue = amount.value;
  const msg = document.querySelector(".msg");
  const fromCurr = document.querySelector(".from select").value.toLowerCase();
  const toCurr = document.querySelector(".to select").value.toLowerCase();

  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = "1";
  }
  async function conversion() {
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr}.min.json`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      const rate = data[fromCurr][toCurr];

      return rate * amtValue;
    } catch (error) {
      console.error("Conversion faied!", error);
      return null;
    }
  }

  const result = await conversion();

  if (result !== null) {
    msg.innerHTML = `<span style="font-size: 0.7rem; color: #000;">${toCurr.toUpperCase()}</span> <span style="font-size: 1rem; color: #000; font-weight: 1000;">${result.toFixed(
      2
    )}</span>`;
  }
});
