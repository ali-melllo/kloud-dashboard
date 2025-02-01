/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
enum ReadyState {
    UNINSTANTIATED = -1,
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3,
}

const socketStatusType = {
	UNINSTANTIATED: 'Connection Not Valid',
	CONNECTING: 'Connecting ... ',
	OPEN: 'Connected',
	CLOSING: 'Disconnecting',
	CLOSED: 'Disconnected',
};

export const getStatus = (readyState: ReadyState): string => {
	switch (readyState) {
	case ReadyState.UNINSTANTIATED:
		return socketStatusType.UNINSTANTIATED;
	case ReadyState.CONNECTING:
		return socketStatusType.CONNECTING;
	case ReadyState.OPEN:
		return socketStatusType.OPEN;
	case ReadyState.CLOSING:
		return socketStatusType.CLOSING;
	case ReadyState.CLOSED:
		return socketStatusType.CLOSED;
	default:
		return 'Unknown Status';
	}
};
