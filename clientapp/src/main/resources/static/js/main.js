// Logout Alert
function showLogoutAlert() {
    Swal.fire({
        title: "Logout Confirmation",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yep!',
        cancelButtonText: 'Nope!'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/logout';
        }
    });
}

// FULLSCREEN START
var elem = document.documentElement;
var fullscreenStatus = localStorage.getItem('fullscreenStatus');

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }

    localStorage.setItem('fullscreenStatus', 'true');
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }

    localStorage.setItem('fullscreenStatus', 'false');
}

function toggleFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        closeFullscreen();
    } else {
        openFullscreen();
    }
}

// Cek status fullscreen saat halaman dimuat

/*
document.addEventListener('DOMContentLoaded', function() {
    var toggleFullscreenButton = document.getElementById('toggleFullscreenButton');

    if (fullscreenStatus === 'true') {
        openFullscreen();
        toggleFullscreenButton.textContent = 'Close Fullscreen';
    } else {
        toggleFullscreenButton.textContent = 'Open Fullscreen';
    }
});
*/

document.addEventListener('DOMContentLoaded', function() {
    var toggleFullscreenButton = document.getElementById('toggleFullscreenButton');
    var iconElement = toggleFullscreenButton.querySelector('span');
    var fullscreenStatus = localStorage.getItem('fullscreenStatus');

    if (fullscreenStatus === 'true') {
        openFullscreen();
        toggleFullscreenButton.setAttribute('title', 'Exit Fullscreen');
        iconElement.classList.remove('glyphicon-fullscreen');
        iconElement.classList.add('glyphicon-resize-small');
    } else {
        toggleFullscreenButton.setAttribute('title', 'Fullscreen');
        iconElement.classList.remove('glyphicon-resize-small');
        iconElement.classList.add('glyphicon-fullscreen');
    }
});
// FULLSCREEN END