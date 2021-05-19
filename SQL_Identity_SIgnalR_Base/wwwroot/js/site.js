function getMediaDevices() {
    let camSelection = document.getElementById('cam');

    navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
            let videoInputs = devices.filter((device) => device.kind === 'videoinput');
            console.log('#############################');
            console.log('videoInputs');
            console.log(videoInputs);
            console.log('#############################');

            if (!videoInputs)
                return;

            videoInputs.forEach((device) => {
                let camSelectionNode = `<option value="${device.label}" data-deviceId="${device.deviceId}">${device.label}</option>`;
                console.log('new camSeletionElement');
                console.log(camSelectionNode);
                camSelection.insertAdjacentHTML('beforeend', camSelectionNode);
            })
        }).catch((error) => console.log(error));
}

function showPreviewVideo() {
    let streaming = false;
    //let width = 320;

    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .then(() => getMediaDevices())
        .then(() => {
            // attach event handlers
            $('#startbutton').click(() => takePhoto());
            $('#submitBtn').click(() => saveImage());
        })
        .catch((error) => console.log('error in showPreviewVideo: ' + error));

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            //height = video.videoHeight / (video.videoWidth / width);

            //if (isNaN(height)) {
            //    height = width / (4 / 3);
            //}

            video.setAttribute('width', 320);
            video.setAttribute('height', 480);
            canvas.setAttribute('width', 320);
            canvas.setAttribute('height', 480);
            streaming = true;
        }
    }, false);

    //$('#startbutton').click(() => takePhoto());
}

function saveImage() {
    console.log('enter saveImage');
    let image = $('#bgImg');
    let imageSrc = image.attr('src');

    console.log('imageSrc');
    console.log(imageSrc);
    console.log(imageSrc.length);

    $.ajax({
        type: 'POST',
        url: '/home/UpLoadImage',
        data: { imageString: imageSrc },
        success: (data) => console.log('uploaded successfully'),
        error: (error) => console.log(error)
    });

    console.log('leave saveImage');
}

function takePhoto() {
    console.log('enter takePhoto');
    let canvas = document.getElementById('canvas');
    let video = document.getElementById('video');
    let photo = document.getElementById('bgImg');

    let context = canvas.getContext('2d');
    canvas.width = 320;
    canvas.height = 480;
    context.drawImage(video, 0, 0, 320, 320);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}


$(() => {
    $('.modal-dialog__container').dialog({ modal: true, width: 500 });

    showPreviewVideo();
})

