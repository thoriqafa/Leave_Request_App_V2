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

    $.ajax({
        url: "/api/role",
        type: "GET",
        success: function(data) {
            // Memperbarui elemen dropdown Region
            var roleDrop = $("#crt-user-role");
            $.each(data, function(index, role) {
                roleDrop.append("<option value='" + role.id + "'>" + role.name + "</option>");
            });
        }
    });
});

function create() {
    let username = $('#crt-user-username').val()
    let password = username + "1"
    let name = $('#crt-user-name').val()
    let email = $('#crt-user-email').val()
    let phone = $('#crt-user-phone').val()
    let gender = $('#crt-user-gender').val()
    let role = $('#crt-user-role').val()
    let department = $('#crt-user-department').val()
    $.ajax({
        url: "/api/user",
        method: "POST",
        dataType: "JSON",
        contentType: "application/json",
        beforSend: addCsrfToken(),
        data: JSON.stringify({
            username: username,
            password: password,
            name: name,
            email: email,
            phone: phone,
            gender: {
                id: gender
            },
            role: {
                id: role
            },
            department: {
                id: department
            }
        }),
        success: (result) => {
            $('#create-user').modal('hide')
            $('#datatable-fixed-header').DataTable().ajax.reload()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User has been created',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

(function(){
    const roleSelect = document.getElementById('crt-user-role');
    const departmentSelect = document.getElementById('crt-user-department');
    const departmentLabel = document.getElementById('department-label');

    roleSelect.addEventListener('change', function() {
        if (roleSelect.value === '1') { // Admin
            departmentSelect.style.display = 'none';
            departmentLabel.style.display = 'none';
        } else {
            departmentSelect.style.display = 'block';
            departmentLabel.style.display = 'block';
        }
    });

    // Saat halaman pertama kali dimuat
    if (roleSelect.value === '1') { // Admin
        departmentSelect.style.display = 'none';
        departmentLabel.style.display = 'none';
    }
})();