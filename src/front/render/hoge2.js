
document.addEventListener('DOMContentLoaded', async function () {
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams)
    const positionId = searchParams.get("id");
    if (positionId) {
        const position = await window.testapi.getPosition(positionId) ?? []
        console.log(position)
        console.log(position[0])
        document.getElementById("position_id").value = position[0].position_id
        document.getElementById("position_name").value = position[0].position_name
        document.getElementById("role").value = position[0].role
        document.getElementById("display_order").value = position[0].display_order
    } else {
        document.getElementById('delete_position').disabled = true
    }

    document.getElementById('register_position').addEventListener('click', async function (clickEvent) {
        const input = {
            position_id: document.getElementById("position_id").value,
            position_name: document.getElementById("position_name").value,
            role: document.getElementById("role").value,
            display_order: document.getElementById("display_order").value
        }

        let result 
        if (input.position_id !== "") {
            result = await window.testapi.updatePosition(input)
        } else {
            result = await window.testapi.createPosition(input)
        }
        console.log(result)
        if (result) back()

    }, false);

    document.getElementById('back').addEventListener('click', async function (clickEvent) {
        back()
    }, false);

    document.getElementById('delete_position').addEventListener('click', async function (clickEvent) {
        const position_id = document.getElementById("position_id").value
        let result = true
        if (position_id !== "") {
            result = await window.testapi.deletePosition(document.getElementById("position_id").value)
        }
        if(result) back()
    }, false);

    back = function () {
        window.location.href = "hoge.html"
    }
});





