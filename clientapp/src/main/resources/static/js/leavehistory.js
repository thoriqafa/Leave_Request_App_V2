$(document).ready(function(){
    $('#datatable-fixed-header').DataTable({
        ajax:{
            url: '/api/history',
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
                data: 'date'
            },
            {
                data: 'remarked',
                defaultContent:''
            },
            {
                data: 'employee.name'
            },
            {
                data: 'leaveStatus.name',
                defaultContent:''
            },
            {
                data: 'leaveRequest.employee.name'
            }
        ]
    });
});
