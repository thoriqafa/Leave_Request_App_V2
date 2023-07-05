$(document).ready(function(){
    $('#datatable-fixed-header').DataTable({
        ajax:{
            url: '/api/user',
            dataSrc: ''            
        },
        columns:[
            {
                data: null,
                render: function(data, type, row, meta){
                    return meta.row+1;
                }
            },
            {
                data: 'username',
                render: function(data){
                    return `<span class="text-capitalize">${data}</span>`
                }
            },
            {
                data: 'role.name'
            },
            {
                data: 'null',
                render: function(data, type, row, meta){
                    return`
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailCountry" onclick="findById(${row.id})">
                        <i class="fa-solid fa-eye"></i>            
                    </button>
                    <button type="button" class="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#updateCountry" onclick="beforeUpdate(${row.id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>                  
                    `;
                }
            }
        ]
    });
});