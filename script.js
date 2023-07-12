var list = ['tse_2330.tw'];
document.getElementById("add").addEventListener("click", add);
document.getElementById("delete").addEventListener("click", _delete);
async function fetchData() {

    var record;
    chrome.storage.local.get(["data"]).then((result) => {
        record = result.data;

        const tableObject = document.getElementById("mytable");

        var rowCount = tableObject.rows.length - 1;
        var respLen = (record) ? record.length : 0;

        while (rowCount != respLen) {

            if (rowCount > respLen) {
                tableObject.deleteRow(rowCount--);
            }
            else {
                addRow();
                rowCount++;
            }
        }

        for (let i = 0; i < record.length; i++) {
            tableObject.rows[i + 1].cells[0].innerHTML = record[i].c;
            tableObject.rows[i + 1].cells[1].innerHTML = record[i].n;
            tableObject.rows[i + 1].cells[2].innerHTML = record[i].v;
            tableObject.rows[i + 1].cells[3].innerHTML = record[i].curPrice;
            tableObject.rows[i + 1].cells[4].innerHTML = record[i].y;
            tableObject.rows[i + 1].cells[5].innerHTML = record[i].priceChange;
        }
        // document.getElementById("companyId").innerHTML = record.msgArray[0].c;
        // document.getElementById("companyName").innerHTML = record.msgArray[0].n;
        // document.getElementById("Volume").innerHTML = record.msgArray[0].v;
        // document.getElementById("curPrice").innerHTML = record.msgArray[0].z;
        // document.getElementById("yesClose").innerHTML = record.msgArray[0].y;


    });
}

function addRow() {
    var table = document.getElementById("mytable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = rowCount;
    cell2.innerHTML = rowCount;
    cell3.innerHTML = rowCount;
    cell4.innerHTML = rowCount;
    cell5.innerHTML = rowCount;
    cell6.innerHTML = rowCount;
}


function add() {


    chrome.storage.local.get(["list"]).then((result) => {
        let list = result.list;
        let _companyid = "tse_" + document.getElementById('textbox_id').value + ".tw";
        var _flag = true;
        for (var i = 0; i < list.length; i++) {
            if (list[i] === _companyid) {
                _flag = false;
                break;
            }
        }
        if (_flag) list.push(_companyid);
        else console.log("duplicate");

        chrome.storage.local.set({ "list": list }).then(() => {
            console.log("Value is set");
        });

        clearInputBox();
    });
}

function _delete() {

    chrome.storage.local.get(["list"]).then((result) => {
        let list = result.list;
        let _companyid = "tse_" + document.getElementById('textbox_id').value + ".tw";
        for (var i = 0; i < list.length; i++) {
            if (list[i] === _companyid) {
                list.splice(i, 1);
            }
        }
        chrome.storage.local.set({ "list": list }).then(() => {
            console.log("Value is set");
        });
        clearInputBox();
    });
}

function clearInputBox() {
    document.getElementById('textbox_id').value = "";
}

// fetchData();

var inverval_timer;

//Time in milliseconds [1 second = 1000 milliseconds ]    
inverval_timer = setInterval(function () {
    fetchData();
}, 5000);

//IF you want to stop above timer
function stop_timer() {
    clearInterval(inverval_timer);
}
