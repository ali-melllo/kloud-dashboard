export type SupportType =
    {
        topics: [{
            id: string;
            title: string;
            read: boolean;
            time: string;
            subject: String;
            text: string;
            status: string;
        }]
    }

export type TicketType = {
    title: string;
    messages: [{
        user: {
            is_admin: boolean
        },
        body:string,
        time:string
    }];
    time: string;
}

export type SupportRequestParamType = {
    company: string,
    id?: string,
    body?: {}
}
