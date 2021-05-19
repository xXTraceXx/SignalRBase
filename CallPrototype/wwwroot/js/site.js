let ownID = null;

function incomingCall() {
    console.log('enter incomingCall');

    let div = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="mr-auto">Bootstrap</strong>
              <small class="text-muted">just now</small>
              <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body">
              See? Just like this.
            </div>
          </div>`;

    $('#toastWrapper').append(div);
    $('.toast').toast({ animation: true, autohide: true, delay: 10000 });
    $('.toast').toast('show');
}

$(() => {
    const signalRConnection = new signalR.HubConnectionBuilder()
        .withUrl('ViewerHub')
        .configureLogging(signalR.LogLevel.Information)
        .build();

    $('#callBtn').click(() => signalRConnection.invoke('Call'));

    signalRConnection.on('incomingCall', incomingCall);

    signalRConnection.start()
        .then(() => signalRConnection.invoke("JoinHome"))
        .then((response) => {
            ownID = response;
            console.log(ownID);
        })
        .catch((err) => console.error(err.toString()));

})

