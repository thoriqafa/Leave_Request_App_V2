$(document).ready(function() {
    $('#table-leavetype').DataTable({
        ajax:{
            url: '/api/leavetype',
            dataSrc: ''
        },
        columns:[
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row+1;
                }
            },
            {
                data: 'name',
            },
            {
                data: 'day_num',
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailLeavetype" onclick="findById(${row.id})">
                        <i class="fa-solid fa-eye"></i>            
                    </button>
                    <button type="button" class="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#updateCountry" onclick="beforeUpdate(${row.id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    `;
                }
            }
        ]
    })
})

function findById(id) {
    $.ajax({
        url: "/api/leavetype/" + id,
        method: "GET",
        dataType: "JSON",
        success: (result) => {
            $("#leavetype-id").text(`${result.id}`)
            $("#leavetype-name").text(`${result.name}`)
            $("#leavetype-daynum").text(`${result.day_num}`)
        }
    })
}