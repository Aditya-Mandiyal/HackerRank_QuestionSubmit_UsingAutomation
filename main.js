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
  .then(function () {
    console.log("Hackerrank login page opened");
    let emailTypedPromise=cTab.type("#input-1",credential.email);
    return emailTypedPromise;
  })
  .then(function () {
    console.log("Email Typed Successfully");
     let passwordTypedPromise=cTab.type("#input-2",credential.password);
     return passwordTypedPromise;
  })
  .then(function () {
    console.log("Password Typed Successfully");
    let clickOnLoginPromise=cTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return clickOnLoginPromise;
  })
  .then( function () {
    console.log("I m reached inside my hackerrank profile");
    let clickOnAlgoPromise=waitForSelector('div[data-automation= "algorithms" ]')
    return clickOnAlgoPromise;
  })
  // .then(function () {
  //   console.log("Algo Opened successfully");
  // })
  

// function waitForSelector ------>
// function waitForSelector(Algo_button_selector) {
//   let promise=new promise(function (resolve) {
    
//   })
// }
