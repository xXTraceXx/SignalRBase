$(() => {
    const signalRConnection = new signalR.HubConnectionBuilder()
        .withUrl("/ViewerHub")
        .build();

    signalRConnection.start()
        .then(() => console.log('signalR connected!'))
        .catch((errorMsg) => console.error(errorMsg));
})

