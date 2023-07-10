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
                data: 'date',
                defaultContent:'',
                render: function(data, type, row) {
                    if (type === 'display' && data !== null) {
                      return moment(data).format('DD MMMM YYYY');
                    }
                    return data;
                }
            },
            {
                data: 'remarked',
                defaultContent:''
            },
            {
                data: 'employee.name',
                defaultContent:''
            },
            {
                data: 'leaveRequest.employee.name',
                defaultContent:''
            },
            {
                data: 'leaveStatus.name',
                defaultContent:'',
                render: function (data, type, row, meta) {
                    let badgeClass = '';
                    let leaveReqStatusId = row.leaveRequest.leaveStatus.id;

                    if (row.leaveRequest.leaveStatus.name === "Pending") {
                    badgeClass = 'badge badge-warning';
                    } else if (row.leaveRequest.leaveStatus.name === "Accepted") {
                    badgeClass = 'badge badge-success';
                    } else if (leaveReqStatusId === 3) {
                    badgeClass = 'badge badge-danger';
                    } else {
                    badgeClass = 'badge badge-secondary';
                    }

                    return `<span class="${badgeClass}">${row.leaveRequest.leaveStatus.name}</span>`;
                }
            },            
            {
                data: null,
                defaultContent: '',
                render: function (data, type, row, meta) {                                                                                                       
                    return `
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailHistory" onclick="findById(${row.id})">
                            <i class="fa fa-eye"></i>           
                        </button>                                         
                        `;
                }
            }
        ]
    });
});

function findById(id) {
    $.ajax({
      url: "/api/history/" + id,
      method: "GET",
      dataType: "JSON",
      success: (result) => {
        const startDate = moment(result.leaveRequest.start_date).format('DD MMMM YYYY');
        const endDate = moment(result.leaveRequest.end_date).format('DD MMMM YYYY');
        
        $("#history-id").text(result.id);
        $("#history-start-date").text(startDate);
        $("#history-end-date").text(endDate);
      },
    });
  }
