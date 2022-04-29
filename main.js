// import puppeteer module
const puppeteer=require("puppeteer");
const credential=require("./credential");

let cTab;

//     (1). For launch the browser there is a function of puppeteer module launch()
let browserOpenPromise=puppeteer.launch(
    {
        headless:false,             // agr false hai toh browser window show hogi otherwise nhi
        defaultViewport:null,
        args:["--start-maximized"],
    }
);

// if prosime fullfil toh lunch() hume browser object dega(mtlb bo ek function call krega object parameter daal ke)
browserOpenPromise.then(function (browser_Object) {
    console.log("browser is open");
    // console.log(browser);   browser is an object
    //An array of all open pages inside the Browser.
    let allTabsPromise = browser_Object.pages();
    return allTabsPromise;
  })
   .then(function(allTabsArr) {
    cTab = allTabsArr[0];
    console.log("new tab");
    let visitingLoginPagePromise = cTab.goto("https://www.hackerrank.com/auth/login");
    return visitingLoginPagePromise;
  })
  // if hackerrank open successfully than ---
  .then(function () {
    // this is type email in email input box
    let emailTypedPromise=cTab.type("#input-1",credential.email);
    return emailTypedPromise;
  })
    // if email typed successfully than----
  .then(function () {
    // this is for type password
     let passwordTypedPromise=cTab.type("#input-2",credential.password);
     return passwordTypedPromise;
  })
  // if password typed successfully than----
  .then(function () {
    // now its time to click on login
    let clickOnLoginPromise=cTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return clickOnLoginPromise;
  })
  .then( function () {
    console.log("I m reached inside my hackerrank profile");
    // this method to select the algorithms is not work because automation is very fast jb tak page load hoga tb tak clickOnAlgoriths bolega muje algorithm selector do but page dheere dheere load hota hai as compare to automation
    // let clickOnAlgorithm=cTab.click(`"div[data-automation="algorithms"]`);
    // return clickOnAlgorithm;
    //======== Solution:-  ki hum wait krege jb tak algorithm selector load na ho jaye
    let waitForSelectorPromise = cTab.waitForSelector(`div[data-automation="algorithms"]`);
    waitForSelectorPromise
      .then(function () {
        console.log("algo btn is found yooooooooooooooooooooooooo!!!!!!!");
        let clickPromise = cTab.click(`div[data-automation="algorithms"]`);
        return clickPromise;
      })
      .then(function () {
        console.log("algo btn is clicked");
      })
  })








  .catch(function (err) {
    console.log(err);
  })
