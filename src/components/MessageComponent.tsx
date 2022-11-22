import React, { FC } from 'react';
import { Game } from "../models/Game"

interface MessageProps {
    game: Game;
}

const MessageComponent: FC<MessageProps> = ({ game }) => {
    return (
        <div
            className="message"
        >
            <span>{game.message}</span>
        </div>
    );
};

export default MessageComponent;

