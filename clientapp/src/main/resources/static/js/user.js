$(document).ready(function(){
    $('#datatable-fixed-header').DataTable({
        scrollX: true,
        scrollY: '260px',
        scrollCollapse: true,
        ajax:{
            url: '/api/employee',
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
                data: 'name',
                // render: function(data){
                //     return `<span class="text-capitalize">${data}</span>`
                // }
            },
            {
                data: 'employee.name',
                defaultContent:'',
                render: function(data, type, row, meta){
                    return data==null ? `<i class="">As a Manager</i>` : data;
                }
            },
            // {
            //     data: 'phone',
            // },
            // {
            //     data: 'gender.name',
            // },
            // {
            //     data: 'is_married',
            //     render: function(data, type, row) {
            //         if (type === 'display' && data !== null) {
            //           if (data === true) {
            //             return 'Married';
            //           } else if (data === false) {
            //             return 'Single';
            //           }
            //         }
            //         return data;
            //       }
            // },
            // {
            //     data: 'hire_date',
            //     render: function(data, type, row) {
            //         if (type === 'display' && data !== null) {
            //           return moment(data).format('DD MMMM YYYY');
            //         }
            //         return data;
            //     }
            // },
            // {
            //     data: 'address',
            // },
            {
                data: 'user.role.name'                
            },
            {
                data: 'null',
                render: function(data, type, row, meta){
                    return`
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailEmployee" onclick="findById(${row.id})">
                        <i class="fa fa-eye"></i>            
                    </button>
                    <button type="button" class="btn btn-warning mx-2" data-toggle="modal" data-target="#update-user" onclick="beforeUpdate(${row.id})">
                        <i class="fa fa-pencil-square-o"></i>
                    </button>                  
                    `;
                }
            }
        ]
    });
        
    $.ajax({
        url: "/api/role",
        method: "GET",
        dataType: "JSON",
        success: (result) => {
            let text = "";
            $.each(result, function(key, val) {
                text += `
                <option value = "${val.id}"> 
                    ${val.name} 
                </option>
                `
            })
            $(".dropdown-role").append(text);
        }
    })
    
    $.ajax({
        url: "/api/department",
        method: "GET",
        dataType: "JSON",
        success: (result) => {
            let text = "";
            $.each(result, function(key, val) {
                text += `
                <option value = "${val.id}"> 
                    ${val.name} 
                </option>
                `
            })
            $(".dropdown-department").append(text);
        }
    })    
});

function findById(id) {
    $.ajax({
        url: "/api/employee/" + id,
        method: "GET",
        dataType: "JSON",
        success: (result) => {            
            $("#employee-name").text(`${result.name}`);
            $("#employee-email").text(`${result.email}`);
            $("#employee-phone").text(`${result.phone}`);
            
            if (result.is_married) {
                $("#employee-status").text("Married");
            } else {
                $("#employee-status").text("Single");
            }

            if (result.hire_date) {
                const hireDate = new Date(result.hire_date);
                const formattedDate = hireDate.getDate() + " " + hireDate.toLocaleString('default', { month: 'long' }) + " " + hireDate.getFullYear();
                $("#employee-hire-date").text(formattedDate);
            } else {
                $("#employee-hire-date").text("-");
            }
            
            if (result.address === null) {
                $("#employee-address").text("-");
            } else {                
                $("#employee-address").text(`${result.address}`);
            }
        }
    })
}

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

    $('#crt-user-username').val("")
    $('#crt-user-name').val("")
    $('#crt-user-email').val("")
    $('#crt-user-phone').val("")
    $('#crt-user-gender').val("")
    $('#crt-user-role').val("")
    $('#crt-user-department').val("")
}

function beforeUpdate(id) {
    $.ajax({
      url: "/api/user/" + id,
      method: "GET",
      dataType: "JSON",
      success: (result) => {
        $("#upd-user-id").val(result.id);
        $("#upd-user-username").val(result.username);
        
        const roleId = result.role.id;
        const roleName = result.role.name;
  
        // Menambahkan opsi role dari URL "/api/user/" + id
        const option = $("<option>")
          .val(roleId)
          .text(roleName);
        
        option.attr("selected", "selected");
        
        // Mengosongkan elemen select sebelum menambahkan opsi
        $("#upd-user-role").empty();
        $("#upd-user-role").append(option);
        
        // Menampilkan pilihan dropdown dari respons AJAX kedalam elemen select yang sama
        $.ajax({
          url: "/api/role",
          method: "GET",
          dataType: "JSON",
          success: (result) => {
            let text = "";
            $.each(result, function(key, val) {
                if (val.name !== roleName) {
                    text += `<option value="${val.id}">${val.name}</option>`;
                }              
            });
            $("#upd-user-role").append(text);
          }
        });
      },
    });
}

function update() {
    let id      = $("#upd-user-id").val();
    let username = $("#upd-user-username").val();
    let password = username + "21"
    let role = $("#upd-user-role").val();
  
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "/api/user/" + id,
          method: "PUT",
          dataType: "JSON",
          contentType: "application/json",
          beforeSend: addCsrfToken(),
          data: JSON.stringify({
            username: username,
            password: password,
            role: {
                id:role
            },
          }),
          success: () => {
            $("#update-user").modal("hide");
            $("#datatable-fixed-header").DataTable().ajax.reload();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your user has been updated.",
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      }
    });
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