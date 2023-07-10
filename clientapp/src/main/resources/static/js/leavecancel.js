$(document).ready(function () {
    $('#datatable-fixed-header').DataTable({
        ajax: {
            url: '/api/leaverequest/my?username=current',
            dataSrc: ''
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                data: 'start_date',
                defaultContent: '',
                render: function(data, type, row) {
                    if (type === 'display' && data !== null) {
                      return moment(data).format('DD MMMM YYYY');
                    }
                    return data;
                }
            },
            {
                data: 'end_date',
                defaultContent: '',
                render: function(data, type, row) {
                    if (type === 'display' && data !== null) {
                      return moment(data).format('DD MMMM YYYY');
                    }
                    return data;
                }
            },
            {
                data: 'duration',
                defaultContent: ''
            },
            {
                data: 'notes',
                defaultContent: ''
            },
            {
                data: 'employee.name',
                defaultContent: ''
            },
            {
                data: 'leaveType.name',
                defaultContent: ''
            },
            {
                data: 'leaveStatus.name',
                defaultContent: '',
                render: function (data, type, row, meta) {
                    let badgeClass = '';
                    let leaveStatusId = row.leaveStatus.id;

                    if (row.leaveStatus.name === "Pending") {
                    badgeClass = 'badge badge-warning';
                    } else if (row.leaveStatus.name === "Accepted") {
                    badgeClass = 'badge badge-success';
                    } else if (leaveStatusId === 3) {
                    badgeClass = 'badge badge-danger';
                    } else {
                    badgeClass = 'badge badge-secondary';
                    }

                    return `<span class="${badgeClass}">${row.leaveStatus.name}</span>`;
                }
            },
            {
                data: 'leaveStatus.id',
                defaultContent: '',
                render: function (data, type, row, meta) {
                    if (row.leaveStatus.id === 1) {
                        return `
                        <button type="button" class="btn btn-danger" data-toggle="modal" onclick="cancelRequest(${row.id})">
                            <i class="fa fa-remove"></i>
                        </button>                  
                        `;
                    } else {
                        return `
                        <button type="button" class="btn btn-danger" data-toggle="modal" onclick="cancelRequest(${row.id})" disabled>
                            <i class="fa fa-remove"></i>
                        </button>                                      
                        `;
                    }
                }
            }
        ]
    });    
});

function cancelRequest(id) {
    let remarked = "Congratulations !";

    let requestId, startDate, endDate, notes, attachment, employeeId, leaveTypeId;

    $.ajax({
        url: "/api/leaverequest/" + id,
        method: "GET",
        dataType: "JSON",
        success: (result) => {
           requestId = result.id;
           startDate = result.start_date;
           endDate = result.end_date;
           notes = result.notes;
           attachment = result.attachment;
           employeeId = result.employee.id;
           leaveTypeId = result.leaveType.id;
        },
    });

    Swal.fire({
        title: "Are you sure?",
        text: "Want to approve this request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/api/leaverequest/cancel/" + requestId,
                method: "PUT",
                dataType: "JSON",
                contentType: "application/json",
                beforeSend: addCsrfToken(),
                data: JSON.stringify({
                    start_date: startDate,
                    end_date: endDate,
                    notes: notes,
                    attachment: attachment,
                    employee: {
                        id: employeeId
                    },
                    leaveType: {
                        id: leaveTypeId
                    },
                    remarked: remarked,
                }),
                success: (result) => {
                    $("#approveLeave").modal("hide");
                    $("#datatable-fixed-header").DataTable().ajax.reload();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your request has been approved.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            });
        }
    });
}
