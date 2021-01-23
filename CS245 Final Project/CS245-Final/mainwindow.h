#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QTimer>

#include <string>
using std::string;

#include "datamanager.h"

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    void setUsername(string username);  //Sets the username of the active user
    int latestMessage = 0;  //Used to tell which messages need to be added to the text browser

private slots:
    void on_actionExit_triggered();

    void on_messageSubmitButton_clicked();

    void update();

private:
    Ui::MainWindow *ui;
    string username;    //Active user's username
    DataManager dm;     //Database connection and manager

    void showInitialMessages(); //Loads the first 5 messages that are loaded
    void showMessage(Message message);
};
#endif // MAINWINDOW_H
