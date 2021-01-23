#ifndef MESSAGE_H
#define MESSAGE_H

#include <QDateTime>

#include <string>
using std::string;

//A message that a user submits to the database for others to read
class Message
{
private:
    int messageID;  //The ID of the message
    string username;    //The ID of the user that created the message
    string text;    //The content of the message
    QDateTime dateTime; //When the message was created

public:

    //Constructors
    Message();
    Message(int messageID, string username, string text, QDateTime dateTime);

    //setters
    void setMessageID(int messageID){this->messageID = messageID;};
    void setUsername(string username) {this->username = username;};
    void setText(string text){this->text = text;};
    void setDateTime(QDateTime dateTime){this->dateTime = dateTime;};

    //getters
    int getMessageID(){return messageID;}
    string getUsername(){return username;}
    string getText(){return text;}
    QDateTime getDateTime(){return dateTime;}
};

#endif // MESSAGE_H
