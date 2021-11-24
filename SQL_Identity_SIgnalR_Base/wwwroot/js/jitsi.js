let room;
let ownParticipantId;

const options = {
    hosts: {
        domain: 'meet.jitsi',
        muc: 'muc.meet.jitsi'
    },
    /*bosh: 'https://beamstream-nw.com/http-bind'*/
    bosh: 'https://meet.beamstream.eu/http-bind'
};

JitsiMeetJS.init();
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
const jitsiConnect = new JitsiMeetJS.JitsiConnection(null, null, options);

function joinJitsiRoomWithoutTracks(roomId) {
    room = jitsiConnect.initJitsiConference(roomId, { openBridgeChannel: true, p2p: { enabled: true } });

    ownParticipantId = room.myUserId();

    room.join();

    return room;
}

function connectJitsiServer(establishedEventHandler, failedEventHandler, disconnectedEventHanlder) {
    jitsiConnect.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, establishedEventHandler);
    jitsiConnect.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, failedEventHandler);
    jitsiConnect.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnectedEventHanlder);

    jitsiConnect.connect();
}