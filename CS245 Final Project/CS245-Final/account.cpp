#include "account.h"

Account::Account()
{
    //These will all be overwritten as a new user is formed
    setUserID(1000);
    setUsername("default_username");
    setPassword("default_password");
    setEmail("default@email.com");
    setSalt("default_salt");
}

Account::Account(int userID, string username, string password, string email, string salt){
    //These are the parameters that a user will have in the database
    setUserID(userID);
    setUsername(username);
    setPassword(password);
    setEmail(email);
    setSalt(salt);
}
