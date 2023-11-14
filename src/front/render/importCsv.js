
document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('import_csv').addEventListener('click', async function (clickEvent) {
        await window.testapi.importCsv([])
    }, false);

});





