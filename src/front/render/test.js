
document.addEventListener('DOMContentLoaded', async function () {
    let select = document.getElementById("position")
    let list
    try {
        list = await window.testapi.getPositions()
    } catch (err) {
        alert("エラーが発生しました" + err)
        return
    }
    list.forEach(p => {
        let option = document.createElement("option")
        option.text = p.position_name
        option.value = p.position_id
        select.appendChild(option)
    })

    const button = document.getElementById('get_btn');
    button.addEventListener('click', async function (clickEvent) {
        try {
            console.log('eventlistener')
            var aaa = await window.testapi.getEmployee(document.getElementById("employeeId").value)
            console.log(aaa)
            document.getElementById("employeeId").value = aaa
        } catch (err) {
            alert("エラーが発生しました" + err)
            return
        }
    }, false);

    document.getElementById('create_excel').addEventListener('click', async function (clickEvent) {
        try {
            const data = [
                { id: 1, title: "吾輩は猫である", view: 123 },
                { id: 2, title: "坊っちゃん", view: 456 },
                { id: 3, title: "こころ", view: 789 }
            ]
            await window.testapi.createExcel(data)
        } catch (err) {
            alert("エラーが発生しました" + err)
            return
        }
    }, false);

});





