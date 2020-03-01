export default {
    unAuthorized(resObj: cResponse, sendTo = false) {
        let response = {status: false, messae: 'Unauthorized'};
        resObj.status(401);
        if(!sendTo) {
            return response;
        }
        resObj.send(response);
    }
}

interface cResponse {
    send(a: Object): void,
    status(a: number): void
}