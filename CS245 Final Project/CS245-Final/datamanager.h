#ifndef DATAMANAGER_H
#define DATAMANAGER_H

#include "account.h"
#include "message.h"
#include <QtSql/QSqlDatabase>
#include <QtSql/QSqlQuery>
#include <QtSql/QSqlRecord>
#include <QtSql/QSqlError>
#include <QDebug>
#include <QVariant>
#include <QString>
#include <QCryptographicHash>
#include <QRandomGenerator>

#include <vector>
using std::vector;

#include <string>
using std::string;


//gets data from the database and manages it
class DataManager
{
private:
    vector<Account> accounts;
    vector<Message> messages;
    QSqlDatabase db;
    bool ok = false;    //Used to tell if the database connects
    int latestMessage;  //Used to index what the latest message was based off messageID

    void connectDB();   //connects to the database
    void loadUsers();    //loads the users into the accounts vector
    void loadMessages(); //loads the most recently posted messages into the messages vector

public:
    DataManager();
    ~DataManager();
    vector<Account> getUsers();
    vector<Message> getMessages();

    //TBD
    void addUser(string username, string password, string email); //adds a new user and updates the database
    void addMessage(string username, string text);   //adds a new message and updates the database
    bool findUsername(string username); //returns whether or not the username is taken already
    void update();
    bool checkLogin(string username, string password);

};

#endif // DATAMANAGER_H
