$(document).ready(function() {
    $('.modal').modal();

});

$(function() {
    $(document).on('click', '#btn-deletar', function(e) {
        e.preventDefault;
        var isbn = $(this).closest('tr').find('td[data-isbn]').data('isbn');
        document.getElementById('btn-faz-exclusao').setAttribute('href', 'excluir_livro?isbn=' + isbn);
    });
});