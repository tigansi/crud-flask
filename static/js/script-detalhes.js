$(document).ready(function() {
    $('.modal').modal();

    $('#modal-detalhes-livros').submit(function() {

        var titulo_livro = $('#det-titulo').val();
        var autor_livro = $('#det-autor').val();
        var isbn_livro = $('#det-isbn').val();
        var desc_livro = $('#det-desc').val();

        $.ajax({
            type: "POST",
            url: "/process_altera_dados",
            data: {
                titulo_livro: titulo_livro,
                autor_livro: autor_livro,
                isbn_livro: isbn_livro,
                desc_livro: desc_livro
            },
            success: function(data) {
                console.log(data);
                if (data == "1") {
                    $('#info-alteracao').append('<label class="helper-text green-text">Alteração realizada com sucesso</label>');
                    setTimeout(function() { location.reload(); }, 3000);
                } else {
                    $('#info-cadastro').append('<label class="helper-text red-text">Erro ao alterar</label>');
                }
            }
        });

        return false;
    });
});

$(function() {
    $(document).on('click', '#btn-detalhes', function(e) {
        e.preventDefault;
        var isbn = $(this).closest('tr').find('td[data-isbn]').data('isbn');
        console.log(isbn)
        
        $.ajax({
            type: "POST",
            url: "/process_detalhes",
            data: {
                isbn: isbn
            },
            success: function(data) {
                console.log(data);

                var dados = $.parseJSON(data);
                console.log(dados);

                $('#det-titulo').val(dados[0]['titulo_livro']);
                $('#det-autor').val(dados[0]['autor']);
                $('#det-isbn').val(dados[0]['isbn']);
                $('#det-desc').val(dados[0]['descricao']);
            }
        });
    });
});