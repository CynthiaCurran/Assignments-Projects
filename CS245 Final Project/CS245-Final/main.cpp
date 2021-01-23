#include "mainwindow.h"
#include "logindialogue.h"

#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    loginDialogue ld;
    ld.show();

    MainWindow w;

    if(ld.exec() == QDialog::Accepted){
        w.setUsername(ld.username);
        w.show();
    }

    return a.exec();
}
