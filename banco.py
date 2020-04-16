# import mysql.connector
from pymysql import cursors
import pymysql
import json

conexao = pymysql.connect(
    host='localhost',
    user='root',
    passwd='',
    port=3306,
    database='banco_ihm',
    charset='utf8')


my_cursor1 = conexao.cursor(cursors.DictCursor)
my_cursor = conexao.cursor()

# my_cursor = mydb.cursor(buffered=True)


def listagem_inicial():
    sql = "SELECT isbn, titulo_livro, autor FROM livros WHERE is_ativo=1"
    my_cursor1.execute(sql)
    resultado = my_cursor1.fetchall()
    return resultado


def listagem_inativos():
    sql = "SELECT isbn, titulo_livro, autor FROM livros WHERE is_ativo=0"
    my_cursor1.execute(sql)
    resultado = my_cursor1.fetchall()
    return resultado


def cadastro_livro(dados_livro):
    sql = "SELECT isbn FROM livros WHERE isbn=" + "'"+str(dados_livro[2])+"'"
    my_cursor1.execute(sql)
    total = len(my_cursor1.fetchall())

    if(total > 0):
        return "ISBN_EXISTE"
    else:
        sql = "INSERT INTO livros (isbn, titulo_livro, autor, descricao) VALUES (%s, %s, %s, %s)"
        val = (dados_livro[2], dados_livro[0],
               dados_livro[1], dados_livro[3])
        my_cursor1.execute(sql, val)

        conexao.commit()
        return "CADASTRO_REALIZADO"


def detalhes_livro(isbn):
    sql = "SELECT isbn, titulo_livro, autor, descricao FROM livros WHERE isbn=" + "'"+str(isbn)+"'"
    my_cursor1.execute(sql)
    return my_cursor1.fetchall()


def altera_dados_livro(dados):
    sql = "UPDATE livros SET titulo_livro=%s, autor=%s, descricao=%s WHERE isbn="+"'"+str(dados[2])+"'"
    val = (str(dados[0]), str(dados[1]),
           str(dados[3]))
    
    my_cursor1.execute(sql, val)
    conexao.commit()
    return "1"


def delete_livro(isbn):
    sql = "UPDATE livros set is_ativo=0 WHERE isbn = " + "'"+str(isbn)+"'"
    my_cursor1.execute(sql)
    conexao.commit()
