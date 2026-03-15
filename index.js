fetch("assets/data/machines.json")
.then(res=>res.json())
.then(data=>{

const list = document.getElementById("machine-list")

data.forEach(m=>{

const li = document.createElement("li")

const article = document.createElement("a")
article.href = "machine.html?slug=" + m.slug
article.textContent = m.name

const checker = document.createElement("a")
checker.href = "checker.html?slug=" + m.slug
checker.textContent = "チェッカー"

li.appendChild(article)
li.appendChild(document.createTextNode(" | "))
li.appendChild(checker)

list.appendChild(li)

})

})
