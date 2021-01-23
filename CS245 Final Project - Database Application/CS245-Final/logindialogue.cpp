#include "logindialogue.h"
#include "ui_logindialogue.h"

loginDialogue::loginDialogue(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::loginDialogue)
{
    ui->setupUi(this);
}

loginDialogue::~loginDialogue()
{
    delete ui;
}

void loginDialogue::on_addUserButton_clicked()
{

    //if the username is already taken, display so
    if(dm.findUsername(ui->usernameInputBox->text().toStdString())){
        QMessageBox messageBox;
        messageBox.critical(0, "Account Creation Error", "That username is not available.");
    }

    //if the username field is empty, show error
    else if(ui->usernameInputBox->text().toStdString() == ""){
        QMessageBox messageBox;
        messageBox.critical(0, "Account Creation Error", "Username is required.");
    }

    //If the password field is empty, show error
    else if(ui->passwordInputBox->text().toStdString() == ""){
        QMessageBox messageBox;
        messageBox.critical(0, "Account Creation Error", "Password is required.");
    }

    //if the email field is empty, show error
    else if(ui->emailInputBox->text().toStdString() == ""){
        QMessageBox messageBox;
        messageBox.critical(0, "Account Creation Error", "Email is required.");
    }

    //if every check has been passed, create a new account
    else{
        dm.addUser(ui->usernameInputBox->text().toStdString(), ui->passwordInputBox->text().toStdString(), ui->emailInputBox->text().toStdString());
        QMessageBox messageBox;
        messageBox.setText("Account created successfully!");
        messageBox.exec();
    }
}

//TBD
void loginDialogue::on_loginButton_clicked()
{
    //If the username and password check out, let the user in
    if(dm.checkLogin(ui->usernameInputBox->text().toStdString(), ui->passwordInputBox->text().toStdString())){

        //set the current username
        username = ui->usernameInputBox->text().toStdString();

        //say the dialogue is done and let the main window appear
        done(QDialog::Accepted);
    }

    //otherwise, show a warning telling the user that the login did not work
    else{
        QMessageBox messageBox;
        messageBox.critical(0, "Login Error", "The username and/or password were incorrect.");
    }
}


//If the user hits "Cancel" or the X button, the program exits
void loginDialogue::on_exitButton_clicked()
{
    exit(0);
}

void loginDialogue::on_loginDialogue_rejected()
{
    exit(0);
}
