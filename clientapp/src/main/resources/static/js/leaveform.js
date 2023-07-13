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

    // Hitung durasi
    let startDateInput = document.getElementById('start-date');
    let endDateInput = document.getElementById('end-date');    

    let today = new Date().toISOString().split('T')[0];

    // Mengatur atribut min dengan tanggal saat ini
    startDateInput.setAttribute('min', today);
    endDateInput.setAttribute('min', today);

    // Event listener untuk memperbarui atribut min pada endDateInput
    startDateInput.addEventListener('change', function() {
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
    console.log(durasiHari);
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
        success: (result) => {
            // $('#datatable-fixed-header').DataTable().ajax.reload()
            console.log(result); // Tampilkan respons dari server
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
        },
    });
}

(function(){
    const leaveTypeSelect = document.getElementById('apr-leave-type');
    const endDateInput = document.getElementById('end-date');
    const endDateLabel = document.getElementById('end-date-label');

    leaveTypeSelect.addEventListener('change', function() {
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