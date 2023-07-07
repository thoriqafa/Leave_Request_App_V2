$(document).ready(function(){
    $.ajax({
        url: "/api/leavetype",
        type: "GET",
        success: function(data) {
            // Memperbarui elemen dropdown Region
            var leaveTypeDrop = $("#apr-leave-type");
            $.each(data, function(index, leaveType) {
                leaveTypeDrop.append("<option value='" + leaveType.id + "'>" + leaveType.name + "</option>");
            });
        }
    });
    
    // Notes character count
    $("#crt-notes").on("input", function() {
        let currentLength = $(this).val().length;
        $("#char-count").text(currentLength + " / 200 characters");
    });
});

function create() {
    let start_date = $('#start-date').val()
    let end_date = $('#end-date').val()
    let leave_type = $('#apr-leave-type').val()
    let notes = $('#crt-notes').val()
    $.ajax({
        url: "/api/leaverequest",
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
            start_date: start_date,
            end_date: end_date,
            leaveType: {
                id: leave_type
            },
            notes: notes
        }),
        success: (result) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Leave has been created',
                showConfirmButton: false,
                timer: 1500
            })
        }
    });
}