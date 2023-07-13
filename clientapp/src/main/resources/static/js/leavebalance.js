$(document).ready(function () {
    $.ajax({
        url: "/api/leavebalance/my?username=current",
        type: "GET",
        success: function(data) {
            // Mengisi nilai current_year dan last_year ke dalam input
            $('#current-year').val(data.current_year);
            $('#last-year').val(data.last_year);
            $('#total-year').val(data.last_year + data.current_year);
        }
    });   
});