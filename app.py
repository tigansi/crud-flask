from flask import Flask
from flask import request
from flask import redirect
from flask import render_template
from banco import cadastro_livro
from banco import listagem_inicial
from banco import delete_livro
from banco import detalhes_livro
from banco import altera_dados_livro
from banco import listagem_inativos
import json

app = Flask(__name__)


@app.route("/")
def index():
    print(listagem_inicial())
    return render_template("cadastro/view-cadastro.html",
                           resultado=listagem_inicial(),
                           inativos=listagem_inativos())


@app.route("/process_cadastro", methods=["POST", "GET"])
def cadastro():

    dados_livro = list()

    dados_livro.append(request.form['titulo_livro'])
    dados_livro.append(request.form['autor_livro'])
    dados_livro.append(request.form['isbn_livro'])
    dados_livro.append(request.form['desc_livro'])

    return cadastro_livro(dados_livro)


@app.route("/process_detalhes", methods=["POST", "GET"])
def detalhes():

    isbn = request.form['isbn']
    return json.dumps(detalhes_livro(isbn))


@app.route("/process_altera_dados", methods=["POST", "GET"])
def altera_dados():

    dados_livro = list()

    dados_livro.append(request.form['titulo_livro'])
    dados_livro.append(request.form['autor_livro'])
    dados_livro.append(request.form['isbn_livro'])
    dados_livro.append(request.form['desc_livro'])

    return altera_dados_livro(dados_livro)


@app.route("/excluir_livro")
def excluir_livro():

    isbn = request.args['isbn']
    delete_livro(isbn)
    return redirect("http://127.0.0.1:5000/")


if __name__ == '__main__':
    app.run(debug=True)
    app.config['TEMPLATES_AUTORELOAD'] = True
