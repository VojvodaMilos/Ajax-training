const tableDiv = document.querySelector(".tableDiv");
const allLink = document.querySelectorAll(".allLink a");
let url = "https://mysafeinfo.com/api/data?list=fifachamptionsmensoccer&format=json&case=default";
const reload = {}

allLink.forEach(link => {
    link.addEventListener("click", SendRequest)
})

function SendRequest(e) {
    e.preventDefault()
    url = this.getAttribute("href")
    let name = this.innerText
    if (!reload.hasOwnProperty(this.innerText)) {
        takeData(this.innerText)
    } else {
        createTable(reload[name])
    }
}

takeData("Sport")

function takeData(rep) {
    tableDiv.innerHTML = `<img class="img" src='giphy.gif'>`
    let xml = new XMLHttpRequest()
    xml.open("get", url)
    xml.onreadystatechange = function () {
        if (xml.readyState === 4 && xml.status === 200) {
            const data = JSON.parse(xml.responseText)
            createTable(data)
            reload[rep] = data;
        }
    }
    xml.send()
}

function createTable(data) {
    let text = ``;

    text += `<table class= "table">`
    text += `<thead>`
    text += `<tr>`
    for (const key in data[0]) {
        text += ` <th scope="col">${key}</th>`
    }
    text += `</tr>`
    text += `</thead>`

    text += `</body>`
    data.forEach(d => {
        text += `<tr>`
        for (const key in d) {
            text += ` <td scope="col">${d[key]}</td>`
        }
        text += `</tr>`
    })
    text += `</tbody>`
    text += `</table>`
    tableDiv.innerHTML = text
}