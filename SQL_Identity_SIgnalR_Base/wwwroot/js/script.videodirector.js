let customCache = {};

$(() => {
    $('#startButton').click(() => {
        signalRConnection.invoke('ClientStartVideo');
    });

    $('#stopButton').click(() => {
        signalRConnection.invoke('ClientStopVideo');
    });

    const signalRConnection = new signalR.HubConnectionBuilder()
        .withUrl('/ViewerHub')
        .configureLogging(signalR.LogLevel.Information)
        .build();

    signalRConnection.start()
        .then(() => console.log('signalR started'))
        .catch(console.error);

    function jitsiConnectionEstablished() {
        console.log('jitsi connected');
        room = joinJitsiRoomWithoutTracks('abcdef');
        room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onTrackAdded_PresenterAddTrack);
        room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, onTrackAdded_PresenterRemoveTrack);
    }

    function onTrackAdded_PresenterAddTrack(track) {
        const jitsiID = track.getParticipantId();

        if (customCache[jitsiID]) {
            customCache[jitsiID].push(track);
        } else {
            customCache[jitsiID] = [track];
        }

        let containerToAttach = $('#videoDiv');
        console.log('containerToAttach');
        console.log(containerToAttach);

        if (track.getType() === 'video') {
            console.log('enter video type');
            let videoElementID = containerToAttach.find('video').attr('id');
            track.attach($(`#${videoElementID}`)[0]);
        }
    }

    function onTrackAdded_PresenterRemoveTrack(track) {
        const jitsiID = track.getParticipantId();

        delete customCache[jitsiID];
    }

    connectJitsiServer(jitsiConnectionEstablished, () => console.log('jitsi connection failed'), () => console.log('jitsi disconnected'));
});