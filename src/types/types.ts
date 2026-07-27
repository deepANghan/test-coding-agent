type Message = {
    role: string;
    content: string;
    toolCallId?: string;
}

interface State {
    messages: Message[];
}

export type { State, Message };