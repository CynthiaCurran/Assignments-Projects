#ifndef ACCOUNT_H
#define ACCOUNT_H

#include <string>
using std::string;

class Account
{
private:
    int userID;         //The ID of the user
    string username;    //The name of the user
    string password;    //The user's hashed + salted password (56 characters, salted before hashing)
    string email;       //The user's email
    string salt;        //The salt added to the user's password before hashing

public:

    //Constructors
    Account();
    Account(int userID, string username, string password, string email, string salt);

    //setters
    void setUserID(int userID){this->userID = userID;};
    void setUsername(string username){this->username = username;};
    void setPassword(string password){this->password = password;};
    void setEmail(string email){this->email = email;};
    void setSalt(string salt){this->salt = salt;};

    //getters
    int getUserID(){return userID;}
    string getUsername(){return username;}
    string getPassword(){return password;}
    string getEmail(){return email;}
    string getSalt(){return salt;}
};

#endif // ACCOUNT_H
