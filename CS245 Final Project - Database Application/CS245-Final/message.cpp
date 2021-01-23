#include "message.h"

//For new messages
Message::Message()
{
    //These will all be overwritten as a new message is formed
    setMessageID(1000);
    setUsername("default_username");
    setText("default_text");
    setDateTime(QDateTime());
}

//For when a message is being taken from the database
Message::Message(int messageID, string username, string text, QDateTime dateTime){
    setMessageID(messageID);
    setUsername(username);
    setText(text);
    setDateTime(dateTime);
}
