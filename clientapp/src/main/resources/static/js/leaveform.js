$(document).ready(function () {
    $.ajax({
        url: "/api/leavebalance/my?username=current",
        type: "GET",
        success: function(data) {
            // Mengisi nilai current_year dan last_year ke dalam input

            // Menghitung total balance
            let totalBalance = data.current_year + data.last_year;
            let leaveDrop = document.getElementById("apr-leave-type");
            let submitButton = $('button[type="submit"]');
            let myLeaveBalance = $('#myleavebalance');

            // Inisialisasi status tombol dan elemen balance
            updateButtonAndBalance();

            // Menambahkan event listener ketika nilai leaveDrop berubah
            leaveDrop.addEventListener("change", function() {
                updateButtonAndBalance();
            });

            // Fungsi untuk memperbarui status tombol dan elemen balance
            function updateButtonAndBalance() {
                let leaveTypeValue = leaveDrop.value;
                if (totalBalance === 0 && leaveTypeValue === "1") {
                    submitButton.prop('disabled', true);
                    myLeaveBalance.prop('hidden', false);
                } else {
                    submitButton.prop('disabled', false);
                    myLeaveBalance.prop('hidden', true);
                }
            }
        }
    });

    $.ajax({
        url: "/api/leavetype",
        type: "GET",
        success: function (data) {
            // Memperbarui elemen dropdown Region
            var leaveTypeDrop = $("#apr-leave-type");
            $.each(data, function (index, leaveType) {
                leaveTypeDrop.append("<option value='" + leaveType.id + "'>" + leaveType.name + "</option>");
            });
        }
    });

    // Notes character count
    $("#crt-notes").on("input", function () {
        let currentLength = $(this).val().length;
        $("#char-count").text(currentLength + " / 200 characters");
    });

    // Hitung durasi
    let startDateInput = document.getElementById('start-date');
    let endDateInput = document.getElementById('end-date');

    let today = new Date().toISOString().split('T')[0];

    // Mengatur atribut min dengan tanggal saat ini
    startDateInput.setAttribute('min', today);
    endDateInput.setAttribute('min', today);

    // Event listener untuk memperbarui atribut min pada endDateInput
    startDateInput.addEventListener('change', function () {
        endDateInput.setAttribute('min', this.value);
    });

    // Hitung durasi    
    startDateInput.addEventListener('change', hitungDurasi);
    endDateInput.addEventListener('change', hitungDurasi);

    function hitungDurasi() {
        let startDate = new Date(startDateInput.value);
        let endDate = new Date(endDateInput.value);

        if (startDateInput.value && endDateInput.value && startDate <= endDate) {
            var durasiHari = hitungHariKerja(startDate, endDate);
            if (durasiHari === 1) {
                document.getElementById('duration').value = durasiHari + " day";
            } else if (durasiHari > 1) {
                document.getElementById('duration').value = durasiHari + " days";
            } else {
                document.getElementById('duration').value = "";
            }
        } else {
            document.getElementById('duration').value = "";
        }
    }

    function hitungHariKerja(startDate, endDate) {
        let durasi = 0;
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Mengabaikan hari libur (Sabtu dan Minggu)
                durasi++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return durasi;
    }

});

function create() {
    let leave_type = $('#apr-leave-type').val()
    let start_date = $('#start-date').val()
    let end_date = $('#end-date').val()
    let notes = $('#crt-notes').val()
    let durasiHari = parseInt(document.getElementById('duration').value);
    // console.log(durasiHari);
    $('#leaveform').submit(function(e) {
        e.preventDefault(); // Mencegah form melakukan submit biasa
        
        // Melakukan permintaan Ajax
        $.ajax({
          url: "/api/leaverequest",
          method: "POST",
          dataType: "JSON",
          contentType: "application/json",
          beforeSend: addCsrfToken(),
          data: JSON.stringify({
            leaveType: {
                id: leave_type
            },
            start_date: start_date,
            end_date: end_date,
            duration: durasiHari,
            notes: notes
          }),
          success: function() {
            // Handle ketika submit berhasil
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your leave has been saved',
                showConfirmButton: false,
                timer: 1500
            });            
            // Melakukan redirect ke halaman lain
            window.location.href = "leave/myrequest";
          },
          error: function(xhr, status, error) {
            // Handle ketika terjadi error
            console.log(error);
          }
        });
    });
} 

(function () {
    const leaveTypeSelect = document.getElementById('apr-leave-type');
    const endDateInput = document.getElementById('end-date');
    const endDateLabel = document.getElementById('end-date-label');

    leaveTypeSelect.addEventListener('change', function () {
        if (leaveTypeSelect.value != '1') {
            endDateInput.style.display = 'none';
            endDateLabel.style.display = 'none';
        } else {
            endDateInput.style.display = 'block';
            endDateLabel.style.display = 'block';
        }
    });

    // Saat halaman pertama kali dimuat
    if (leaveTypeSelect.value === '1') {
        endDateInput.style.display = 'none';
        endDateLabel.style.display = 'none';
    }
})();