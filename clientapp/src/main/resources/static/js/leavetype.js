$(document).ready(function () {
  $("#table-leavetype").DataTable({
    ajax: {
      url: "/api/leavetype",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      {
        data: "name",
      },
      {
        data: "day_num",
      },
      {
        data: null,
        render: function (data, type, row, meta) {
          return `
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailLeavetype" onclick="findById(${row.id})">
                        <i class="fa fa-eye"></i>            
                    </button>
                    <button type="button" class="btn btn-warning mx-2" data-toggle="modal" data-target="#updateLeavetype" onclick="beforeUpdate(${row.id})">
                        <i class="fa fa-pencil-square-o"></i>
                    </button>
                    `;
        },
      },
    ],
  });
});

function findById(id) {
  $.ajax({
    url: "/api/leavetype/" + id,
    method: "GET",
    dataType: "JSON",
    success: (result) => {
      $("#leavetype-id").text(`${result.id}`);
      $("#leavetype-name").text(`${result.name}`);
      $("#leavetype-daynum").text(`${result.day_num}`);
    },
  });
}

function create() {
  let name = $("#crt-leavetype-name").val();
  let day_num = $("#crt-leavetype-daynum").val();

  // Mengubah nilai day_num menjadi null jika tidak ada input yang dimasukkan
  if (day_num === "") {
    day_num = null;
  }

  $.ajax({
    url: "/api/leavetype",
    method: "POST",
    dataType: "JSON",
    contentType: "application/json",
    beforeSend: addCsrfToken(),
    data: JSON.stringify({
      name: name,
      day_num: day_num,
    }),
    success: (result) => {
      $("#createLeavetype").modal("hide");
      $("#table-leavetype").DataTable().ajax.reload();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "New leave type has been created.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
}

function beforeUpdate(id) {
  $.ajax({
    url: "/api/leavetype/" + id,
    method: "GET",
    dataType: "JSON",
    success: (result) => {
      $("#upd-leavetype-id").val(`${result.id}`);
      $("#upd-leavetype-name").val(`${result.name}`);
      $("#upd-leavetype-daynum").val(`${result.day_num}`);
    },
  });
}

function update() {
  let id = $("#upd-leavetype-id").val();
  let name = $("#upd-leavetype-name").val();
  let day_num = $("#upd-leavetype-daynum").val();

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to update this leave type?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "/api/leavetype/" + id,
        method: "PUT",
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        data: JSON.stringify({
          name: name,
          day_num: day_num,
        }),
        success: (result) => {
          $("#updateLeavetype").modal("hide");
          $("#table-leavetype").DataTable().ajax.reload();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your leave type has been updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    }
  });
}
