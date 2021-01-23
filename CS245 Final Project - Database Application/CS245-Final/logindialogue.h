#ifndef LOGINDIALOGUE_H
#define LOGINDIALOGUE_H

#include <QDialog>
#include <QMessageBox>

#include <string>
using std::string;

#include "datamanager.h"

namespace Ui {
class loginDialogue;
}

class loginDialogue : public QDialog
{
    Q_OBJECT

public:
    explicit loginDialogue(QWidget *parent = nullptr);
    ~loginDialogue();
    string username;   //the username of the person logging in

private slots:
    void on_addUserButton_clicked();

    void on_loginButton_clicked();

    void on_exitButton_clicked();

    void on_loginDialogue_rejected();

private:
    Ui::loginDialogue *ui;
    DataManager dm;         //Connects to the database
};

#endif // LOGINDIALOGUE_H
