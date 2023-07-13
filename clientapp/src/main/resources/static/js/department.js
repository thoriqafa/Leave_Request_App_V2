$(document).ready(function(){
    $('#datatable-fixed-header').DataTable({
        scrollX: true, // Memberikan scroll horizontal
        scrollY: '260px', // Memberikan scroll vertikal dengan tinggi 300px (sesuaikan dengan kebutuhan)
        scrollCollapse: true, // Mengaktifkan penggulungan scroll jika datanya melebihi tinggi yang ditentukan    
        ajax: {
            url: '/api/department',
            dataSrc: ''
        },
        columns: [
            {
                data: null,
                render: function(data, type, row, meta){
                    return meta.row+1;
                }
            },
            {
                data: 'name'
            },
            {
                data: 'manager.name',
                // render: function(data, type, row){
                //     // if (row.employee) {
                //     //     return row.employee.name;
                //     // }
                //     // return '';
                defaultContent:''                
            },
            {
                data: null,
                render: function(data, type, row, meta){
                    return `
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailDepartment" onclick="findById(${row.id})">
                        <i class="fa fa-eye"></i>           
                    </button>
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#updateDepartment" onclick="beforeUpdate(${row.id})">
                        <i class="fa fa-pencil-square-o"></i>
                    </button>                  
                    `;
                }
            }
        ]
    });

    $.ajax({
        url: "/api/employee",
        type: "GET",
        success: function(data) {
            // Memperbarui elemen dropdown Region
            var employeeDrop = $("#upd-department-manager");
            $.each(data, function(index, manager) {
                employeeDrop.append("<option value='" + manager.id + "'>" + manager.name + "</option>");
            });
        }
    });
});

function findById(id) {
    $.ajax({
      url: "/api/department/" + id,
      method: "GET",
      dataType: "JSON",
      success: (result) => {
        $("#department-id").text(`${result.id}`);
        $("#department-name").text(`${result.name}`);
        if (result.manager) {
            $("#department-manager").text(`${result.manager.name}`);
          } else {
            $("#department-manager").text("No Manager Assigned");
          }
      },
    });
}

function beforeUpdate(id) {
    $.ajax({
      url: "/api/department/" + id,
      method: "GET",
      dataType: "JSON",
      success: (result) => {
        $("#upd-department-id").val(`${result.id}`);
        $("#upd-department-name").val(`${result.name}`);
        // $("#upd-department-manager").val(`${result.employee.name}`);

        // Mengosongkan elemen select sebelum menambahkan opsi
        const managerId = result.manager.id;
        const managerName = result.manager.name;
  
        // Menambahkan opsi employee dari URL "/api/user/" + id
        const option = $("<option>")
          .val(managerId)
          .text(managerName);
        
        option.attr("selected", "selected");
        
        // Mengosongkan elemen select sebelum menambahkan opsi
        $("#upd-department-manager").empty();
        $("#upd-department-manager").append(option);
        
        // Menampilkan pilihan dropdown dari respons AJAX kedalam elemen select yang sama
        $.ajax({
          url: "/api/employee",
          method: "GET",
          dataType: "JSON",
          success: (result) => {
            let text = "";
            $.each(result, function(key, val) {
                if (val.name !== managerName) {
                    text += `<option value="${val.id}">${val.name}</option>`;
                }              
            });
            $("#upd-department-manager").append(text);
          }
        });
      },
    });
}

function update() {
    let id      = $("#upd-department-id").val();
    let name    = $("#upd-department-name").val();
    let employee = $("#upd-department-manager").val();
  
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this department?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "/api/department/" + id,
          method: "PUT",
          dataType: "JSON",
          contentType: "application/json",
          beforeSend: addCsrfToken(),
          data: JSON.stringify({
            name: name,
            employee: {
                id:employee
            },
          }),
          success: () => {
            $("#updateDepartment").modal("hide");
            $("#datatable-fixed-header").DataTable().ajax.reload();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your department has been updated.",
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      }
    });
}

function create() {
  let name = $("#crt-department-name").val();
  let employee = $("#crt-department-manager").val();

  // Mengubah nilai day_num menjadi null jika tidak ada input yang dimasukkan
  if (employee === null) {
    employee = "";
  }

  $.ajax({
    url: "/api/department",
    method: "POST",
    dataType: "JSON",
    contentType: "application/json",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      name: name,
      employee: { 
        id: employee
      },
    }),
    success: (result) => {
      $("#createDepartment").modal("hide");
      $("#datatable-fixed-header").DataTable().ajax.reload();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "New department has been created.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  $("#crt-department-name").val("");
  $("#crt-department-manager").val("");
}