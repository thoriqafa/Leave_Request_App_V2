$(document).ready(function () {
    $.ajax({
        url: "/api/employee",
        method: "GET",
        dataType: "JSON",
        success: function (data) {            
            $("#user-count").text(`${data.length}`);   
        }
    })

    $.ajax({
        url: "/api/leaverequest",
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            let filteredPending = data.filter(request => request.leaveStatus.id === 1);
            $("#pending-count").text(`${filteredPending.length}`);
            
            let filteredApproved = data.filter(request => request.leaveStatus.id === 2);
            $("#approved-count").text(`${filteredApproved.length}`);
            
            let filteredRejected = data.filter(request => request.leaveStatus.id === 3);
            $("#rejected-count").text(`${filteredRejected.length}`);
        }
    })
    
    $.ajax({
        url: "/api/department",
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $("#department-count").text(`${data.length}`);
        }
    })
    
})