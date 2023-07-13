$(document).ready(function () {
    $('#table-myrequest').DataTable({
        scrollX: true,
        scrollY: '260px',
        scrollCollapse: true,
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
                render: function (data, type, row) {
                    if (type === 'display' && data !== null) {
                        return moment(data).format('DD MMMM YYYY');
                    }
                    return data;
                }
            },
            {
                data: 'end_date',
                defaultContent: '',
                render: function (data, type, row) {
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
                        <button title="history" type="button" class="btn btn-primary" data-target="#detailHistory" data-toggle="modal" onclick="histRequest(${row.id})">
                            <i class="fa fa-eye"></i>
                        </button>                  
                        <button title="cancel" type="button" class="btn btn-danger" data-toggle="modal" onclick="cancelRequest(${row.id})">
                            <i class="fa fa-remove"></i>
                        </button>
                        `;
                    } else {
                        return `
                        <button title="history" type="button" class="btn btn-primary" data-target="#detailHistory" data-toggle="modal" onclick="histRequest(${row.id})">
                            <i class="fa fa-eye"></i>
                        </button>                                       
                        <button title="cancel" type="button" class="btn btn-danger" data-toggle="modal" onclick="cancelRequest(${row.id})" disabled>
                            <i class="fa fa-remove"></i>
                        </button>                                      
                        </button>
                        `;
                    }                 
                }
            }
        ]
    });
});

function histRequest(id) {
    $.ajax({
        url: "/api/history/getMyHistory/" + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            var list = $('#historyTimeline');
            var html = ""; // Membuat variabel string kosong

            for (var i = 0; i < data.length; i++) {
                var tgl = data[i].date;
                var employee = data[i].employee.name;
                var remarked = data[i].remarked;
                var role = data[i].employee.user.role.name;
                var leaveStatus = data[i].leaveStatus.name;
                var leaveRequestStart = data[i].leaveRequest.start_date;
                var leaveRequestEnd = data[i].leaveRequest.end_date;

                // Menggabungkan elemen HTML ke dalam variabel html
                html += `<li>
                    <div class="block">
                        <div class="tags">
                            <p class="tag">
                                <span>${tgl}</span>
                            </p>
                        </div>
                        <div class="block_content">
                            <h2 class="title">
                                <a>${leaveStatus}</a>
                            </h2>
                            <div class="byline">
                                <span>Processed</span> by <a>${employee}</a> as ${role}
                            </div>
                            <p class="excerpt">Telah di ${leaveStatus} oleh ${employee} untuk melakukan cuti mulai ${leaveRequestStart} hingga ${leaveRequestEnd} dengan catatan ${remarked}</a>
                            </p>
                        </div>
                    </div>
                </li>`;
            }

            // Menambahkan semua elemen HTML ke dalam elemen list
            list.html(html);
        }
    });
}


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
        text: "Want to Cancel this request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
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
                    $("#table-myrequest").DataTable().ajax.reload();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your request has been canceled.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            });
        }
    });
}
