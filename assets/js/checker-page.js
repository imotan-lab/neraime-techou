(async () => {

const machine = await getMachine()
if(!machine) return

document.getElementById("checker-title").textContent =
machine.name + " チェッカー"

const target = machine.checker.target

document.getElementById("check-btn").onclick = () => {

const game = Number(document.getElementById("game").value)
const result = document.getElementById("result")

if(game >= target){
result.textContent = machine.checker.ok
}else{
result.textContent = machine.checker.ng
}

}

})()
