#include "datamanager.h"

DataManager::DataManager()
{
    connectDB();
    loadUsers();
    loadMessages();
}

DataManager::~DataManager(){
    db.close(); //Close database connection when done
}

//connects datamanager to the database
void DataManager::connectDB(){

    //set database specifications
    db = QSqlDatabase::addDatabase("QODBC");
    db.setHostName("localhost");
    db.setDatabaseName("DRIVER={SQL Server};SERVER=localhost;DATABASE=secureChat");
    db.setUserName("cs245");
    db.setPassword("Thomas123");
    db.setPort(1433);

    ok = db.open();    //Attempt connection to database

    if(ok){
        qInfo("Connection Established");
    }
    else{
        qInfo("Connection Failed");
        qDebug() << db.lastError().text();
    }
}

//Gets the user accounts from the database
void DataManager::loadUsers(){

    //Prepare a query
    QSqlQuery query;
    query.setForwardOnly(true);
    query.prepare("SELECT * FROM Accounts ORDER BY Username");

    //if the query executed successfully, put the user accounts into the accounts vector
    if(query.exec()){

        //go through every account and add it
        while(query.next()){

            //get the user's information from the query
            unsigned userID = query.value(0).toInt();
            string email = query.value(1).toString().toStdString();
            string username = query.value(2).toString().toStdString();
            string password = query.value(3).toString().toStdString();
            string salt = query.value(4).toString().toStdString();

            //add the information to a new account object and add it to the vector
            Account account;
            account.setUserID(userID);
            account.setEmail(email);
            account.setUsername(username);
            account.setPassword(password);
            account.setSalt(salt);

            accounts.push_back(account);
        }
    }
}

//load the most recent 5 messages
void DataManager::loadMessages(){

    //Prepare a query
    QSqlQuery query;
    query.setForwardOnly(true);
    query.prepare("SELECT * FROM Messages WHERE MessageID IN (SELECT TOP 5 MessageID FROM Messages ORDER BY MessageID DESC) ORDER BY MessageID ASC");

    //if the query executed successfully, put the messages into the messages vector
    if(query.exec()){

        //go through every message and add it
        while(query.next()){

            //get the message information from the query
            unsigned messageID = query.value(0).toInt();
            string username = query.value(1).toString().toStdString();
            string text = query.value(2).toString().toStdString();
            QDateTime dateTime = query.value(3).toDateTime();

            //add the information to a new message object and add it to the vector
            Message message;
            message.setMessageID(messageID);
            message.setUsername(username);
            message.setText(text);
            message.setDateTime(dateTime);

            messages.push_back(message);

            latestMessage = messageID;  //Update the latest message index
        }
    }
}

//returns the vector holding the user accounts
vector<Account> DataManager::getUsers(){
    return accounts;
}

//returns the vector holding the messages
vector<Message> DataManager::getMessages(){
    return messages;
}

//adds a new user to the vector and updates the database
void DataManager::addUser(string username, string password, string email){

    //Create a new, blank account, and set it up
    Account account;

    account.setUsername(username);
    account.setEmail(email);

    //Randomly generate and add a salt
    QRandomGenerator random = QRandomGenerator::securelySeeded();   //Used to randomly select a character
    string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";    //Each char will be randomly selected to be added to the salt
    string salt = "";
    for(int i = 0; i < 10; i++){    //Add 10 random characters to the salt, which makes it finished
        salt += chars.at(random.bounded(61));
    }
    account.setSalt(salt);

    //salt and hash the password. Set the hashed password
    QString saltedPassword = QString::fromStdString(password + salt);   //Get the salted password
    QString hashedPassword = QString(QCryptographicHash::hash((saltedPassword.toStdString().c_str()), QCryptographicHash::Sha3_224).toHex());   //Hash the salted password
    account.setPassword(hashedPassword.toStdString());


    //Sending the account to the DB and adding it to the vector
    //Prepare a query
    QSqlQuery query;
    query.setForwardOnly(true);
    query.prepare("INSERT INTO Accounts (Email, Username, Password, Salt) VALUES (?, ?, ?, ?)");

    query.bindValue(0, QString::fromStdString(account.getEmail()));
    query.bindValue(1, QString::fromStdString(account.getUsername()));
    query.bindValue(2, QString::fromStdString(account.getPassword()));
    query.bindValue(3, QString::fromStdString(account.getSalt()));

    query.exec();   //Execute the query, which updates the database

    accounts.push_back(account);   //Add to the vector
}

//adds a new message to the database
void DataManager::addMessage(string username, string text){

    //Prepare a query
    QSqlQuery query;
    query.setForwardOnly(true);
    query.prepare("INSERT INTO Messages (Username, Text) VALUES (?, ?)");

    query.bindValue(0, QString::fromStdString(username));
    query.bindValue(1, QString::fromStdString(text));

    query.exec();   //Execute the query

    //We do not have to worry about updating the messages vector since it will automatically update every 4 seconds from the database
}

//if the username already exists, return true
bool DataManager::findUsername(string username){

    //clear the accounts vector and get an updated list of accounts to prevent copies
    accounts.clear();
    loadUsers();

    for(auto i = accounts.begin(); i < accounts.end(); ++i){
        if(i->getUsername() == username){
            return true;
        }
    }

    return false;
}

//Connects to the database and updates the messages vector to show new messages
void DataManager::update(){

    //Query for the new messages
    QSqlQuery query;
    query.setForwardOnly(true);
    query.prepare("SELECT * FROM Messages WHERE MessageID > ? ORDER BY MessageID ASC");

    query.bindValue(0, latestMessage);

    if(query.exec()){
        while(query.next()){
            //get the message information from the query
            unsigned messageID = query.value(0).toInt();
            string username = query.value(1).toString().toStdString();
            string text = query.value(2).toString().toStdString();
            QDateTime dateTime = query.value(3).toDateTime();

            //add the information to a new message object and add it to the vector
            Message message;
            message.setMessageID(messageID);
            message.setUsername(username);
            message.setText(text);
            message.setDateTime(dateTime);

            messages.push_back(message);
            latestMessage = messageID;
        }
    }
}

//Used by the login window to see if the username and password match an account. If they do, allow the login (true)
bool DataManager::checkLogin(string username, string password){

    //Go through every user
    for(auto i = accounts.begin(); i < accounts.end(); ++i){

        //if the username matches, test the password
        if(i->getUsername() == username){

            QString saltedPassword = QString::fromStdString(password + i->getSalt());   //Get the salted password
            QString hashedPassword = QString(QCryptographicHash::hash((saltedPassword.toStdString().c_str()), QCryptographicHash::Sha3_224).toHex());   //Hash the salted password

            //if the hashed + salted password matches, return true. The login is correct
            if(i->getPassword() == hashedPassword.toStdString()){
                return true;
            }
        }
    }

    //if all accounts do not have a match, return false (account login failed)
    return false;
}
