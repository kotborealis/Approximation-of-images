'use strict';
function download() {
    var modal = document.getElementById("downloadModal");
    var btn = document.getElementById("downloadButton");
    var span = document.getElementsByClassName("closeLoad")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function create() {

}

function save() {
    var modal = document.getElementById("saveModal");
    var btn = document.getElementById("saveButton");
    var span = document.getElementsByClassName("closeSave")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}