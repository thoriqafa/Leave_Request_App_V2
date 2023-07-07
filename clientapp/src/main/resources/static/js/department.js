$(document).ready(function(){
    $('#datatable-fixed-header').DataTable({
        ajax: {
            url: '/api/department',
            dataSrc: ''
        },
        columns: [
            {
                data: null,
                render: function(data, type, row, meta){
                    return meta.row+1;
                }
            },
            {
                data: 'name'
            },
            {
                data: 'employee.name',
                render: function(data, type, row){
                    if (row.employee) {
                        return row.employee.name;
                    }
                    return '';
                }
            },
            {
                data: null,
                render: function(data, type, row, meta){
                    return `
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailCountry" onclick="findById(${row.id})">
                        <i class="fa fa-eye"></i>           
                    </button>
                    <button type="button" class="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#updateCountry" onclick="beforeUpdate(${row.id})">
                        <i class="fa fa-pencil-square-o"></i>
                    </button>                  
                    `;
                }
            }
        ]
    });
});
