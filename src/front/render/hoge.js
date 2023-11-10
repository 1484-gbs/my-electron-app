
document.addEventListener('DOMContentLoaded', async function () {
    let select = document.getElementById("position")
    let list = await window.testapi.getPositions()
    list.forEach(p => {
        let option = document.createElement("option")
        option.text = p.position_name
        option.value = p.position_id
        select.appendChild(option)
    });

    new gridjs.Grid({
        columns: [{
            id: "position_id",
            name: "ID",
            formatter: (cell) => gridjs.html(`<a href="hoge2.html?id=${cell}">${cell}</a>`),
        },
        {
            id: "position_name",
            name: "役職名"
        },
        {
            id: "role", name: "ロール"
        },
        {
            id: "display_order", name: "表示順"
        }],
        data: list,
        pagination: {
            limit: 5
        }
    }).render(document.getElementById('wrapper'));

    const button = document.getElementById('get_btn');
    button.addEventListener('click', async function (clickEvent) {
        var aaa = await window.testapi.getEmployee(document.getElementById("employeeId").value)
        console.log(aaa)
        document.getElementById("employeeId").value = aaa

    }, false);

    document.getElementById('create_excel').addEventListener('click', async function (clickEvent) {
        const data = [
            { id: 1, title: "吾輩は猫である", view: 123 },
            { id: 2, title: "坊っちゃん", view: 456 },
            { id: 3, title: "こころ", view: 789 }
        ]
        await window.testapi.createExcel(data)
    }, false);

});





