$(() => {
    const signalRConnection = new signalR.HubConnectionBuilder()
        .withUrl('/ViewerHub')
        .configureLogging(signalR.LogLevel.Information)
        .build();

    signalRConnection.start()
        .then(() => console.log('signalR started'))
        .catch(console.error);

    signalRConnection.on('startVideo', startVideo);
    signalRConnection.on('stopVideo', stopVideo);

    function jitsiConnectionEstablished() {
        console.log('jitsi connected');
        room = joinJitsiRoomWithoutTracks('abcdef');
    }

    function startVideo() {
        console.log('enter startVideo');

        JitsiMeetJS.createLocalTracks({devices: ['video']})
            .then((tracks) => {
                for (let i = 0; i < tracks.length; i++) {
                    room.addTrack(tracks[i]);
                }
            })
            .catch((errorMsg) => console.error(errorMsg));
    }

    function stopVideo() {
        console.log('enter stopVideo');

        let jitsiLocalTracks = room.getLocalTracks();

        for (let index = 0; index < jitsiLocalTracks.length; index++) {
            jitsiLocalTracks[index].dispose();
        }
    }

    connectJitsiServer(jitsiConnectionEstablished, () => console.log('jitsi connection failed'), () => console.log('jitsi disconnected'));
});