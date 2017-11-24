function fileSelected() {
    var file = document.getElementById('fileToUpload').files[0];
    showpic();
    if (file) {
        var fileSize = 0;
        if (file.size > 1024 * 1024)
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

        document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
        document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
        document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
    }
}

function uploadFile() {
    var fd = new FormData();
    fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.upload.onprogress = progressFunction;//
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", "/upload");
    xhr.send(fd);
}

function showpic(evt) {
    if (typeof FileReader != 'undefined') {
        var acceptedTypes = {
            'image/png': true,
            'image/jpeg': true,
            'image/gif': true
        };
        if (acceptedTypes[document.getElementById('fileToUpload').files[0].type] === true) {
            var reader = new FileReader();
            reader.onload = function (evt) {
                var child = document.getElementById("father");
                var image = new Image();
                image.src = evt.target.result;
                image.width = 200;
                child.appendChild(image);
            };
            reader.readAsDataURL(document.getElementById('fileToUpload').files[0]);
        }
    }
}


function progressFunction(evt) {
    if (evt.lengthComputable){
        var complete = (evt.loaded / evt.total * 100 | 0);
        var progress = document.getElementById('uploadprogress');
        progress.value = progress.innerHTML = complete;
    }
}

function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
    }
    else {
        document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
}

function uploadComplete(evt) {
    /* This event is raised when the server send back a response */
    alert(evt.target.responseText);
}

function uploadFailed(evt) {
    alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
    alert("The upload has been canceled by the user or the browser dropped the connection.");
}