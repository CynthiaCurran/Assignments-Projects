#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    //Shows the initially loaded messages
    showInitialMessages();

    //Start a timer that will automatically call an update method for the messages
    QTimer *timer = new QTimer(this);
    connect(timer, SIGNAL(timeout()), this, SLOT(update()));
    timer->start(4000);
}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::on_actionExit_triggered()
{
    exit(0);
}

//Used to tell which user is logged in
void MainWindow::setUsername(string username){
    this->username = username;
}

//When the Submit Message button is clicked, send the message to the database and clear the message box
void MainWindow::on_messageSubmitButton_clicked()
{
    //If the message box is not empty, send it. Otherwise, do nothing
    if(ui->messageInput->toPlainText().toStdString() != ""){

        //Create a new Message and send it
        dm.addMessage(username, ui->messageInput->toPlainText().toStdString());

        //Clear message box
        ui->messageInput->clear();
    }
}

//Used to show messages in a format
void MainWindow::showMessage(Message message){

    //Show the username
    ui->messagesBrowser->append(QString::fromStdString(message.getUsername()));

    //Show the text
    ui->messagesBrowser->append(QString::fromStdString(message.getText()));

    //Show the DateTime
    ui->messagesBrowser->append(message.getDateTime().toString());

    //Add newline character
    ui->messagesBrowser->append(QString::fromStdString("\n"));

    latestMessage = message.getMessageID(); //Update the index
}

//show the first 5 messages upon loading
void MainWindow::showInitialMessages(){

    vector<Message> messages = dm.getMessages();

    for(auto i = messages.begin(); i < messages.end(); ++i){
        showMessage(*i);
    }
}

//Get new messages and show them
void MainWindow::update(){

    //Update the datamanager's copy of messages
    dm.update();
    vector<Message> messages = dm.getMessages();    //Get the updated messages

    //Go through all the new messages and show them
    for(auto i = messages.begin(); i < messages.end(); ++i){
        //if the message has not been shown yet, show it
        if(i->getMessageID() > latestMessage){
            showMessage(*i);
        }
    }
}
