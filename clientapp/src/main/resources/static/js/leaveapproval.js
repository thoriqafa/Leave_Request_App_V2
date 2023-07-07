$(document).ready(function () {
    $('#datatable-fixed-header').DataTable({
        ajax: {
            url: '/api/leaverequest',
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
                data: 'start_date'
            },
            {
                data: 'end_date'
            },
            {
                data: 'duration'
            },
            {
                data: 'notes'
            },
            {
                data: 'employee.name'
            },
            {
                data: 'leaveType.name'
            },
            {
                data: 'leaveStatus.name',
                defaultContent: ''
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailCountry" onclick="findById(${row.id})">
                        <i class="fa fa-eye"></i>            
                    </button>
                    <button type="button" class="btn btn-warning mx-2" data-toggle="modal" data-target="#approveLeave" onclick="beforeUpdate(${row.id})">
                        <i class="fa fa-pencil-square-o"></i>
                    </button>                  
                    `;
                }
            }
        ]
    });
    $.ajax({
        url: "/api/leavestatus",
        type: "GET",
        success: function (data) {
            var leaveStatusDrop = $("#apr-leave-status");
            $.each(data, function (index, leaveStatus) {
                leaveStatusDrop.append("<option value='" + leaveStatus.id + "'>" + leaveStatus.name + "</option>");
            });
        }
    });
});

function findById(id) {
    $.ajax({
        url: "/api/leaverequest" + id,
        method: "GET",
        dataType: "JSON",
        success: (result) => {
            $("#app-leave-id").text(`${result.id}`);
            $("#app-leave-start-date").text(`${result.start_date}`);
            $("#app-leave-end-date").text(`${result.end_date}`);
            $("#app-leave-notes").text(`${result.notes}`);
            $("#app-leave-attachment").text(`${result.attachment}`);
            $("#app-leave-employee").text(`${result.employee.id}`);
            $("#app-leave-type").text(`${result.leaveType.id}`);
            $("#app-leave-remarked").text(`${result.remarked}`);
            $("#apr-leave-status").text(`${result.leaveStatus.id}`);
        },
    });
}

function beforeUpdate(id) {
    $.ajax({
        url: "/api/leaverequest/" + id,
        method: "GET",
        dataType: "JSON",
        success: (result) => {
            $("#app-leave-id").val(`${result.id}`);
            $("#app-leave-start-date").val(`${result.start_date}`);
            $("#app-leave-end-date").val(`${result.end_date}`);
            $("#app-leave-notes").val(`${result.notes}`);
            $("#app-leave-attachment").val(`${result.attachment}`);
            $("#app-leave-employee").val(`${result.employee.id}`);
            $("#app-leave-type").val(`${result.leaveType.id}`);
            // $("#app-leave-remarked").val(`${result.remarked}`);
            $("#apr-leave-status").val(`${result.leaveStatus.id}`);
        },
    });
}

function update() {
    let id = $("#app-leave-id").val();
    let remarked = $("#app-leave-remarked").val();
    let leave_status = $("#apr-leave-status").val();
    let start_date = $("#app-leave-start-date").val();
    let end_date = $("#app-leave-end-date").val();
    let notes = $("#app-leave-notes").val();
    let attachment = $("#app-leave-attachment").val();
    let employee = $("#app-leave-employee").val();
    let leave_type = $("#app-leave-type").val();
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to approve this request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/api/leaverequest/" + id,
                method: "PUT",
                dataType: "JSON",
                contentType: "application/json",
                beforeSend: addCsrfToken(),
                data: JSON.stringify({
                    start_date: start_date,
                    end_date: end_date,
                    attachment: attachment,
                    notes: notes,
                    employee: {
                        id: employee
                    },
                    leaveType: {
                        id: leave_type
                    },
                    remarked: remarked,
                    leaveStatus: {
                        id: leave_status
                    },
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