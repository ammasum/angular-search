export default {
    unAuthorized(resObj: cResponse, sendTo = false) {
        let response = {status: false, messae: 'Unauthorized'};
        if(!sendTo) {
            return response;
        }
        resObj.send(response);
    },

    loginFaild(resObj: cResponse, sendTo = false) {
        let response = {status: false, messae: 'Login faild.Invalid Credentilas'};
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