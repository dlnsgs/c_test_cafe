const loginPage = require("../pageObjects/loginPage");
const homePage = require("../pageObjects/homePage");
const basketPage = require("../pageObjects/basketPage");
const informationPage = require("../pageObjects/informationPage");
const overviewPage = require("../pageObjects/overviewPage");

const chai = require("chai");
const expect = chai.expect;

Feature("Navigating Google");

Scenario("test something", async ({ I }) => {
  I.amOnPage("/");
  loginPage.checkInitialElements();
  loginPage.setUserCredentials("standard_user", "secret_sauce");
  loginPage.clickLoginButton();
  homePage.checkInitialElements();
  homePage.clickAddCardButtons();
  homePage.clickBasketButton();
  basketPage.checkInitialElements();
  basketPage.clickCheckoutButton();
  informationPage.checkInitialElements();
  informationPage.setInformation("Dilan", "Çavuşoğlu", "06810");
  informationPage.clickContinueButton();
  overviewPage.checkInitialElements();

  // Getting price of the first product
  let firstPrice = await I.executeScript(() => {
    return document
      .querySelector(
        "div.cart_list > div:nth-child(3) div.inventory_item_price"
      )
      .innerText.split("$")[1];
  });

  // Getting price of the second product
  let secondPrice = await I.executeScript(() => {
    return document
      .querySelector(
        "div.cart_list > div:nth-child(4) div.inventory_item_price"
      )
      .innerText.split("$")[1];
  });

  // Getting subtotal price (non-tax)
  let basketTotalPrice = await I.executeScript(() => {
    return document
      .querySelector("div.summary_subtotal_label")
      .innerText.split("$")[1];
  });

  // Assertion of the price
  const totalPrice = Number(firstPrice) + Number(secondPrice);
  expect(totalPrice).to.eq(Number(basketTotalPrice));
});
