const request = require("request-promise").defaults({
  jar: true,
  simple: false,
});
const cheerio = require("cheerio");
const fs = require("fs");
// const puppeteer = require("puppeteer-core");

const loginPageURL =
  "https://sso.hcmut.edu.vn/cas/login?service=http%3A%2F%2Fmybk.hcmut.edu.vn%2Fstinfo%2F";
const lichHocURL = `https://mybk.hcmut.edu.vn/stinfo/lichthi/ajax_lichhoc`;
async function main() {
  try {
    let res = await request.get(loginPageURL);
    let $ = cheerio.load(res);
    // Get key attribute
    const lt = $("input[name='lt']").attr("value");
    const execution = $("input[name='execution']").attr("value");
    const _eventId = $("input[name='_eventId']").attr("value");
    // Data to POST
    const data = {
      username: "tu.phananhtu12st",
      password: "2001stKh",
      lt,
      execution,
      _eventId,
      submit: "Đăng nhập",
    };
    console.log("data", data);
    // Get to login and redirect to info page
    res = await request.post(loginPageURL, { form: data });
    res = await request.get(`https://mybk.hcmut.edu.vn/stinfo/`);
    // fs.writeFileSync("./index.html", res);
    // Get token to send POST to get TKB data
    $ = cheerio.load(res);
    const _token = $('meta[name="_token"]').attr("content");
    // Get JSON data
    res = await request.post(lichHocURL, { form: { _token } });
    const resJson = JSON.parse(res)[0];

    console.log(resJson);
    fs.writeFileSync("./data.json", res);
  } catch (err) {
    // console.log("ERROR:", err);
    return err;
  }
  // Example POST method implementation:

  // fetch(loginPageURL, {
  //   method: "GET", // *GET, POST, PUT, DELETE, etc.
  //   mode: "cors", // no-cors, *cors, same-origin
  //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: "same-origin", // include, *same-origin, omit
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": null,
  //   },
  //   redirect: "follow", // manual, *follow, error
  //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   // body: JSON.stringify(data), // body data type must match "Content-Type" header
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // await page.goto(loginPageURL);
  // await page.evaluate(() => {
  //   document.getElementsByClassName(".username").value = "tu.phananhtu12st";
  //   document.getElementsByClassName(".password").value = "2001stKh";
  //   document.getElementsByClassName(".btn-submit").click();
  // });
  // // await page.screenshot({ path: "example.png" });

  // await browser.close();
}
main();
