export class WebSocketMessage {
    constructor(
        public content: string,
        public isBroadcast = false,
        public sender: string
    ) { }
}