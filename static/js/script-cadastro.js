$(document).ready(function () {
    $('.modal').modal();
    /*$('#cad-isbn').mask('999-99-99999-99-9');*/

    $('#al-titulo').hide();
    $('#al-autor').hide();
    $('#al-isbn').hide();
    $('#al-descricao').hide();

    $('#form-cadastro-livro').submit(function () {
        var titulo_livro = $('#cad-titulo').val();
        var autor_livro = $('#cad-autor').val();
        var isbn_livro = $('#cad-isbn').val();
        var desc_livro = $('#cad-desc').val();

        if (titulo_livro == "" || autor_livro == "" || isbn_livro == "" || desc_livro == "") {
            if (titulo_livro == "")
                $('#al-titulo').fadeIn('slow');

            if (autor_livro == "")
                $('#al-autor').fadeIn('slow');

            if (isbn_livro == "")
                $('#al-isbn').fadeIn('slow');

            if (desc_livro == "")
                $('#al-descricao').fadeIn('slow');
        } else {
            $('#al-titulo').fadeOut('slow');
            $('#al-autor').fadeOut('slow');
            $('#al-isbn').fadeOut('slow');
            $('#al-descricao').fadeOut('slow');

            $.ajax({
                type: "POST",
                data: {
                    titulo_livro: titulo_livro,
                    autor_livro: autor_livro,
                    isbn_livro: isbn_livro,
                    desc_livro: desc_livro
                },
                url: "/process_cadastro",
                success: function (data) {
                    console.log(data);
                    if(data == "ISBN_EXISTE")
                    {
                        $('#info-cadastro').append('<label class="helper-text red-text">Erro ao fazer o cadastro, Motivo: ISBN já existe no banco de dados</label>');
                    }
                    else
                    {
                        if(data == "CADASTRO_REALIZADO")
                        {
                            $('#info-cadastro').append('<label class="helper-text green-text">Cadastro realizado com sucesso</label>');
                            setTimeout(function () { location.reload(); }, 3000);
                        }
                        else
                        {
                            
                        }
                    }
                    /*if (data == '1') {
                        $('#info-cadastro').append('<label class="helper-text green-text">Cadastro realizado com sucesso</label>');
                        setTimeout(function () { location.reload(); }, 3000);
                    } else {
                        $('#info-cadastro').append('<label class="helper-text red-text">Erro ao fazer o cadastro, Motivo: ISBN já existe no banco de dados</label>');
                    }*/
                }
            });
        }

        return false;
    });
});