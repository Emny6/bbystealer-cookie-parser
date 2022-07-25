const fs = require("fs");
const oshost = require("each-os");
const ncp = require("copy-paste");

if (!process.argv[2] || !process.argv[3]) return console.log("node main.js <cookies.txt> <cookiesresult.txt>");

(async () => {
    var new_cookies = "";
    fs.readFileSync(process.argv[2], 'utf-8').split(/\r?\n/).forEach((line) => {
        if (line.includes("COOKIES FROM:")) return;
        if (line == "" || line == undefined) return;
        var host = line.split("|")[0]?.replace("HOST KEY: ", "").trim();
        var name = line.split("|")[1]?.replace(" NAME: ", "").trim();
        var value = line.split("|")[2]?.replace(" VALUE: ", "").trim();
        new_cookies += host + "	" + "TRUE" + "	/" + "	FALSE" + "	2597573456	" + name + "	" + value + "\n"
    });
    console.log(new_cookies)
    fs.writeFile(process.argv[3], new_cookies, (err) => {
        if (err) console.log(err)
        console.log("Cookies saved and copied to the clipboard.")
    })
    ncp.copy(new_cookies, ()=>{})
})();